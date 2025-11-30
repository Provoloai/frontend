import { 
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
    LucideIcon 
} from "lucide-react";
import { NotificationCategory, BackendNotification, FirebaseTimestamp } from "@/api";
import type { Notification } from "@/stores/notificationsStore";

// Map backend categories to icons
const categoryIconMap: Record<NotificationCategory, LucideIcon> = {
    [NotificationCategory.PROFILE]: UserCheck,
    [NotificationCategory.PROPOSAL]: FileText,
    [NotificationCategory.KNOWLEDGE]: Database,
    [NotificationCategory.COMMUNITY]: MessageCircle,
    [NotificationCategory.ACHIEVEMENT]: Star,
    [NotificationCategory.SUBSCRIPTION]: CreditCard,
    [NotificationCategory.RESEARCH]: Search,
    [NotificationCategory.SYSTEM]: Bell,
    [NotificationCategory.USER]: Users,
    [NotificationCategory.PROMOTION]: Megaphone,
    [NotificationCategory.ADMIN]: Shield,
    [NotificationCategory.OTHER]: AlertCircle,
};

// Map backend categories to icon names (for storage)
const categoryIconNameMap: Record<NotificationCategory, string> = {
    [NotificationCategory.PROFILE]: "UserCheck",
    [NotificationCategory.PROPOSAL]: "FileText",
    [NotificationCategory.KNOWLEDGE]: "Database",
    [NotificationCategory.COMMUNITY]: "MessageCircle",
    [NotificationCategory.ACHIEVEMENT]: "Star",
    [NotificationCategory.SUBSCRIPTION]: "CreditCard",
    [NotificationCategory.RESEARCH]: "Search",
    [NotificationCategory.SYSTEM]: "Bell",
    [NotificationCategory.USER]: "Users",
    [NotificationCategory.PROMOTION]: "Megaphone",
    [NotificationCategory.ADMIN]: "Shield",
    [NotificationCategory.OTHER]: "AlertCircle",
};

// Map backend categories to colors
const categoryColorMap: Record<NotificationCategory, string> = {
    [NotificationCategory.PROFILE]: "blue",
    [NotificationCategory.PROPOSAL]: "green",
    [NotificationCategory.KNOWLEDGE]: "purple",
    [NotificationCategory.COMMUNITY]: "orange",
    [NotificationCategory.ACHIEVEMENT]: "yellow",
    [NotificationCategory.SUBSCRIPTION]: "green",
    [NotificationCategory.RESEARCH]: "gray",
    [NotificationCategory.SYSTEM]: "blue",
    [NotificationCategory.USER]: "cyan",
    [NotificationCategory.PROMOTION]: "orange",
    [NotificationCategory.ADMIN]: "purple",
    [NotificationCategory.OTHER]: "gray",
};

// Convert Firebase Timestamp to Date
const convertFirebaseTimestampToDate = (timestamp: FirebaseTimestamp | string): Date | null => {
    // Check if it's a Firebase Timestamp object
    if (typeof timestamp === 'object' && timestamp !== null && '_seconds' in timestamp) {
        // Convert Firebase Timestamp (seconds + nanoseconds) to milliseconds
        const milliseconds = timestamp._seconds * 1000 + Math.floor(timestamp._nanoseconds / 1000000);
        return new Date(milliseconds);
    }
    
    // If it's a string, try to parse it
    if (typeof timestamp === 'string') {
        const date = new Date(timestamp);
        if (!isNaN(date.getTime())) {
            return date;
        }
    }
    
    return null;
};

// Format date to relative time (e.g., "5h ago", "2d ago")
export const formatRelativeTime = (dateInput: string | FirebaseTimestamp | undefined | null): string => {
    // Handle null, undefined
    if (!dateInput) {
        return 'recently';
    }

    try {
        const date = convertFirebaseTimestampToDate(dateInput);
        
        // Check if date conversion was successful
        if (!date || isNaN(date.getTime())) {
            console.warn('Invalid date input:', dateInput);
            return 'recently';
        }

        const now = new Date();
        const diffInMs = now.getTime() - date.getTime();
        
        // Handle negative differences (future dates)
        if (diffInMs < 0 || isNaN(diffInMs)) {
            return 'just now';
        }

        const diffInSeconds = Math.floor(diffInMs / 1000);

        if (isNaN(diffInSeconds) || diffInSeconds < 60) {
            return 'just now';
        }

        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (isNaN(diffInMinutes) || diffInMinutes < 60) {
            return `${diffInMinutes}m ago`;
        }

        const diffInHours = Math.floor(diffInMinutes / 60);
        if (isNaN(diffInHours) || diffInHours < 24) {
            return `${diffInHours}h ago`;
        }

        const diffInDays = Math.floor(diffInHours / 24);
        if (isNaN(diffInDays) || diffInDays < 30) {
            return `${diffInDays}d ago`;
        }

        const diffInMonths = Math.floor(diffInDays / 30);
        if (isNaN(diffInMonths) || diffInMonths < 12) {
            return `${diffInMonths}mo ago`;
        }

        const diffInYears = Math.floor(diffInMonths / 12);
        if (isNaN(diffInYears)) {
            return 'recently';
        }
        
        return `${diffInYears}y ago`;
    } catch (error) {
        console.warn('Error formatting date:', dateString, error);
        return 'recently';
    }
};

// Convert backend notification to frontend notification format
export const transformBackendNotification = (backendNotif: BackendNotification): Omit<Notification, 'icon'> & { iconName: string } => {
    const category = backendNotif.category as NotificationCategory;
    
    // createdAt can be Firebase Timestamp or ISO string
    const createdAt = backendNotif.createdAt;
    
    return {
        id: backendNotif.id, // Keep string ID from backend
        type: category.toLowerCase(),
        iconName: categoryIconNameMap[category] || "AlertCircle",
        title: backendNotif.title,
        description: backendNotif.message,
        fullContent: backendNotif.message, // Using message as fullContent for now
        time: formatRelativeTime(createdAt),
        unread: !backendNotif.read,
        color: categoryColorMap[category] || "gray",
    };
};

// Get icon component from icon name
export const getIconFromName = (iconName: string): LucideIcon => {
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
    
    return iconMap[iconName] || AlertCircle;
};

