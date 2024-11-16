interface User {
    firstName: string;
    lastName: string;
    role: string;
    title: string;
    uuid: string;
    email: string;
    username: string;
}

interface JWTToken {
    issuedAt: number;
    expiresIn: number;
    token: string;
    refreshToken: string
}

export type {User, JWTToken};