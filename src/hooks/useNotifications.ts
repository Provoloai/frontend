import { useEffect } from 'react';
import { useGetNotifications } from '@/api';
import { useNotificationsStore } from '@/stores/notificationsStore';
import { transformBackendNotification, getIconFromName } from '@/utils/notifications.util';
import type { Notification } from '@/stores/notificationsStore';

export const useNotifications = (limit: number = 20, startAfter?: string) => {
    const { data, isLoading, error, refetch } = useGetNotifications(limit, startAfter);
    const setNotifications = useNotificationsStore((state) => state.setNotifications);
    const setPaginationInfo = useNotificationsStore((state) => state.setPaginationInfo);
    const setLoading = useNotificationsStore((state) => state.setLoading);
    const setError = useNotificationsStore((state) => state.setError);
    const addNotifications = useNotificationsStore((state) => state.addNotifications);
    const lastVisibleId = useNotificationsStore((state) => state.lastVisibleId);
    
    useEffect(() => {
        setLoading(isLoading);
        if (error) {
            setError(error instanceof Error ? error.message : 'Failed to fetch notifications');
        } else {
            setError(null);
        }
    }, [isLoading, error, setLoading, setError]);

    useEffect(() => {
        if (data?.data?.notifications) {
            const backendNotifications = data.data.notifications;
            const transformedNotifications: Notification[] = backendNotifications.map((backendNotif) => {
                const transformed = transformBackendNotification(backendNotif);
                return {
                    ...transformed,
                    icon: getIconFromName(transformed.iconName),
                };
            });

            // If startAfter is provided, append; otherwise replace
            if (startAfter) {
                addNotifications(transformedNotifications);
            } else {
                setNotifications(transformedNotifications);
            }

            // Update pagination info
            setPaginationInfo(
                data.data.lastVisibleId || null,
                data.data.totalCount || 0
            );
        }
    }, [data, startAfter, setNotifications, addNotifications, setPaginationInfo]);

    return {
        refetch,
        isLoading,
        error: error instanceof Error ? error.message : null,
        lastVisibleId,
    };
};
