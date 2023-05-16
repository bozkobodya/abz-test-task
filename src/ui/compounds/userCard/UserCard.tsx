import {FC} from "react";
import photoCover from "../../../assets/images/photo-cover.svg";
import {TextEclipse} from "../textEllipse/TextEclipse";
import {User} from "../../../api/rtkAPI.types";
import {SRC_IMAG_PLACEHOLDER} from "../../../utils/constants";

type UserCardProps = User;

export const UserCard: FC<UserCardProps> = ({
    phone,
    photo,
    name,
    email,
    position,
}) => (
    <div
        className="flex flex-col bg-white rounded-[10px] p-5 text-base"
    >
        <img
            className="rounded-full self-center"
            src={photo === SRC_IMAG_PLACEHOLDER ? photoCover : photo}
            alt="avatar"
            width={70}
            height={70}
        />

        <TextEclipse className="my-5">{name}</TextEclipse>

        <TextEclipse>{position}</TextEclipse>
        <TextEclipse>{email}</TextEclipse>
        <TextEclipse>{phone}</TextEclipse>
    </div>
);