import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";
import Queue from "./pages/Queue";
import Prescriptions from "./pages/Prescriptions";
import Insurance from "./pages/Insurance";
import Analytics from "./pages/Analytics";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app load
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <ThemeProvider>
      <NotificationProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="flex min-h-screen w-full bg-background transition-colors">
                <Sidebar />
                <main className="flex-1 p-4 md:p-8 overflow-auto">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/patients" element={<Patients />} />
                    <Route path="/appointments" element={<Appointments />} />
                    <Route path="/queue" element={<Queue />} />
                    <Route path="/prescriptions" element={<Prescriptions />} />
                    <Route path="/insurance" element={<Insurance />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
