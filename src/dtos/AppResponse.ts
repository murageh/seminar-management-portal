import {Seminar} from "./Seminar.ts";
import {Employee} from "./Employee.ts";
import {Customer} from "./Customer.ts";
import {JWTToken, User} from "./User.ts";

interface ErrorResponse {
    success: boolean;
    title: string;
    path: string;
    statusCode: number;
    message: string;
}

interface SeminarResponseBase {
    success: boolean;
    message: string;
    statusCode: number;
}

interface SeminarResponse extends SeminarResponseBase {
    data: Seminar;
}

interface SeminarListResponse extends SeminarResponseBase {
    data: Seminar[];
}

interface EmployeeResponse {
    success: boolean;
    employees: Employee[];
    count: number;
    message: string;
}

interface CustomerResponse {
    success: boolean;
    customers: Customer[];
    count: number;
    top: number;
    skip: number;
    message: string;
}

interface UserResponse {
    success: boolean;
    data: User;
    title: string;
    path: string;
    statusCode: number;
    message: string;
}

interface UsersResponse {
    success: boolean;
    data: User[];
    title: string;
    path: string;
    statusCode: number;
    message: string;
}

interface LoginResponse {
    success: boolean;
    data: JWTToken;
    title: string;
    path: string;
    statusCode: number;
    message: string;
}

interface GenProdPostingGroup {
    def_VAT_Prod_Posting_Group: string;
    code: string;
    description: string;
    auto_Insert_Default: boolean;
}

interface VATProdPostingGroup {
    code: string;
    description: string;
}

interface VATProdPostingGroupsResponse {
    success: boolean;
    message: string;
    statusCode: number;
    data: VATProdPostingGroup[];
}

interface GenProdPostingGroupsResponse {
    success: boolean;
    message: string;
    statusCode: number;
    data: GenProdPostingGroup[];
}

interface Contact {
    no: string;
    name: string;
    company_Name: string;
    e_Mail: string;
}

interface ContactsReponse {
    success: boolean;
    message: string;
    statusCode: number;
    data: Contact[];
}

const ContactsReponseExample: ContactsReponse = {
    "success": true,
    "message": "Operation successful.",
    "statusCode": 200,
    "data": [
        {
            "no": "CT000259",
            "name": "COMP",
            "company_Name": "COMP",
            "e_Mail": "ex@example.co.ke"
        }
    ]
};

const VATProdPostingGroupsResponseExample: VATProdPostingGroupsResponse = {
    "success": true,
    "message": "Operation successful.",
    "statusCode": 200,
    "data": [
        {
            "code": "NO VAT",
            "description": "No VAT"
        }
    ]
};

const GenProdPostingGroupsResponseExample: GenProdPostingGroupsResponse = {
    "success": true,
    "message": "Operation successful.",
    "statusCode": 200,
    "data": [
        {
            "code": "MANUFACT",
            "description": "Capacities",
            "def_VAT_Prod_Posting_Group": "",
            "auto_Insert_Default": true
        }
    ]
};

const LoginResponseExample: LoginResponse = {
    "success": true,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Im1haW5hIiwiYWN0b3J0IjoiezY0MjY2QzE4LTlEMUUtNDIxNS1CNUZGLTgxQ0NDRjU4MjEzNn0iLCJyb2xlIjoidXNlciIsIm5iZiI6MTczMTc1NDA3NywiZXhwIjoxNzMxNzc1Njc3LCJpYXQiOjE3MzE3NTQwNzcsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcyMzIiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo3MjMyIn0.Vt3ixVsZsYTVdCeNUY_qWRlC80XJWc_Dh1Odno6u144",
        "expiresIn": 21600,
        "refreshToken": "",
        "issuedAt": 0
    },
    "title": "Logging in",
    "path": "/api/auth/login",
    "statusCode": 200,
    "message": "User logged in successfully."
};

const UserResponseExample: UsersResponse = {
    "success": true,
    "data": [
        {
            "uuid": "{64266C18-9D1E-4215-B5FF-81CCCF582136}",
            "username": "maina",
            "email": "maina@example.com",
            "title": "",
            "firstName": "Maina",
            "lastName": "Kageni",
            "role": "user"
        }
    ],
    "title": "Finding users",
    "path": "/api/User",
    "statusCode": 200,
    "message": "Users found successfully."
};

const CustomerResponseExample: CustomerResponse = {
    "success": true,
    "customers": [
        {
            "no": "01121212",
            "name": "Spotsmeyer's Furnishings",
            "post_Code": "US-FL 37125",
            "country_Region_Code": "US",
            "phone_No": "",
            "contact": "Mr. Mike Nash",
            "currency_Code": "USD",
            "blocked": " ",
            "balance_LCY": 40000,
            "balance_Due_LCY": 0,
            "sales_LCY": 0,
            "payments_LCY": 0
        },
        {
            "no": "01445544",
            "name": "Progressive Home Furnishings",
            "post_Code": "US-IL 61236",
            "country_Region_Code": "US",
            "phone_No": "",
            "contact": "Mr. Scott Mitchell",
            "currency_Code": "USD",
            "blocked": " ",
            "balance_LCY": 41499.03,
            "balance_Due_LCY": 0,
            "sales_LCY": 0,
            "payments_LCY": 0
        }
    ],
    "count": 2,
    "top": 5,
    "skip": 0,
    "message": "Customers fetched successfully"
};

const EmployeeResponseExample: EmployeeResponse = {
    "success": true,
    "employees": [
        {
            "no": "EH",
            "fullName": "Ester Henderson",
            "resource_No": ""
        },
        {
            "no": "JO",
            "fullName": "Jim Olive",
            "resource_No": ""
        }
    ],
    "count": 2,
    "message": "Employees fetched successfully"
};

const SeminarResponseExample: SeminarListResponse = {
    "success": true,
    "message": "Operation successful.",
    "statusCode": 200,
    "data": [
        {
            "no": "SEMN0014",
            "name": "This is also an edit from Swagger",
            "seminarDuration": 0,
            "seminarPrice": 0,
            "blocked": false,
            "gen_Prod_Posting_Group": "SERVICES",
            "vaT_Prod_Posting_Group": "VAT25"
        },
        {
            "no": "SEMN0015",
            "name": "hgh erkfgh",
            "seminarDuration": 0,
            "seminarPrice": 0,
            "blocked": true,
            "gen_Prod_Posting_Group": "",
            "vaT_Prod_Posting_Group": ""
        }
    ]
};

export type {
    ErrorResponse,
    SeminarResponse,
    SeminarListResponse,
    EmployeeResponse,
    CustomerResponse,
    UserResponse,
    UsersResponse,
    LoginResponse,
    GenProdPostingGroup,
    VATProdPostingGroup,
    VATProdPostingGroupsResponse,
    GenProdPostingGroupsResponse,
    Contact,
    ContactsReponse
};
export {
    SeminarResponseExample,
    EmployeeResponseExample,
    CustomerResponseExample,
    UserResponseExample,
    LoginResponseExample,
    VATProdPostingGroupsResponseExample,
    GenProdPostingGroupsResponseExample,
    ContactsReponseExample
};