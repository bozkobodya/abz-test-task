import logo from '../../../assets/images/Logo.svg';
import {NavigateButton} from "../navigateButton/NavigateButton";
import {SIGN_UP_SECTION_ID, USERS_SECTION_ID} from "../../../utils/constants";

export const Header = () => {

    return (
        <header className="flex items-center justify-center py-[13px] px-4 md:px-8 lg:px-[60px] 2xl:px-0 bg-white">
            <div className="flex items-center justify-between gap-2.5 w-full max-w-[1170px]">
                <img
                    className="w-[104px] h-[26px]"
                    src={logo}
                    alt="logo"
                />

                <div className="flex items-center gap-2.5">
                    <NavigateButton
                        className="px-[29px]"
                        elementId={USERS_SECTION_ID}
                    >
                        Users
                    </NavigateButton>

                    <NavigateButton elementId={SIGN_UP_SECTION_ID}>
                        Sign up
                    </NavigateButton>
                </div>
            </div>
        </header>
    );
};