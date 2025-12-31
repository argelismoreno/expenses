type ToastType = 'success' | 'error' | 'info';

export interface ToastEventDetail {
    id: string;
    message: string;
    type: ToastType;
}

export const toast = {
    show: (message: string, type: ToastType = 'info') => {
        const event = new CustomEvent<ToastEventDetail>('show-toast', {
            detail: {
                id: Math.random().toString(36).substring(2, 9),
                message,
                type,
            },
        });
        window.dispatchEvent(event);
    },
    success: (message: string) => toast.show(message, 'success'),
    error: (message: string) => toast.show(message, 'error'),
    info: (message: string) => toast.show(message, 'info'),
};
