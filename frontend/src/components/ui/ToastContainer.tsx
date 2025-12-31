import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { type ToastEventDetail } from '../../utils/toast';

interface ToastItem extends ToastEventDetail {
    visible: boolean;
}

export const ToastContainer = () => {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    useEffect(() => {
        const handleToastObj = (event: Event) => {
            const customEvent = event as CustomEvent<ToastEventDetail>;
            const newToast = { ...customEvent.detail, visible: true };

            setToasts((prev) => [...prev, newToast]);

            // Auto dismiss
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
            }, 5000);
        };

        window.addEventListener('show-toast', handleToastObj);
        return () => window.removeEventListener('show-toast', handleToastObj);
    }, []);

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    if (toasts.length === 0) return null;

    return (
        <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border w-80 transform transition-all duration-300 ease-in-out
                        ${toast.type === 'success'
                            ? 'bg-white border-green-200 text-slate-800 dark:bg-slate-800 dark:border-green-900/30'
                            : toast.type === 'error'
                                ? 'bg-white border-red-200 text-slate-800 dark:bg-slate-800 dark:border-red-900/30'
                                : 'bg-white border-blue-200 text-slate-800 dark:bg-slate-800 dark:border-blue-900/30'
                        }
                    `}
                >
                    <div className="flex-shrink-0">
                        {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
                        {toast.type === 'error' && <XCircle className="w-5 h-5 text-red-500" />}
                        {toast.type === 'info' && <Info className="w-5 h-5 text-blue-500" />}
                    </div>
                    <p className="flex-1 text-sm font-medium dark:text-gray-200">{toast.message}</p>
                    <button
                        onClick={() => removeToast(toast.id)}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>
            ))}
        </div>
    );
};
