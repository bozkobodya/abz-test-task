import {DetailedHTMLProps, FC, InputHTMLAttributes} from "react";
import classNames, {Argument} from "classnames";

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    hint?: string;
    wrapperClassName?: Argument;
    errors?: string[];
};

export const Input: FC<InputProps> = ({
    hint,
    wrapperClassName,
    placeholder,
    value,
    errors,
    ...inputProps
}) => {


    return (
        <div className={classNames('flex flex-col gap-1 w-full relative text-base', wrapperClassName)}>
            <input
                {...inputProps}
                id={placeholder}
                className={classNames(
                    'rounded py-[14px] px-4 text-base w-full bg-transparent outline-none custom-input placeholder-transparent',
                    errors ? 'border-2 border-error' : 'border border-grayLight',
                    inputProps.className
                )}
                placeholder={placeholder}
                type={inputProps.type ?? 'text'}
                value={value}
            />

            {!!placeholder && (
                <label
                    htmlFor={placeholder}
                    className={classNames(
                        'absolute top-[14px] left-3 px-1 rounded-full bg-grayThin transition-all duration-200',
                        errors ? 'text-error' : 'text-grayDark',
                    )}
                >
                    {placeholder}
                </label>
            )}

            {!!hint && (
                <div
                    className="ml-4 text-xs text-grayDark"
                >
                    {hint}
                </div>
            )}

            {!!errors && (
                errors.map(error => (
                    <div
                        key={error}
                        className="ml-4 text-xs text-error"
                    >
                        {error}
                    </div>
                ))
            )}
        </div>
    )
}