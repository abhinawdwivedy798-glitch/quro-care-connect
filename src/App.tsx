import { useState, useEffect, lazy, Suspense } from "react";
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

// Lazy load pages for better performance
const Patients = lazy(() => import("./pages/Patients"));
const Appointments = lazy(() => import("./pages/Appointments"));
const Queue = lazy(() => import("./pages/Queue"));
const Prescriptions = lazy(() => import("./pages/Prescriptions"));
const Insurance = lazy(() => import("./pages/Insurance"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Notifications = lazy(() => import("./pages/Notifications"));
const Inventory = lazy(() => import("./pages/Inventory"));
const LabResults = lazy(() => import("./pages/LabResults"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Optimized loading time
    const timer = setTimeout(() => setIsLoading(false), 1000);
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
                  <Suspense fallback={
                    <div className="flex items-center justify-center h-64">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  }>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/patients" element={<Patients />} />
                      <Route path="/appointments" element={<Appointments />} />
                      <Route path="/queue" element={<Queue />} />
                      <Route path="/prescriptions" element={<Prescriptions />} />
                      <Route path="/insurance" element={<Insurance />} />
                      <Route path="/analytics" element={<Analytics />} />
                      <Route path="/notifications" element={<Notifications />} />
                      <Route path="/inventory" element={<Inventory />} />
                      <Route path="/lab-results" element={<LabResults />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
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
