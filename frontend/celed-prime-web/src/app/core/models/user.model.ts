export enum UserRole {
    ADMIN = 'admin',
    CLIENT = 'client'
}

export interface UserResponse {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: UserRole;
}

export interface UserRegistration {
    name: string;
    email: string;
    password: string;
    phone: string;
}