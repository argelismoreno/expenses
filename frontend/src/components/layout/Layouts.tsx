import React from 'react';
import { AdminSidebar } from './AdminSidebar';
import { Menu, Search, Bell, Plus } from 'lucide-react';
import { EmployeeNavbar } from './EmployeeNavbar';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-black font-display flex flex-row overflow-hidden">
            <AdminSidebar />
            <main className="flex flex-1 flex-col md:pl-64 h-screen overflow-y-auto transition-all">
                {/* Admin Header */}
                <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur-md dark:border-slate-700 dark:bg-[#1a2632]/80">
                    <div className="flex items-center gap-4 md:hidden">
                        <button className="text-slate-500 hover:text-primary">
                            <Menu size={24} />
                        </button>
                        <span className="font-bold text-lg dark:text-black">
                            ExpenseFlow
                        </span>
                    </div>
                    <div className="hidden md:flex flex-1 items-center justify-between">
                        {/* Search Bar */}
                        <div className="flex max-w-md flex-1 items-center rounded-lg bg-slate-100 px-3 py-2 dark:bg-slate-800">
                            <Search className="text-slate-400" size={20} />
                            <input
                                className="ml-2 w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none dark:text-black border-none focus:ring-0 p-0"
                                placeholder="Search expenses, employees..."
                                type="text"
                            />
                        </div>
                        {/* Right Actions */}
                        <div className="flex items-center gap-4 ml-4">
                            <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700">
                                <Bell size={20} />
                                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
                            </button>
                            <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-black shadow-sm shadow-primary/30 hover:bg-primary/90 transition-all">
                                <Plus size={20} />
                                <span>New Expense</span>
                            </button>
                        </div>
                    </div>
                </header>

                {children}
            </main>
        </div>
    );
};

export const EmployeeLayout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-black font-display flex flex-col overflow-x-hidden">
            <EmployeeNavbar />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
};
