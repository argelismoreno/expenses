import { Link, useLocation } from 'react-router-dom';
import { Wallet, Bell, LogOut } from 'lucide-react';
import clsx from 'clsx';
import { useAuth } from '../../modules/auth/hooks/useAuth';

export const EmployeeNavbar = () => {
    const location = useLocation();
    const { logout } = useAuth();

    const navItems = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Reports', path: '/reports' },
        { name: 'Settings', path: '/settings' },
    ];

    return (
        <nav className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a2632] sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Left Side: Logo & Brand */}
                    <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 flex items-center gap-2">
                            <div className="size-8 text-primary bg-primary/10 rounded-lg flex items-center justify-center">
                                <Wallet size={24} />
                            </div>
                            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-black">
                                ExpenseFlow
                            </h1>
                        </div>
                        {/* Desktop Menu */}
                        <div className="hidden md:flex ml-10 space-x-1">
                            {navItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        className={clsx(
                                            'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                                            isActive
                                                ? 'bg-primary/10 text-primary'
                                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-black hover:bg-slate-50 dark:hover:bg-slate-800'
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                    {/* Right Side: Notifications, Profile */}
                    <div className="flex items-center gap-4">
                        <button className="p-2 rounded-lg text-slate-500 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#1a2632]"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium text-slate-900 dark:text-black">
                                    Jane Doe
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Software Engineer
                                </p>
                            </div>
                            <div
                                className="size-9 rounded-full bg-slate-200 dark:bg-slate-700 bg-center bg-cover border-2 border-white dark:border-slate-800 shadow-sm"
                                style={{
                                    backgroundImage:
                                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCKPs6XztntcUA9UDGcLBOeBxvlYrNikWelYeAUwub9rxHX85Yl0GGn8lgoAKSxVqc7wVTlmTQZx4Ooe3LJkYNQ7au4Q81TQ7vg15DmSbGbZNtbwo8I1lgF8usIOK-IR_LIz4JgO_RIw33Yod7DxRocMvoE4h-KRTNFGLhgdW2jsuURXwOc17G5cJPQbLBOBln3qoQGmHM3W3Z3gIbP6Bk3CwZaut-k9Bg0FYSQMpK6FFTKLZ_Blxzb5oweHu3hY-4G88Bxrnl-uA')",
                                }}
                            ></div>
                            <button
                                onClick={logout}
                                className="p-2 text-slate-500 hover:text-red-600 transition-colors"
                                title="Sign out"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
