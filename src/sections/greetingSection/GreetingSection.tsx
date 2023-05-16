import {SIGN_UP_SECTION_ID} from "../../utils/constants";
import {NavigateButton} from "../../ui/compounds/navigateButton/NavigateButton";


export const GreetingSection = () => (
    <section className="first-section h-[500px] lg:h-[650px]">
        <div className="h-full w-full px-4 pt-10 md:pt-[89px] pb-[72px] md:pb-[88px] lg:py-[164px] flex items-center justify-center">
            <div className="flex flex-col gap-5 w-[328px] md:w-[380px] text-center">
                <span className="text-white text-[40px] leading-none inline-block">
                    Test assignment for front-end developer
                </span>

                <span className="text-white text-base inline-block mb-3">
                    What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast
                    understanding of User design thinking as they'll be building web interfaces with accessibility in mind.
                    They should also be excited to learn, as the world of Front-End Development keeps evolving.
                </span>

                <NavigateButton
                    className="self-center"
                    elementId={SIGN_UP_SECTION_ID}
                >
                    Sign up
                </NavigateButton>
            </div>
        </div>
    </section>
);