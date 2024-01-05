import { useState, useEffect } from 'react';

const useOnlineStatus = () => {
    const [isOnline, setOnlineStatus] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => {
            setOnlineStatus(true);
        };

        const handleOffline = () => {
            setOnlineStatus(false);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return isOnline;
};

export default useOnlineStatus;