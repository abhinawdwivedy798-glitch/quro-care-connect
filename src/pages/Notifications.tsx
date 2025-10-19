import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, MessageSquare, CheckCircle, Clock, Phone } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "appointment",
    title: "Appointment Reminder",
    message: "Rajesh Kumar has an appointment in 30 minutes",
    time: "Just now",
    read: false,
    icon: Clock,
  },
  {
    id: 2,
    type: "message",
    title: "Patient Message",
    message: "Priya Sharma: Can I reschedule my appointment?",
    time: "5 mins ago",
    read: false,
    icon: MessageSquare,
  },
  {
    id: 3,
    type: "insurance",
    title: "Insurance Claim Approved",
    message: "Claim #C001 for ₹12,500 has been approved",
    time: "1 hour ago",
    read: true,
    icon: CheckCircle,
  },
  {
    id: 4,
    type: "call",
    title: "Missed Call",
    message: "Missed call from Amit Patel (+91 98765 43212)",
    time: "2 hours ago",
    read: true,
    icon: Phone,
  },
];

const Notifications = () => {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with patient messages and system alerts
          </p>
        </div>
        {unreadCount > 0 && (
          <Badge className="bg-destructive text-destructive-foreground px-4 py-2">
            {unreadCount} Unread
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Communication Channels</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <MessageSquare className="w-4 h-4 mr-2 text-primary" />
              WhatsApp (Connected)
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Phone className="w-4 h-4 mr-2 text-success" />
              SMS Gateway (Active)
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Bell className="w-4 h-4 mr-2 text-accent" />
              Push Notifications
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <h4 className="text-sm font-semibold mb-3 text-muted-foreground">Quick Stats</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Messages Today</span>
                <span className="font-semibold">23</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Appointment Reminders</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Response Rate</span>
                <span className="font-semibold text-success">94%</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">All Notifications</h3>
            <Button variant="ghost" size="sm">Mark all as read</Button>
          </div>

          <div className="space-y-3">
            {notifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border transition-all duration-300 hover:shadow-md cursor-pointer ${
                    notification.read 
                      ? "bg-card border-border" 
                      : "bg-primary/5 border-primary/20"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      notification.type === "appointment" ? "bg-accent/10 text-accent" :
                      notification.type === "message" ? "bg-primary/10 text-primary" :
                      notification.type === "insurance" ? "bg-success/10 text-success" :
                      "bg-warning/10 text-warning"
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-semibold">{notification.title}</h4>
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification.message}
                      </p>
                      
                      {!notification.read && (
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          <Button size="sm" variant="ghost">
                            Mark as read
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Notifications;
