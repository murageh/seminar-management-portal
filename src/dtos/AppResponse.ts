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

interface SeminarResponse {
    success: boolean;
    message: string;
    statusCode: number;
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

const LoginResponseExample: LoginResponse = {
    "success": true,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Im1haW5hIiwiYWN0b3J0IjoiezY0MjY2QzE4LTlEMUUtNDIxNS1CNUZGLTgxQ0NDRjU4MjEzNn0iLCJyb2xlIjoidXNlciIsIm5iZiI6MTczMTc1NDA3NywiZXhwIjoxNzMxNzc1Njc3LCJpYXQiOjE3MzE3NTQwNzcsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcyMzIiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo3MjMyIn0.Vt3ixVsZsYTVdCeNUY_qWRlC80XJWc_Dh1Odno6u144",
        "expiresIn": 21600,
        "refreshToken": ""
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
        },
        {
            "no": "01454545",
            "name": "New Concepts Furniture",
            "post_Code": "US-GA 31772",
            "country_Region_Code": "US",
            "phone_No": "",
            "contact": "Ms. Tammy L. McDonald",
            "currency_Code": "USD",
            "blocked": " ",
            "balance_LCY": 222241.32,
            "balance_Due_LCY": 0,
            "sales_LCY": 0,
            "payments_LCY": 0
        },
        {
            "no": "01905893",
            "name": "Candoxy Canada Inc.",
            "post_Code": "CA-ON P7B 5E2",
            "country_Region_Code": "CA",
            "phone_No": "",
            "contact": "Mr. Rob Young",
            "currency_Code": "CAD",
            "blocked": " ",
            "balance_LCY": 0,
            "balance_Due_LCY": 0,
            "sales_LCY": 0,
            "payments_LCY": 0
        },
        {
            "no": "01905899",
            "name": "Elkhorn Airport",
            "post_Code": "CA-MB R0M 0N0",
            "country_Region_Code": "CA",
            "phone_No": "",
            "contact": "Mr. Ryan Danner",
            "currency_Code": "CAD",
            "blocked": " ",
            "balance_LCY": 0,
            "balance_Due_LCY": 0,
            "sales_LCY": 0,
            "payments_LCY": 0
        }
    ],
    "count": 5,
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
        },
        {
            "no": "KH",
            "fullName": "Katherine Hull",
            "resource_No": "KATHERINE"
        },
        {
            "no": "LT",
            "fullName": "Lina Townsend",
            "resource_No": "LINA"
        },
        {
            "no": "MH",
            "fullName": "Marty Horst",
            "resource_No": "MARTY"
        },
        {
            "no": "OF",
            "fullName": "Otis Falls",
            "resource_No": ""
        },
        {
            "no": "RB",
            "fullName": "Robin Bettencourt",
            "resource_No": ""
        },
        {
            "no": "TD",
            "fullName": "Terry Dodds",
            "resource_No": "TERRY"
        }
    ],
    "count": 8,
    "message": "Employees fetched successfully"
};

const SeminarResponseExample: SeminarResponse = {
    "success": true,
    "message": "Operation successful.",
    "statusCode": 200,
    "data": [
        {
            "no": "SEMN0003",
            "name": "Test Seminar",
            "seminarDuration": 0,
            "seminarPrice": 0,
            "blocked": false,
            "gen_Prod_Posting_Group": "SERVICES",
            "vaT_Prod_Posting_Group": "VAT25"
        },
        {
            "no": "SEMN0004",
            "name": "Seminar II",
            "seminarDuration": 0,
            "seminarPrice": 0,
            "blocked": false,
            "gen_Prod_Posting_Group": "SERVICES",
            "vaT_Prod_Posting_Group": "VAT25"
        },
        {
            "no": "SEMN0009",
            "name": "From Swagger",
            "seminarDuration": 0,
            "seminarPrice": 0,
            "blocked": false,
            "gen_Prod_Posting_Group": "SERVICES",
            "vaT_Prod_Posting_Group": "VAT25"
        },
        {
            "no": "SEMN0012",
            "name": "Hallo hallo",
            "seminarDuration": 0,
            "seminarPrice": 0,
            "blocked": false,
            "gen_Prod_Posting_Group": "SERVICES",
            "vaT_Prod_Posting_Group": "VAT25"
        },
        {
            "no": "SEMN0013",
            "name": "This is an edit from Swagger",
            "seminarDuration": 0,
            "seminarPrice": 0,
            "blocked": false,
            "gen_Prod_Posting_Group": "",
            "vaT_Prod_Posting_Group": ""
        },
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
        },
        {
            "no": "SEMN0016",
            "name": "hgh erkfgh",
            "seminarDuration": 0,
            "seminarPrice": 0,
            "blocked": true,
            "gen_Prod_Posting_Group": "",
            "vaT_Prod_Posting_Group": ""
        },
        {
            "no": "SEMN0020",
            "name": "vrk mel",
            "seminarDuration": 0,
            "seminarPrice": 0,
            "blocked": false,
            "gen_Prod_Posting_Group": "",
            "vaT_Prod_Posting_Group": ""
        }
    ]
};

export type {
    ErrorResponse,
    SeminarResponse,
    EmployeeResponse,
    CustomerResponse,
    UserResponse,
    UsersResponse,
    LoginResponse
};
export {
    SeminarResponseExample,
    EmployeeResponseExample,
    CustomerResponseExample,
    UserResponseExample,
    LoginResponseExample
};