import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Upload, Calendar, DollarSign, Send } from 'lucide-react';
import { EmployeeLayout } from '../../components/layout/Layouts';

export const NewExpense = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <EmployeeLayout>
            {/* Breadcrumb */}
            <div className="mb-6 flex items-center text-sm text-slate-500">
                <Link to="/dashboard" className="hover:text-primary">
                    Home
                </Link>
                <span className="mx-2">/</span>
                <Link to="/dashboard" className="hover:text-primary">
                    Expenses
                </Link>
                <span className="mx-2">/</span>
                <span className="text-slate-900 dark:text-black font-medium">
                    New Expense
                </span>
            </div>

            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-black">
                    Submit New Expense
                </h1>
                <p className="mt-2 text-slate-500 dark:text-slate-400">
                    Fill out the details below to request reimbursement for business
                    expenses.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 sm:p-8">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-black mb-6">
                            Expense Details
                        </h3>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-900 dark:text-black mb-2">
                                        Expense Type <span className="text-red-500">*</span>
                                    </label>
                                    <select className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-black focus:ring-primary focus:border-primary py-2.5 px-3">
                                        <option>Select category</option>
                                        <option>Travel</option>
                                        <option>Meals</option>
                                        <option>Equipment</option>
                                        <option>Training</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-900 dark:text-black mb-2">
                                        Date of Expense <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-black focus:ring-primary focus:border-primary py-2.5 pl-3 pr-10"
                                        />
                                        <Calendar
                                            className="absolute right-3 top-2.5 text-slate-400 pointer-events-none"
                                            size={20}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-900 dark:text-black mb-2">
                                        Total Amount <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <DollarSign
                                                size={18}
                                                className="text-slate-500 dark:text-slate-400"
                                            />
                                        </div>
                                        <input
                                            type="number"
                                            placeholder="0.00"
                                            className="w-full pl-10 pr-12 py-2.5 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-black focus:ring-primary focus:border-primary"
                                        />
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <span className="text-slate-500 text-sm">USD</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-900 dark:text-black mb-2">
                                        Short Description <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Lunch with client"
                                        className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-black focus:ring-primary focus:border-primary py-2.5 px-3"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-900 dark:text-black mb-2">
                                    Justification
                                </label>
                                <textarea
                                    rows={4}
                                    placeholder="Explain why this expense was necessary..."
                                    className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-black focus:ring-primary focus:border-primary p-3"
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-900 dark:text-black mb-2">
                                    Attach Receipt
                                </label>
                                <div
                                    className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800 cursor-pointer hover:border-primary transition-colors"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <input
                                        type="file"
                                        className="hidden"
                                        ref={fileInputRef}
                                        accept="image/*,application/pdf"
                                    />
                                    <div className="h-12 w-12 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center mb-4">
                                        <Upload size={24} />
                                    </div>
                                    <p className="text-sm font-medium text-primary hover:underline">
                                        Upload a file
                                    </p>
                                    <p className="text-xs text-slate-500 mt-1">
                                        PNG, JPG, PDF up to 10MB
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                                <button
                                    type="button"
                                    className="px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="inline-flex items-center gap-2 bg-primary hover:bg-blue-600 text-black font-medium py-2.5 px-6 rounded-lg shadow-sm hover:shadow transition-all"
                                >
                                    <Send size={18} />
                                    <span>Submit Expense</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Info Column */}
                <div className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-6 border border-blue-100 dark:border-blue-800">
                        <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-2">
                            Policy Reminder
                        </h4>
                        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                            <li className="flex gap-2">
                                <span className="text-blue-500">•</span>
                                <span>Meals limit is $60/day.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-blue-500">•</span>
                                <span>Travel must be pre-approved.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-blue-500">•</span>
                                <span>Receipts required for all expenses.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </EmployeeLayout>
    );
};
