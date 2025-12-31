import { http } from '../../../adapters/http/AxiosAdapter';
import type { LoginDto, RegisterDto, AuthResponse } from '../types/auth.types';
import type { AuthAdapter } from './AuthAdapter.interface';

export class AuthRepository implements AuthAdapter {
    async login(credentials: LoginDto): Promise<AuthResponse> {
        const response = await http.post<AuthResponse>('/auth/login', credentials);
        return response;
    }

    async register(data: RegisterDto): Promise<AuthResponse> {
        const response = await http.post<AuthResponse>('/auth/register', data);
        return response;
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
}

export const authRepository = new AuthRepository();
