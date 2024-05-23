import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastMessage = (type, message) => {
    const duration = 2000;

    const toastOptions = {
        autoClose: duration
    }
    switch (type) {
        case 'success':
            toast.success(message, toastOptions);
            break;
        case 'warning':
            toast.warning(message, toastOptions);
            break;
        case 'error':
            toast.error(message, toastOptions);
            break;
        case 'info':
            toast.info(message, toastOptions);
            break;
        default:
            break;
    }
}