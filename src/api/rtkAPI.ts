import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {CreateUserResponse, GetAllUsersResponse, GetPositionsResponse, GetTokenResponse} from "./rtkAPI.types";

export const rtkAPI = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://frontend-test-assignment-api.abz.agency/api/v1',
    }),
    tagTypes: ['User'],
    endpoints: (build) => ({
        fetchToken: build.query<GetTokenResponse, null>({
            query: () => ({
                url: '/token'
            })
        }),
        fetchAllUsers: build.query<GetAllUsersResponse, string>({
            query: (search ) => ({
                url: `/users${search}`
            }),
            providesTags: ['User']
        }),
        registerUser: build.mutation<CreateUserResponse, { token: string; data: FormData; }>({
            query: ({ token, data }) => ({
                url: `/users`,
                method: 'POST',
                headers: {
                    Token: token
                },
                body: data,
            }),
            invalidatesTags: ['User']
        }),
        fetchPositions: build.query<GetPositionsResponse, null>({
            query: () => ({
                url: '/positions'
            })
        }),
    }),
});

export const {
    useFetchAllUsersQuery,
    useFetchPositionsQuery,
    useFetchTokenQuery,
    useRegisterUserMutation,
} = rtkAPI;