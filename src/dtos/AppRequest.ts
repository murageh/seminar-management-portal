interface NewUserRequest {
    username: string;
    password: string;
    email: string;
    name: string;
}

interface UpdateUserRequest {
    name: string | null;
    title: string | null;
}

interface LoginRequest {
    username: string;
    password: string;
}

interface NewSeminarRegistrationRequest {
    semNo: string;
    companyNo: string;
    participantContactNo: string;
    confirmed: boolean;
}

export type {NewUserRequest, LoginRequest, UpdateUserRequest, NewSeminarRegistrationRequest};