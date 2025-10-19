import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  Shield, 
  BarChart3, 
  Bell,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/patients", icon: Users, label: "Patients" },
  { to: "/appointments", icon: Calendar, label: "Appointments" },
  { to: "/queue", icon: Activity, label: "Queue" },
  { to: "/prescriptions", icon: FileText, label: "Prescriptions" },
  { to: "/insurance", icon: Shield, label: "Insurance" },
  { to: "/analytics", icon: BarChart3, label: "Analytics" },
  { to: "/notifications", icon: Bell, label: "Notifications" },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-card border-r border-border h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shadow-glow">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Quro ClinicOS
            </h1>
            <p className="text-xs text-muted-foreground">Smart Healthcare</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                "hover:bg-secondary/50",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "text-foreground/70"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn("w-5 h-5", isActive && "animate-pulse")} />
                <span className="font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
            AD
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-muted-foreground">admin@quro.in</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
