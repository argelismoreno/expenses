import React from 'react';

export const Login: React.FC = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-black flex flex-col min-h-screen antialiased">
            {/* Top Navigation Bar */}
            <header className="w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 py-4 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Branding */}
                    <div className="flex items-center gap-3 text-slate-900 dark:text-black">
                        <div className="size-8 text-primary">
                            <svg
                                fill="currentColor"
                                viewBox="0 0 48 48"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    clipRule="evenodd"
                                    d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
                                    fill="currentColor"
                                    fillRule="evenodd"
                                ></path>
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold tracking-tight">ExpenseFlow</h2>
                    </div>
                    {/* Secondary Actions */}
                    <div className="hidden sm:flex gap-3">
                        <button className="flex items-center justify-center rounded-lg h-9 px-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                            Help Center
                        </button>
                        <button className="flex items-center justify-center rounded-lg h-9 px-4 bg-primary/10 text-primary text-sm font-bold hover:bg-primary/20 transition-colors">
                            Contact IT
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-12 relative overflow-hidden">
                {/* Abstract Background Decoration */}
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px] opacity-60 pointer-events-none"></div>
                <div className="absolute top-1/2 -right-20 w-80 h-80 bg-blue-300/20 dark:bg-blue-900/20 rounded-full blur-[100px] opacity-60 pointer-events-none"></div>

                {/* Login Card */}
                <div className="w-full max-w-6xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 border border-slate-100 dark:border-slate-800">
                    {/* Left Side: Hero Image & Testimonial */}
                    <div className="relative hidden lg:flex flex-col justify-between p-12 bg-slate-900">
                        {/* Hero Image */}
                        <div className="absolute inset-0 z-0">
                            <img
                                alt="Abstract data visualization on a dark background representing financial analytics"
                                className="w-full h-full object-cover opacity-80 mix-blend-overlay"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAg23XBnHTUPSRZUzJg2wkAJXMWv-RLrCRn2WktHHY8W-Ao_DYsdSmInZ9XoHT9eJJtA_FQmWUTsRhzuL3QKDEYPosWmdSV1dhJzko9VzNbMss4dQJQr1ifl3W_eqDuFP-7-vKaXeB6tVFjj-lIMIIH40ioE7euqnBvXQSmruYLTgUT9YnXkHBJVs6PlQ5h7oKzWAz2I5MXku-gtqZN8OyMKs8N7oWmGyCD6jc1iTZwUcmyIkw6oBmOdDkBQsCb65wzuC6wNuC3Hg"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/60 to-slate-900/95"></div>
                        </div>
                        {/* Branding/Testimonial Content */}
                        <div className="relative z-10 h-full flex flex-col justify-end">
                            <div className="mb-8">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-6 backdrop-blur-sm">
                                    <span className="material-symbols-outlined text-2xl text-primary">
                                        trending_up
                                    </span>
                                </div>
                                <h3 className="text-3xl font-bold text-black mb-3">
                                    Streamline your expenses.
                                </h3>
                                <p className="text-slate-300 text-lg leading-relaxed max-w-md">
                                    Join thousands of professionals who trust ExpenseFlow to manage
                                    their business finances securely and efficiently.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Login Form */}
                    <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16 w-full max-w-xl mx-auto lg:mx-0 bg-white dark:bg-slate-900">
                        {/* Welcome Section */}
                        <div className="mb-10">
                            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-black tracking-tight mb-3">
                                Welcome back
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg">
                                Securely manage your expenses with ExpenseFlow. Please sign in
                                to continue.
                            </p>
                        </div>

                        <form className="space-y-6">
                            {/* Email Field */}
                            <label className="block group">
                                <span className="text-slate-900 dark:text-black text-sm font-semibold mb-2 block group-focus-within:text-primary transition-colors">
                                    Email Address
                                </span>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                        <span className="material-symbols-outlined">mail</span>
                                    </div>
                                    <input
                                        className="w-full pl-11 pr-4 py-3.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-base"
                                        placeholder="name@company.com"
                                        type="email"
                                    />
                                </div>
                            </label>

                            {/* Password Field */}
                            <label className="block group">
                                <span className="text-slate-900 dark:text-black text-sm font-semibold mb-2 block group-focus-within:text-primary transition-colors">
                                    Password
                                </span>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                        <span className="material-symbols-outlined">lock</span>
                                    </div>
                                    <input
                                        className="w-full pl-11 pr-4 py-3.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-base"
                                        placeholder="•••••••••"
                                        type="password"
                                    />
                                </div>
                            </label>

                            {/* Additional Options */}
                            <div className="flex flex-wrap items-center justify-between gap-y-2">
                                <label className="flex items-center gap-2.5 cursor-pointer group select-none">
                                    <input
                                        className="h-5 w-5 rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-primary focus:ring-0 focus:ring-offset-0 transition-colors cursor-pointer"
                                        type="checkbox"
                                    />
                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-black transition-colors">
                                        Keep me logged in
                                    </span>
                                </label>
                                <a
                                    className="text-sm font-bold text-primary hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                    href="#"
                                >
                                    Forgot password?
                                </a>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2">
                                <button
                                    className="group w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg bg-primary hover:bg-blue-600 active:bg-blue-700 text-black text-base font-bold tracking-wide transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40"
                                    type="button"
                                >
                                    <span>Sign In</span>
                                    <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                                        arrow_forward
                                    </span>
                                </button>
                            </div>

                            {/* Footer */}
                            <div className="relative pt-4">
                                <div
                                    aria-hidden="true"
                                    className="absolute inset-0 flex items-center"
                                >
                                    <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-white dark:bg-slate-900 px-2 text-slate-500">
                                        New employee?
                                    </span>
                                </div>
                            </div>
                            {/* <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                                Don't have an account?{' '}
                                <a
                                    className="text-slate-900 dark:text-black font-bold hover:text-primary transition-colors"
                                    href="#"
                                >
                                    Contact Admin
                                </a>
                            </p> */}
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};
