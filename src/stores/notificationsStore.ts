import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserCheck, FileText, Database, MessageCircle, Star, Send, CreditCard, Search, Bell, Users, Megaphone, Shield, AlertCircle, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
    UserCheck,
    FileText,
    Database,
    MessageCircle,
    Star,
    Send,
    CreditCard,
    Search,
    Bell,
    Users,
    Megaphone,
    Shield,
    AlertCircle,
};

export interface Notification {
    id: number | string;
    type: string;
    iconName: string;
    icon: LucideIcon;
    title: string;
    description: string;
    fullContent: string;
    time: string;
    unread: boolean;
    color: string;
}

interface NotificationData {
    id: number | string;
    type: string;
    iconName: string;
    title: string;
    description: string;
    fullContent: string;
    time: string;
    unread: boolean;
    color: string;
}

// Convert NotificationData to Notification by adding icon component
const toNotification = (data: NotificationData): Notification => ({
    ...data,
    icon: iconMap[data.iconName] || FileText,
});

// Convert Notification to NotificationData for storage
const toNotificationData = (notification: Notification): NotificationData => ({
    id: notification.id,
    type: notification.type,
    iconName: notification.iconName,
    title: notification.title,
    description: notification.description,
    fullContent: notification.fullContent,
    time: notification.time,
    unread: notification.unread,
    color: notification.color,
});

interface NotificationsState {
    notifications: Notification[];
    isLoading: boolean;
    error: string | null;
    lastVisibleId: string | null;
    totalCount: number;
    setNotifications: (notifications: Notification[]) => void;
    setPaginationInfo: (lastVisibleId: string | null, totalCount: number) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    markAsRead: (id: number | string) => void;
    markAllAsRead: () => void;
    addNotifications: (notifications: Notification[]) => void;
}

export const useNotificationsStore = create<NotificationsState>()(
    persist(
        (set) => ({
            notifications: [],
            isLoading: false,
            error: null,
            lastVisibleId: null,
            totalCount: 0,
            
            setNotifications: (notifications: Notification[]) => {
                set({ notifications });
            },
            
            setPaginationInfo: (lastVisibleId: string | null, totalCount: number) => {
                set({ lastVisibleId, totalCount });
            },
            
            setLoading: (isLoading: boolean) => {
                set({ isLoading });
            },
            
            setError: (error: string | null) => {
                set({ error });
            },
            
            addNotifications: (newNotifications: Notification[]) => {
                set((state) => {
                    // Avoid duplicates based on id
                    const existingIds = new Set(state.notifications.map(n => n.id));
                    const uniqueNew = newNotifications.filter(n => !existingIds.has(n.id));
                    return {
                        notifications: [...state.notifications, ...uniqueNew],
                    };
                });
            },
            
            markAsRead: (id: number | string) => {
                set((state) => ({
                    notifications: state.notifications.map((n) =>
                        n.id === id ? { ...n, unread: false } : n
                    ),
                }));
            },
            
            markAllAsRead: () => {
                set((state) => ({
                    notifications: state.notifications.map((n) => ({ ...n, unread: false })),
                }));
            },
        }),
        {
            name: 'provolo_notifications',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                // Only persist read status, not the full notifications
                notifications: state.notifications.map(toNotificationData),
                lastVisibleId: state.lastVisibleId,
                totalCount: state.totalCount,
            }),
            merge: (persistedState, currentState) => {
                const persisted = persistedState as { notifications?: NotificationData[]; lastVisibleId?: string | null; totalCount?: number };
                if (persisted?.notifications) {
                    return {
                        ...currentState,
                        notifications: persisted.notifications.map(toNotification),
                        lastVisibleId: persisted.lastVisibleId || null,
                        totalCount: persisted.totalCount || 0,
                    };
                }
                return currentState;
            },
        }
    )
);
