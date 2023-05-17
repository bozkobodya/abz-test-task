import {useEffect} from "react";
import {Button} from "../../ui/shared/button/Button";
import {UserCard} from "../../ui/compounds/userCard/UserCard";
import {Loader} from "../../ui/compounds/loader/Loader";
import {USERS_SECTION_ID} from "../../utils/constants";
import {useUsersList} from "../../hooks/useUsersList";

export const UsersSection = () => {
    const { users, isFetching, usersListFinished, handleLoadUsers } = useUsersList();

    useEffect(() => {
        handleLoadUsers();
    }, []);

    return (
        <section
            id={USERS_SECTION_ID}
            className="flex flex-col items-center gap-[50px] px-4 md:px-8 lg:px-[60px] 2xl:px-0"
        >
            <h2 className="text-[40px] leading-none text-center">Working with GET request</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-4 lg:gap-[29px] w-full">
                {users.map((user) => (
                    <UserCard
                        key={user.id}
                        {...user}
                    />
                ))}
            </div>

            {!usersListFinished && (
                isFetching
                    ? <Loader />
                    : <Button
                        className="px-[18px]"
                        onClick={handleLoadUsers}
                    >
                          Show more
                      </Button>
            )}
        </section>
    );
};