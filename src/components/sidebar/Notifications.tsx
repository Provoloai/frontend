import React, { useState, useRef, useEffect } from 'react';
import { Bell, Clock, MessageCircle, FileText, Star, Send, CreditCard, Search, UserCheck, Database, BellRing } from "lucide-react";
import { Link } from '@tanstack/react-router';

export default function Notifications() {
    const [isOpen, setIsOpen] = useState(false);
    const [expandedId, setExpandedId] = useState(null);
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'profile',
            icon: UserCheck,
            title: 'Profile Optimized',
            description: 'Your Upwork profile has been fully optimized',
            fullContent: 'Your Upwork profile optimization is complete. We rewrote your bio to be more client-focused, improved keyword placement for better ranking, suggested stronger project titles, and provided visual layout recommendations. You can now review your before-and-after comparison.',
            time: '5h ago',
            unread: true,
            color: 'blue'
        },
        {
            id: 2,
            type: 'proposal',
            icon: FileText,
            title: 'Proposal ready',
            description: 'Your AI proposal has been generated',
            fullContent: 'Your proposal for the job posting you submitted has been successfully generated. It includes a client-focused opening, tailored value propositions, and a concise closing CTA. Review and edit before sending.',
            time: '2h ago',
            unread: true,
            color: 'green'
        },
        {
            id: 3,
            type: 'knowledge',
            icon: Database,
            title: 'Knowledge Base Updated',
            description: 'LinkedIn import completed',
            fullContent: 'Your LinkedIn data has been successfully imported into your Provolo Knowledge Base. We extracted your skills, experience, tone style, and top achievements. Review or edit the imported details anytime for better personalization.',
            time: '1d ago',
            unread: false,
            color: 'purple'
        },
        {
            id: 4,
            type: 'community',
            icon: MessageCircle,
            title: 'New discussion in Provolo Learn',
            description: 'A new freelance growth thread is live',
            fullContent: 'A new discussion has been posted in Provolo Learn: “How to raise your rates without losing clients.” Join the conversation, share your experience, and learn from other freelancers in the community.',
            time: '3d ago',
            unread: true,
            color: 'orange'
        },
        {
            id: 5,
            type: 'achievement',
            icon: Star,
            title: 'Milestone unlocked',
            description: 'You completed your first optimization',
            fullContent: 'Congratulations! You just completed your first full profile optimization with Provolo. This unlocks your Level 1 Freelancer Badge. Keep optimizing, submitting proposals, and growing your presence to level up further.',
            time: '4d ago',
            unread: false,
            color: 'yellow'
        },
        {
            id: 6,
            type: 'proposal',
            icon: Send,
            title: 'Job Detected',
            description: 'A job matching your skills was found',
            fullContent: 'We found a new job posting that aligns with your skills and niche preferences. You can generate a proposal instantly using your Provolo Knowledge Base for maximum personalization.',
            time: '6h ago',
            unread: true,
            color: 'cyan'
        },
        {
            id: 7,
            type: 'subscription',
            icon: CreditCard,
            title: 'Premium activated',
            description: 'Your Provolo Plus subscription is now active',
            fullContent: 'Your Provolo Plus subscription is now active. You now have access to AI Proposals, LinkedIn Optimization, community features, analytics, and unlimited profile rewrites. Enjoy the full power of Provolo!',
            time: '1d ago',
            unread: false,
            color: 'green'
        },
        {
            id: 8,
            type: 'research',
            icon: Search,
            title: 'Proposal analysis complete',
            description: 'We analyzed your past proposals',
            fullContent: 'Your proposal history has been analyzed. We identified common strengths, weaknesses, and recommended structure improvements. You’ll see more tailored proposals going forward.',
            time: '2d ago',
            unread: false,
            color: 'gray'
        }

    ]);

    const menuRef = useRef(null);
    const unreadCount = notifications.filter(n => n.unread).length;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
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

    const markAsRead = (id) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, unread: false } : n
        ));
    };

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
        markAsRead(id);
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, unread: false })));
    };

    const getIconColor = (color) => {
        const colors = {
            blue: 'bg-blue-100 text-blue-600',
            purple: 'bg-purple-100 text-purple-600',
            gray: 'bg-gray-100 text-gray-600',
            green: 'bg-green-100 text-green-600'
        };
        return colors[color] || colors.gray;
    };

    return (
        <div className="fixed top-8 right-10 z-50" ref={menuRef}>
            {/* Bell Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative inline-flex items-center justify-center w-8 h-8 rounded-md bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 border border-gray-100"
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
                <div className="absolute right-0 mt-3 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                                <p className="text-sm text-gray-500 mt-0.5">
                                    {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
                                </p>
                            </div>
                            {unreadCount > 0 && (
                                <button
                                    onClick={markAllAsRead}
                                    className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                                >
                                    Mark all read
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Notifications List */}
                    <div className="max-h-[480px] overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="px-6 py-12 text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                                    <Bell size={24} className="text-gray-400" />
                                </div>
                                <p className="text-gray-500 text-sm">No notifications yet</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-50">
                                {notifications.map((notification) => {
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
                                                className="px-6 py-4 hover:bg-gray-50 cursor-pointer"
                                            >
                                                <div className="flex gap-3">
                                                    {/* Icon */}
                                                    <div className={`flex-shrink-0 w-10 h-10 rounded-full ${getIconColor(notification.color)} flex items-center justify-center`}>
                                                        <IconComponent size={18} />
                                                    </div>

                                                    {/* Content */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start justify-between gap-2">
                                                            <p className="text-sm font-semibold text-gray-900">
                                                                {notification.title}
                                                            </p>
                                                            {notification.unread && (
                                                                <span className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-1.5"></span>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-gray-600 mt-0.5 line-clamp-2">
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
                                                <div className="px-6 pb-4 animate-in fade-in slide-in-from-top-1 duration-200">
                                                    <div className="ml-[52px] p-4 bg-gray-50 rounded-lg border border-gray-200">
                                                        <p className="text-sm text-gray-700 leading-relaxed">
                                                            {notification.fullContent}
                                                        </p>
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
                    {/* {notifications.length > 0 && (
                        <div className="px-6 py-3 border-t border-gray-100 bg-gray-50">
                            <button className="w-full text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                                <Link to="/notifications">
                                    View all notifications
                                </Link>
                            </button>
                        </div>
                    )} */}
                </div>
            )}
        </div>
    );
}