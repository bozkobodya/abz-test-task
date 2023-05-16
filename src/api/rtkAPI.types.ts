export type User = {
    id: string;
    name: string;
    email: string;
    phone: string;
    position: string;
    position_id: string;
    registration_timestamp: number;
    photo: string;
};

export type Position = {
    id: number;
    name: string;
};

export type UserCreateData = {
    name: string;
    email: string;
    phone: string;
    position_id: number;
    photo: File;
};

export type GetTokenResponse = {
    success: boolean;
    token: string;
};

export type CreateUserResponse = {
    success: boolean;
    user_id: string;
    message: string
};

export type GetPositionsResponse = {
    success: boolean;
    positions: Position[];
};

export type GetAllUsersResponse = {
    success: boolean;
    page: number;
    total_pages: number;
    total_users: number;
    count: number;
    links: {
        next_url: string | null;
        prev_url: string | null;
    },
    users: User[];
};