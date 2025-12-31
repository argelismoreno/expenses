import { useState, type FormEvent } from 'react';
import { BaseInput } from '../../../components/base/BaseInput';
import { BaseButton } from '../../../components/base/BaseButton';
import type { LoginDto } from '../types/auth.types';
import { Mail, Lock, ArrowRight } from 'lucide-react';

interface LoginFormProps {
    onSubmit: (data: LoginDto) => void;
    isLoading: boolean;
    error: string | null;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading, error }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit({ email, password });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <BaseInput
                type="email"
                label="Email Address"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                leftIcon={<Mail size={18} />}
            />

            <BaseInput
                type="password"
                label="Password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                leftIcon={<Lock size={18} />}
            />

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700 dark:text-slate-300">
                        Remember me
                    </label>
                </div>
            </div>

            <BaseButton
                type="submit"
                className="w-full"
                isLoading={isLoading}
                rightIcon={!isLoading && <ArrowRight size={18} />}
            >
                Sign in
            </BaseButton>
        </form>
    );
};
