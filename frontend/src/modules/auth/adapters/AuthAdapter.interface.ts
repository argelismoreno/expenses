import type { LoginDto, RegisterDto, AuthResponse } from '../types/auth.types';

export interface AuthAdapter {
    login(credentials: LoginDto): Promise<AuthResponse>;
    register(data: RegisterDto): Promise<AuthResponse>;
    logout(): void;
}
