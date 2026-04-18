import { useState, useRef, useEffect, useMemo } from 'react';
import { Bell, Clock, BellRing } from "lucide-react";
import { Link, useNavigate } from '@tanstack/react-router';
import { useNotificationsStore } from '@/stores/notificationsStore';

export default function Notifications() {
    const [isOpen, setIsOpen] = useState(false);
    const [expandedId, setExpandedId] = useState<number | string | null>(null);
    const [isMarkingAllAsRead, setIsMarkingAllAsRead] = useState(false);
    const navigate = useNavigate();
    const notifications = useNotificationsStore((state) => state.notifications);
    const totalCount = useNotificationsStore((state) => state.totalCount);
    const markAsReadAsync = useNotificationsStore((state) => state.markAsReadAsync);
    const markAllAsReadAsync = useNotificationsStore((state) => state.markAllAsReadAsync);

    // Data is loaded once in _sidebarlayout.tsx; preview uses first 5.
    // Always show first 5 notifications in sidebar
    const recentNotifications = useMemo(() => notifications.slice(0, 5), [notifications]);
    const unreadCount = useMemo(() => notifications.filter((n) => n.unread).length, [notifications]);

    // Show "View older notifications" only if there are more than 5 notifications
    // Check both stored notifications length and totalCount from API
    const hasMoreNotifications = notifications.length > 5 || totalCount > 5;

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const toggleExpand = (id: number | string) => {
        setExpandedId(expandedId === id ? null : id);
        // Call async API method to mark as read
        markAsReadAsync(String(id)).catch((error) => {
            console.error('Failed to mark notification as read:', error);
        });
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

    const handleNotificationLink = (link: string) => {
        if (link.startsWith('http://') || link.startsWith('https://')) {
            window.open(link, '_blank');
        } else {
            navigate({ to: link as any });
            setIsOpen(false);
        }
    };

    return (
        <div className="fixed top-8 right-10 z-50" ref={menuRef}>
            {/* Bell Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative inline-flex items-center justify-center w-8 h-8 rounded-md bg-white transition-all duration-200 hover:scale-105 border border-gray-100"
            >
                <BellRing size={20} className="text-gray-700" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full animate-pulse">
                        {unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown Panel */}
            {isOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Header */}
                    <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-base font-semibold text-gray-900">Notifications</h3>
                                <p className="text-xs text-gray-500">
                                    {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
                                </p>
                            </div>
                            {unreadCount > 0 && (
                                <button
                                    onClick={async () => {
                                        setIsMarkingAllAsRead(true);
                                        try {
                                            await markAllAsReadAsync();
                                        } catch (error) {
                                            console.error('Failed to mark all as read:', error);
                                        } finally {
                                            setIsMarkingAllAsRead(false);
                                        }
                                    }}
                                    disabled={isMarkingAllAsRead}
                                    className="text-sm font-medium text-blue-600 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {isMarkingAllAsRead ? 'Marking...' : 'Mark all read'}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Notifications List */}
                    <div className="max-h-[480px] overflow-y-auto">
                        {recentNotifications.length === 0 ? (
                            <div className="px-6 py-12 text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                                    <Bell size={24} className="text-gray-400" />
                                </div>
                                <p className="text-gray-500 text-sm">No notifications yet</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-50">
                                {recentNotifications.map((notification) => {
                                    const IconComponent = notification.icon;
                                    const isExpanded = expandedId === notification.id;
                                    return (
                                        <div
                                            key={notification.id}
                                            className={`transition-colors ${notification.unread ? 'bg-blue-50/50' : ''
                                                }`}
                                        >
                                            <div
                                                onClick={() => toggleExpand(notification.id)}
                                                className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                                            >
                                                <div className="flex gap-2.5">
                                                    {/* Icon */}
                                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full ${getIconColor(notification.color)} flex items-center justify-center`}>
                                                        <IconComponent size={16} />
                                                    </div>

                                                    {/* Content */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start justify-between gap-1.5">
                                                            <p className="text-[13px] font-semibold text-gray-900 leading-tight">
                                                                {notification.title}
                                                            </p>
                                                            {notification.unread && (
                                                                <span className="flex-shrink-0 w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5"></span>
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1 truncate">
                                                            {notification.description}
                                                        </p>
                                                        <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                                                            <Clock size={12} />
                                                            <span>{notification.time}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Expanded Content */}
                                            {isExpanded && (
                                                <div className="px-4 animate-in fade-in slide-in-from-top-1 duration-200 pb-3">
                                                    <div className="ml-[34px] p-3 bg-gray-50 rounded-xl border border-gray-100">
                                                        <p className="text-[12px] text-gray-600 leading-relaxed">
                                                            {notification.fullContent}
                                                        </p>
                                                        {notification.link && (
                                                            <button
                                                                onClick={() => handleNotificationLink(notification.link!)}
                                                                className="mt-3  flex align-middle gap-1 hover:gap-3 transition-all duration-300 text-xs text-gray-500 hover:text-gray-950 hover:underline"
                                                            >
                                                                Check it out
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {hasMoreNotifications && (
                        <Link to="/notifications">
                            <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50">
                                <button className="w-full text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors">
                                    View older notifications
                                </button>
                            </div>
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}