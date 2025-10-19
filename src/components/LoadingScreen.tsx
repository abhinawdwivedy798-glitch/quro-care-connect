import { useEffect, useState } from "react";
import { Activity, Stethoscope } from "lucide-react";

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 5;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center z-50">
      <div className="text-center space-y-6 animate-fade-in">
        <div className="relative">
          <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
            <Stethoscope className="w-12 h-12 text-primary" />
          </div>
          <Activity className="w-6 h-6 text-accent absolute top-0 right-1/4 animate-bounce" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Quro ClinicOS</h2>
          <p className="text-sm text-muted-foreground">Initializing healthcare intelligence...</p>
        </div>

        <div className="w-64 h-2 bg-secondary rounded-full overflow-hidden mx-auto">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
