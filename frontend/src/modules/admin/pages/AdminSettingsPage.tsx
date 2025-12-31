import { AdminLayout } from '../../../components/layout/Layouts';

export const AdminSettingsPage = () => {
    return (
        <AdminLayout>
            <div className="p-6 md:p-8">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-black">Settings</h1>
                <p className="mt-2 text-slate-500 dark:text-slate-400">
                    Application configuration and system settings coming soon.
                </p>
            </div>
        </AdminLayout>
    );
};
