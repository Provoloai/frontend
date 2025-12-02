import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react';
import { Clock, CheckCircle2, Bell } from "lucide-react";
import { useNotificationsStore } from '@/stores/notificationsStore';
import { useNotifications } from '@/hooks/useNotifications';

const NotificationsPage = () => {
    const [expandedId, setExpandedId] = useState<number | string | null>(null);
    const notifications = useNotificationsStore((state) => state.notifications);
    const isLoading = useNotificationsStore((state) => state.isLoading);
    const error = useNotificationsStore((state) => state.error);
    const markAsRead = useNotificationsStore((state) => state.markAsRead);
    const markAllAsRead = useNotificationsStore((state) => state.markAllAsRead);

    // Fetch all notifications (will fetch more if needed)
    useNotifications(20);

    // Show older notifications (everything after the first 5)
    const olderNotifications = useMemo(() => notifications.slice(5), [notifications]);

    // Total unread count across all notifications
    const olderUnreadCount = useMemo(() => olderNotifications.filter((n) => n.unread).length, [olderNotifications]);

    const toggleExpand = (id: number | string) => {
        setExpandedId(expandedId === id ? null : id);
        markAsRead(id);
    };

    const getIconColor = (color: string) => {
        const colors: Record<string, string> = {
            blue: 'bg-blue-100 text-blue-600',
            purple: 'bg-purple-100 text-purple-600',
            gray: 'bg-gray-100 text-gray-600',
            green: 'bg-green-100 text-green-600',
            orange: 'bg-orange-100 text-orange-600',
            yellow: 'bg-yellow-100 text-yellow-600',
            cyan: 'bg-cyan-100 text-cyan-600',
        };
        return colors[color] || colors.gray;
    };

    return (
        <div className="flex-1 flex flex-col py-10 overflow-y-auto">
            <div className="p-6 sm:p-10 m-full w-full max-w-4xl">
                {/* <Link
                    to="/optimizer"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-4 transition-colors"
                >
                    <ArrowLeft size={16} />
                    Back to Optimizer
                </Link> */}

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">
                            Older Notifications
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {olderUnreadCount > 0 ? `${olderUnreadCount} unread notification${olderUnreadCount > 1 ? 's' : ''}` : olderNotifications.length > 0 ? 'All caught up!' : 'No older notifications'}
                        </p>
                    </div>
                    {olderUnreadCount > 0 && (
                        <button
                            onClick={markAllAsRead}
                            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                        >
                            Mark all as read
                        </button>
                    )}
                </div>

                {/* Notifications List */}
                <div className="space-y-3">
                    {isLoading ? (
                        <div className="py-16 text-center bg-white rounded-2xl border border-gray-100">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                            </div>
                            <p className="text-gray-500 text-sm">Loading notifications...</p>
                        </div>
                    ) : error ? (
                        <div className="py-16 text-center bg-white rounded-2xl border border-gray-100">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                                <CheckCircle2 size={24} className="text-red-400" />
                            </div>
                            <p className="text-red-500 text-sm">{error}</p>
                        </div>
                    ) : olderNotifications.length === 0 ? (
                        <div className="py-16 text-center bg-white rounded-2xl border border-gray-100">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                                <Bell size={24} className="text-gray-400" />
                            </div>
                            <p className="text-gray-500 text-sm">
                                {notifications.length > 0
                                    ? 'All your recent notifications are shown in the sidebar.'
                                    : 'No notifications yet'}
                            </p>
                        </div>
                    ) : (
                        <AnimatePresence>
                            {olderNotifications.map((notification) => {
                                const IconComponent = notification.icon;
                                const isExpanded = expandedId === notification.id;
                                return (
                                    <motion.div
                                        key={notification.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${notification.unread
                                            ? 'border-blue-200 shadow-sm'
                                            : 'border-gray-100 hover:border-gray-200'
                                            }`}
                                    >
                                        <div
                                            onClick={() => toggleExpand(notification.id)}
                                            className="px-6 py-5 hover:bg-gray-50 cursor-pointer transition-colors"
                                        >
                                            <div className="flex gap-4">
                                                {/* Icon */}
                                                <div className={`flex-shrink-0 w-12 h-12 rounded-full ${getIconColor(notification.color)} flex items-center justify-center`}>
                                                    <IconComponent size={20} />
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-3 mb-1">
                                                        <h3 className="text-base font-semibold text-gray-900">
                                                            {notification.title}
                                                        </h3>
                                                        <div className="flex items-center gap-2">
                                                            {notification.unread && (
                                                                <span className="flex-shrink-0 w-2.5 h-2.5 bg-blue-600 rounded-full"></span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mb-2">
                                                        {notification.description}
                                                    </p>
                                                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                        <Clock size={13} />
                                                        <span>{notification.time}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Expanded Content */}
                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="px-6 pb-5">
                                                        <div className="ml-16 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                                            <p className="text-sm text-gray-700 leading-relaxed">
                                                                {notification.fullContent}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationsPage;