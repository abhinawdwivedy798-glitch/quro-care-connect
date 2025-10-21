import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  time: Date;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'time' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  unreadCount: number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const SIMULATED_EVENTS = [
  { title: "New Patient Arrival", message: "Rahul Verma checked in for appointment", type: "info" as const },
  { title: "Insurance Verified", message: "HDFC Health claim approved for Priya Sharma", type: "success" as const },
  { title: "Queue Alert", message: "Wait time increased to 45 minutes", type: "warning" as const },
  { title: "Lab Results Ready", message: "Blood test results available for Amit Patel", type: "info" as const },
  { title: "Appointment Reminder", message: "Dr. Singh has 3 appointments in next hour", type: "info" as const },
  { title: "Emergency Priority", message: "High priority patient in queue", type: "error" as const },
  { title: "Prescription Sent", message: "Digital prescription sent to Meera Shah", type: "success" as const },
];

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id' | 'time' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      time: new Date(),
      read: false,
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast
    toast[notification.type](notification.title, {
      description: notification.message,
    });
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const randomEvent = SIMULATED_EVENTS[Math.floor(Math.random() * SIMULATED_EVENTS.length)];
      addNotification(randomEvent);
    }, 15000); // Every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      markAsRead,
      markAllAsRead,
      unreadCount,
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
}
