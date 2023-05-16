import {FC} from "react";
import classNames from "classnames";

type RadioButtonProps = {
    selected: boolean;
    text: string;
    handleOnClick: () => void;
};

export const RadioButton: FC<RadioButtonProps> = ({
    selected,
    text,
    handleOnClick
}) => (
    <button
        className="flex items-center gap-3 outline-none"
        onClick={handleOnClick}
    >
        <div className={classNames(
            'border rounded-full w-5 h-5',
            selected ? 'border-blue' : 'border-grayLight'
        )}>
            {selected && <div className="w-full h-full rounded-full bg-blue border-[5px] border-grayThin" />}
        </div>

        {text}
    </button>
);