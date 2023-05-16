import {FC, ReactNode, useCallback} from "react";
import {Button} from "../../shared/button/Button";

type NavigateButtonProps = {
    className?: string;
    children: ReactNode | ReactNode[];
    elementId: string;
};

export const NavigateButton: FC<NavigateButtonProps> = ({ className, children, elementId }) => {

    const handleScrollToElement = useCallback(
        () => {
            document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
        },
        [elementId]
    );

    return (
        <Button
            className={className}
            onClick={handleScrollToElement}
        >
            {children}
        </Button>
    );
};