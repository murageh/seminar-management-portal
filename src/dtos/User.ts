interface User {
    name: string;
    role: string;
    title: string;
    uuid: string;
    email: string;
    username: string;
    contact_No: string;
    contact_Name: string;
    customer_No: string;
    customer_Name: string;
}

interface JWTToken {
    issuedAt: number;
    expiresIn: number;
    token: string;
    refreshToken: string
}

export type {User, JWTToken};