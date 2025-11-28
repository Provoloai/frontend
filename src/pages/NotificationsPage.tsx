import { Link } from '@tanstack/react-router'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Clock, MessageCircle, FileText, Star, Send, CreditCard, Search, UserCheck, Database, BellRing, ArrowLeft } from "lucide-react";


const NotificationsPage = () => {
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

    const unreadCount = notifications.filter(n => n.unread).length;

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
                            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
                        </p>
                    </div>
                    {unreadCount > 0 && (
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
                    {notifications.length === 0 ? (
                        <div className="py-16 text-center bg-white rounded-2xl border border-gray-100">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                                <CheckCircle2 size={24} className="text-gray-400" />
                            </div>
                            <p className="text-gray-500 text-sm">No notifications yet</p>
                        </div>
                    ) : (
                        <AnimatePresence>
                            {notifications.map((notification) => {
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