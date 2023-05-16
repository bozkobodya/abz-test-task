import {ChangeEventHandler, FC} from "react";
import classNames, {Argument} from "classnames";

type FileUploadProps = {
    className: Argument;
    errors?: string[];
    file?: File;
    handleUploadFile: ChangeEventHandler<HTMLInputElement>;
};

export const FileUpload: FC<FileUploadProps> = ({
    className,
    file,
    errors,
    handleUploadFile
}) => (
    <div className={classNames('flex flex-col gap-1 w-full', className)}>
        <label className="text-base flex w-full cursor-pointer">
            <div
                className={classNames(
                    'border rounded-l py-[14px] px-[15px]',
                    !!errors ? 'border-2 border-error' : 'border'
                )}
            >
                Upload
            </div>

            <div
                className={classNames(
                    'w-full border-l-0 rounded-r py-[14px] px-4 truncate',
                    !!errors ? 'border-2 border-error' : 'border border-grayLight',
                    { 'text-grayDark': !file?.name.length }
                )}
            >
                {file?.name ?? 'Upload your photo'}
            </div>

            <input
                accept="image/jpeg, image/jpg"
                className="w-0 h-0 opacity-0"
                type="file"
                onChange={handleUploadFile}
            />
        </label>

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
);