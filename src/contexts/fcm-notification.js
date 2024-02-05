import { db, messaging } from "@/lib/firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { getToken } from "firebase/messaging";
import { useAuth } from "./auth";
import moment from "jalali-moment";

const { createContext, useState, useEffect, useContext } = require("react");

const FCMNotificationContext = createContext();

export const FCMNotificationProvider = ({ children }) => {
    const [token, setToken] = useState('');
    const { user } = useAuth()
    const [notificationPermissionStatus, setNotificationPermissionStatus] = useState('');

    useEffect(() => {
        const retrieveToken = async () => {
            try {
                if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
                    // Retrieve the notification permission status
                    const permission = await Notification.requestPermission();
                    setNotificationPermissionStatus(permission);
                    const fcmMessaging = messaging()
                    // Check if permission is granted before retrieving the token
                    if (permission === 'granted') {
                        const currentToken = await getToken(fcmMessaging, {
                            vapidKey: process.env.NEXT_PUBLIC_VAPIDKEY,
                        });
                        if (currentToken) {
                            setToken(currentToken);
                            const _data = {
                                fcmToken: currentToken,
                            };

                            try {
                                updateDoc(doc(collection(db, "users"), user.uid), _data);
                            } catch (error) {
                                const errorData = {
                                    code: error.code,
                                    message: error.message,
                                    stack: error.stack,
                                };
                                addDoc(collection(db, "logs"), {
                                    action: "change fcm token",
                                    params: _data,
                                    user: user,
                                    error: errorData,
                                    created_at: moment().toDate(),
                                });
                            }
                        } else {
                            console.log(
                                'No registration token available. Request permission to generate one.'
                            );
                        }
                    }
                }
            } catch (error) {
                console.log('An error occurred while retrieving token:', error);
            }
        };

        retrieveToken();
    }, []);

    return (
        <FCMNotificationContext.Provider value={{ token, notificationPermissionStatus }}>
            {children}
        </FCMNotificationContext.Provider>
    );
};

const useFcm = () => {
    const { token, notificationPermissionStatus } = useContext(FCMNotificationContext)
    return { fcmToken: token, notificationPermissionStatus };
};

export default useFcm;
