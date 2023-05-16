import successImage from '../../../assets/images/success-image.svg';

export const RegistrationResult = () => (
    <div className="flex flex-col gap-[50px]">
        <h2 className="text-[40px] leading-none text-center">User successfully registered</h2>

        <img src={successImage} alt="success"/>
    </div>
);