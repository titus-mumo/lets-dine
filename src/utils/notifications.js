import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastMessage = (type, message) => {
    switch (type) {
        case 'success':
            toast.success(message);
            break;
        case 'warning':
            toast.warning(message);
            break;
        case 'error':
            toast.error(message);
            break;
        case 'info':
            toast.info(message);
            break;
        default:
            break;
    }
}