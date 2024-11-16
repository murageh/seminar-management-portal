interface NewUserRequest {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    title: string | null;
}

interface UpdateUserRequest {
    firstName: string | null;
    lastName: string | null;
    title: string | null;
}

interface LoginRequest {
    username: string;
    password: string;
}

interface UpdateSeminarRequest {
    no: string;
    blocked: boolean;
    vaT_Prod_Posting_Group: string;
    name: string;
    seminarPrice: number;
    seminarDuration: number;
    gen_Prod_Posting_Group: string
}

const NewUserRequestExample: NewUserRequest = {
    "username": "string",
    "password": "string",
    "email": "user@example.com",
    "firstName": "string",
    "lastName": "string",
    "title": "string"
};

export type {NewUserRequest, LoginRequest, UpdateUserRequest, UpdateSeminarRequest};
export {NewUserRequestExample};