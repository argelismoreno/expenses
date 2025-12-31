export interface LoginDto {
    email: string;
    password?: string;
}

export interface RegisterDto {
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
}

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'admin' | 'employee';
}

export interface AuthResponse {
    token: string;
    user: User;
    message: string;
}
