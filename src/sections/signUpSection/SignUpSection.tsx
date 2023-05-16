import {Input} from "../../ui/shared/input/Input";
import {SelectPosition} from "../../ui/compounds/selectPosition/SelectPosition";
import {ChangeEventHandler, useCallback, useMemo, useState} from "react";
import {UserCreateData} from "../../api/rtkAPI.types";
import {FileUpload} from "../../ui/shared/fileUpload/FileUpload";
import {Button} from "../../ui/shared/button/Button";
import {SIGN_UP_SECTION_ID} from "../../utils/constants";
import {RegistrationResult} from "../../ui/compounds/registrationResult/RegistrationResult";
import {useFetchTokenQuery, useRegisterUserMutation} from "../../api/rtkAPI";
import {validateEmail, validateName, validatePhoneNumber} from "../../utils/validators";
import {useUsersList} from "../../hooks/useUsersList";
import {Loader} from "../../ui/compounds/loader/Loader";

type ErrorMessages = {
    name?: string[];
    email?: string[];
    phone?: string[];
    photo?: string[];
};

type SignUpData = Omit<UserCreateData, "photo"> & {
    photo?: File;
};

export const SignUpSection = () => {
    const { data: tokenData } = useFetchTokenQuery(null);
    const [registerUser, { data: registerResult, isLoading, isError }] = useRegisterUserMutation();
    const { handleReloadUsers } = useUsersList();

    const [errors, setErrors] = useState<ErrorMessages>({});
    const [imageSize, setImageSize] = useState<{ width: number; height: number; }>({ width: 0, height: 0 });

    const [signUpData, setSignUpData] = useState<SignUpData>({
        name: '',
        email: '',
        phone: '',
        position_id: 1,
    });
    
    const submitButtonDisabled = useMemo(() => {
        const { name, email, photo, phone } = signUpData;
        return !name.length || !email.length || !phone.length || typeof photo === 'undefined';
    }, [signUpData]);

    const updateFormValue = (newData: Partial<UserCreateData>) => {
        setSignUpData((previousData) => (
            {
                ...previousData,
                ...newData
            }
        ));
    };

    const handleUpdateFile = useCallback<ChangeEventHandler<HTMLInputElement>>(
        (event) => {
            const file = event.target.files?.[0];

            if (file) {
                updateFormValue({ photo: file });

                const fileReader = new FileReader();

                fileReader.readAsDataURL(file);

                fileReader.onload = function(event) {
                    const image = new Image();
                    const result = event.target?.result;

                    if (typeof result == 'string') {
                        image.src = result;

                        image.onload = function() {
                            setImageSize({
                                height: image.height,
                                width: image.width 
                            });
                        };
                    }
                };
            }
        },
        []
    );

    const generatePhotoErrorMessages = useCallback(
        () => {
            if (typeof signUpData.photo === 'undefined') {
                return ['Image is invalid.']
            }

            const photoErrors = [];

            if (signUpData.photo.size > 5000000) {
                photoErrors.push('The photo may not be greater than 5 Mbytes.');
            }

            if (imageSize.width < 70 || imageSize.height < 70) {
                photoErrors.push('Minimum size of photo 70x70px.');
            }
            
            return photoErrors;
        },
        [signUpData.photo, imageSize.height, imageSize.width]
    )

    const validateAllFields = useCallback(() => {
        const formErrors = {} as ErrorMessages;

        if (!validateName(signUpData?.name ?? '')) {
            formErrors.name = ['The name must be at least 2 characters.'];
        }

        if (!validateEmail(signUpData?.email ?? '')) {
            formErrors.email = ['The email format is invalid.'];
        }

        if (!validatePhoneNumber(signUpData?.phone ?? '')) {
            formErrors.phone = ['The phone format is invalid.'];
        }

        const photoErrors = generatePhotoErrorMessages();

        if (photoErrors.length) {
            formErrors.photo = photoErrors;
        }
        
        return formErrors;
    }, [signUpData.email, signUpData.name, signUpData.phone, generatePhotoErrorMessages]);

    const handleRegister = useCallback(
        async () => {
            const generatedErrors = validateAllFields();
            
            if (Object.keys(generatedErrors).length) {
                setErrors(generatedErrors);
            } else if (tokenData?.token && typeof signUpData.photo !== 'undefined') {
                const formData = new FormData();
                formData.append("name", signUpData.name);
                formData.append("email", signUpData.email);
                formData.append("phone", signUpData.phone);
                formData.append("position_id", `${signUpData.position_id}`);

                formData.append("photo", signUpData.photo);

                const response = await registerUser({
                    token: tokenData?.token,
                    data: formData
                });

                if ('data' in response) {
                    console.log(response)
                    handleReloadUsers();
                }

            }
        },
        [validateAllFields, tokenData?.token, signUpData.photo, signUpData.name, signUpData.email, signUpData.phone, signUpData.position_id, registerUser, handleReloadUsers]
    );

    return (
        <section
            id={SIGN_UP_SECTION_ID}
            className="flex flex-col items-center px-4"
        >
            {registerResult?.success ? (
                <RegistrationResult />
            ) : (
                <>
                    <h2 className="text-[40px] leading-none text-center">Working with POST request</h2>

                    <div className="flex flex-col items-center max-w-[380px] w-full">
                        <Input
                            wrapperClassName="my-[50px]"
                            placeholder="Your name"
                            value={signUpData.name}
                            errors={errors.name}
                            onChange={(event) => updateFormValue({ name: event.target.value })}
                        />

                        <Input
                            wrapperClassName="mb-[50px]"
                            placeholder="Email"
                            type="email"
                            value={signUpData.email}
                            errors={errors.email}
                            onChange={(event) => updateFormValue({ email: event.target.value })}
                        />

                        <Input
                            wrapperClassName="mb-[25px]"
                            placeholder="Phone"
                            hint="+38 (XXX) XXX - XX - XX"
                            type="tel"
                            errors={errors.phone}
                            value={signUpData.phone}
                            onChange={(event) => updateFormValue({ phone: event.target.value })}
                        />

                        <SelectPosition
                            selectedPositionId={signUpData.position_id}
                            handleChoosePosition={(position_id) => updateFormValue({ position_id })}
                        />

                        <FileUpload
                            className="mb-[50px]"
                            file={signUpData.photo}
                            errors={errors.photo}
                            handleUploadFile={handleUpdateFile}
                        />

                        {isLoading && !isError ? (
                            <Loader />
                        ) : (
                            <Button
                                disabled={submitButtonDisabled}
                                onClick={handleRegister}
                            >
                                Sign up
                            </Button>
                        )}
                    </div>
                </>
            )}
        </section>
    );
};