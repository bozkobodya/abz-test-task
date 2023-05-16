import {FC, useCallback} from "react";
import {useFetchPositionsQuery} from "../../../api/rtkAPI";
import {RadioButton} from "../../shared/radioButton/RadioButton";

export type SelectPositionProps = {
    selectedPositionId?: number;
    handleChoosePosition: (positionId: number) => void;
};

export const SelectPosition: FC<SelectPositionProps> = ({ selectedPositionId, handleChoosePosition }) => {
    const { data } = useFetchPositionsQuery(null);
    
    const handleClickPosition = useCallback(
        (positionId: number) =>
        () => handleChoosePosition(positionId),
        [handleChoosePosition]
    );

    return (
        <div className="flex flex-col items-start gap-2 text-case mt-[25px] mb-12 w-full">
            <h3 className="mb-1">Select your position</h3>

            {data?.positions?.map(position => (
                <RadioButton
                    key={position.id}
                    selected={position.id === selectedPositionId}
                    text={position.name}
                    handleOnClick={handleClickPosition(position.id)}
                />
            ))}
        </div>
    );
};