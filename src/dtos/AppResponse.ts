import {SeminarHeader} from "./SeminarHeader.ts";
import {Employee} from "./Employee.ts";
import {Customer} from "./Customer.ts";
import {JWTToken, User} from "./User.ts";
import {MyRegistration} from "./MyRegistration.ts";

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
    data: SeminarHeader;
}

interface SeminarListResponse extends SeminarResponseBase {
    data: SeminarHeader[];
}

interface EmployeeResponse {
    success: boolean;
    employees: Employee[];
    count: number;
    message: string;
}

interface CustomerResponse {
    success: boolean;
    customer: Customer;
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

interface ContactsResponse {
    success: boolean;
    message: string;
    statusCode: number;
    data: Contact[];
}

interface MyRegistrationsResponse {
    success: boolean;
    data: MyRegistration[];
    title: string;
    path: string;
    statusCode: number;
    message: string;
}

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
    ContactsResponse,
    MyRegistrationsResponse
};