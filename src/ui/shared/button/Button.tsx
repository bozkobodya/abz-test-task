import {FC, HTMLProps} from "react";
import classNames from "classnames";

export const Button: FC<HTMLProps<HTMLButtonElement>> = ({
    className,
    children,
    ...buttonProps
}) => (
    <button
        {...buttonProps}
        type="button"
        className={classNames(
            'flex items-center justify-center py-1 px-6 text-base text-black disabled:text-white bg-yellow hover:bg-yellowLight disabled:bg-gray rounded-full',
            className
        )}
    >
        {children}
    </button>
);