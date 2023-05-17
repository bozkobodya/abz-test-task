import {FC, ReactNode, useRef, useState} from "react";
import classNames, {Argument} from "classnames";

type TextEclipseSpanProps = {
    className?: Argument;
    children: ReactNode | ReactNode[];
};

export const TextEclipse: FC<TextEclipseSpanProps> = ({ className, children }) => {
    const ref = useRef<HTMLSpanElement>(null);

    const [isTextOverflowed, setIsTextOverflowed] = useState(false);

    const handleMouseOver = () => {
        setIsTextOverflowed((ref.current?.offsetWidth ?? 0) < (ref.current?.scrollWidth ?? 0));
    };

    return (
        <div
            className={classNames(
                'relative group h-[26px]',
                { 'cursor-pointer': isTextOverflowed },
                className
            )}>
            <span
                ref={ref}
                className="truncate text-center leading-[26px] inline-block w-full"
                onMouseOver={handleMouseOver}
            >
                {children}
            </span>

            <div
                className={classNames(
                    'hidden absolute left-0 2xl:left-16 top-6 z-10 break-words bg-black py-1 px-4 text-white rounded w-full',
                    { 'group-hover:block hover:block': isTextOverflowed }
                )}
            >
                {children}
            </div>
        </div>
    );
};