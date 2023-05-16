import {useCallback, useEffect, useMemo, useState} from "react";
import {useAppDispatch, useAppSelector} from "./redux";
import {useFetchAllUsersQuery} from "../api/rtkAPI";
import {addUsers, setFetchURL, setUsers } from "../store/slices/UsersSlice";

export const useUsersList = () => {
    const { users, fetchURL } = useAppSelector(state => state.usersReducer);
    const [skip, setSkip] = useState(true);

    const search = useMemo(
        () => {
            setSkip(true);
            return fetchURL?.length ? new URL(fetchURL).search : '?count=6&page=1';
        },
        [fetchURL]
    );

    const { data, isFetching } = useFetchAllUsersQuery(
        search,
        { skip }
    );

    const dispatch = useAppDispatch();

    const handleLoadUsers = useCallback(
        () => {
            if (typeof fetchURL === 'string') {
                setSkip(false);
            }
        },
        [fetchURL]
    );

    const handleReloadUsers = useCallback(
        () => {
            dispatch(setFetchURL(''));
            setSkip(false);
        },
        [dispatch]
    );
    
    useEffect(() => {
        if (data?.users) {
            const saveUsersAction = data.links.prev_url === null ? setUsers : addUsers;

            dispatch(saveUsersAction({
                users: data.users,
                nextFetchURL: data.links.next_url
            }));
        }
    }, [data, dispatch]);
    
    return {
        users,
        usersListFinished: typeof fetchURL !== 'string',
        isFetching,
        handleLoadUsers,
        handleReloadUsers,
    };
};