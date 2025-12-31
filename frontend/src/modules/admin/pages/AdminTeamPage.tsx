import { AdminLayout } from '../../../components/layout/Layouts';

export const AdminTeamPage = () => {
    return (
        <AdminLayout>
            <div className="p-6 md:p-8">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-black">Team Management</h1>
                <p className="mt-2 text-slate-500 dark:text-slate-400">
                    Manage your team members and roles here. Feature coming soon.
                </p>
            </div>
        </AdminLayout>
    );
};
