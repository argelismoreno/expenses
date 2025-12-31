import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    FileText,
    Users,
    Settings,
    Wallet,
    LogOut,
} from 'lucide-react';
import clsx from 'clsx';
import { useAuth } from '../../modules/auth/hooks/useAuth';

export const AdminSidebar = () => {
    const location = useLocation();
    const { logout } = useAuth();

    const navItems = [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { name: 'Reports', path: '/admin/reports', icon: FileText },
        { name: 'Team', path: '/admin/team', icon: Users },
        { name: 'Settings', path: '/admin/settings', icon: Settings },
    ];

    return (
        <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white dark:bg-[#1a2632] dark:border-slate-700 md:flex fixed h-full z-10 transition-colors">
            <div className="flex h-full flex-col justify-between p-4">
                <div className="flex flex-col gap-6">
                    {/* Logo */}
                    <div className="flex items-center gap-3 px-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-black">
                            <Wallet size={24} />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-slate-900 dark:text-black text-base font-bold leading-normal">
                                ExpenseFlow
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 text-xs font-normal leading-normal">
                                Admin Console
                            </p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-col gap-2">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={clsx(
                                        'flex items-center gap-3 rounded-lg px-3 py-2 transition-colors',
                                        isActive
                                            ? 'bg-primary/10 text-primary dark:text-primary'
                                            : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                                    )}
                                >
                                    <item.icon size={20} />
                                    <p className="text-sm font-medium leading-normal">
                                        {item.name}
                                    </p>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* User Profile (Bottom Sidebar) */}
                <div className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-slate-200">
                        <img
                            alt="Admin user"
                            className="h-full w-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnpdMpTxpmQqZdcwzEeeDir6uuNyAyGjHd-DvRJAhQae0-H2I1RQHVo1k3ldPh1eTXnRDFT87uAJsC5xSGHHb1Sc7Z5WZC726t3JFjjF8WYYjvNExQPA-shI3qHSix1gptl2GocUWdfpssN2pr2lIgPJHophGC4On2Z3EHn3yOZ73_ktyEkDnWLazj08hTYQkpQetGwhQfAuRbR91kVrDfho7oTkziVmlV9hOKTxoaJ5LYWRhzu8ZbL2fG-h0CJYODVxOf-w0O_A"
                        />
                    </div>
                    <div className="flex flex-col overflow-hidden flex-1">
                        <p className="truncate text-sm font-medium text-slate-900 dark:text-black">
                            Alex Morgan
                        </p>
                        <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                            Super Admin
                        </p>
                    </div>
                    <button
                        onClick={logout}
                        className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Sign out"
                    >
                        <LogOut size={18} />
                    </button>
                </div>
            </div>
        </aside>
    );
};
