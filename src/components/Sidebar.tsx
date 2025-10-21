import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  Shield, 
  BarChart3, 
  Bell,
  Activity,
  Menu,
  X,
  Package,
  TestTube
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { NotificationBell } from "./NotificationBell";
import { Button } from "./ui/button";
import { useState } from "react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/patients", icon: Users, label: "Patients" },
  { to: "/appointments", icon: Calendar, label: "Appointments" },
  { to: "/queue", icon: Activity, label: "Queue" },
  { to: "/prescriptions", icon: FileText, label: "Prescriptions" },
  { to: "/inventory", icon: Package, label: "Inventory" },
  { to: "/lab-results", icon: TestTube, label: "Lab Results" },
  { to: "/insurance", icon: Shield, label: "Insurance" },
  { to: "/analytics", icon: BarChart3, label: "Analytics" },
  { to: "/notifications", icon: Bell, label: "Notifications" },
];

export const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border p-4 flex items-center justify-between backdrop-blur-sm bg-card/95">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-glow">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Quro ClinicOS
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <NotificationBell />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile spacer */}
      <div className="lg:hidden h-16" />

      {/* Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-64 border-r border-border bg-card flex flex-col transition-transform duration-300 ease-in-out h-screen",
        "lg:translate-x-0",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 border-b border-border hidden lg:block">
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
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              onClick={() => setIsMobileOpen(false)}
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
        
        <div className="p-4 border-t border-border space-y-4">
          <div className="hidden lg:flex items-center justify-between px-2">
            <span className="text-xs text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
          <div className="flex items-center gap-3 px-4 py-3 bg-secondary/30 rounded-lg">
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
    </>
  );
};
