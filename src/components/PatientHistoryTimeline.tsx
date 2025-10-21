import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Activity, Pill, FileText } from "lucide-react";

interface TimelineEvent {
  id: string;
  date: string;
  type: "appointment" | "prescription" | "lab" | "vital";
  title: string;
  description: string;
  status?: string;
}

const mockTimeline: TimelineEvent[] = [
  {
    id: "1",
    date: "2025-01-20",
    type: "prescription",
    title: "New Prescription",
    description: "Paracetamol 500mg, 3 times daily for 5 days",
  },
  {
    id: "2",
    date: "2025-01-20",
    type: "appointment",
    title: "General Checkup",
    description: "Routine health examination completed",
    status: "completed"
  },
  {
    id: "3",
    date: "2025-01-15",
    type: "lab",
    title: "Blood Test - CBC",
    description: "All parameters normal",
    status: "normal"
  },
  {
    id: "4",
    date: "2025-01-10",
    type: "vital",
    title: "Vital Signs Recorded",
    description: "BP: 120/80, Temp: 98.6°F, Pulse: 72 bpm",
  },
  {
    id: "5",
    date: "2024-12-20",
    type: "appointment",
    title: "Follow-up Visit",
    description: "Discussed medication effectiveness",
    status: "completed"
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case "appointment": return Calendar;
    case "prescription": return Pill;
    case "lab": return FileText;
    case "vital": return Activity;
    default: return Activity;
  }
};

const getColor = (type: string) => {
  switch (type) {
    case "appointment": return "primary";
    case "prescription": return "accent";
    case "lab": return "warning";
    case "vital": return "success";
    default: return "secondary";
  }
};

export const PatientHistoryTimeline = () => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Medical History Timeline</h3>
      
      <div className="relative space-y-6">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
        
        {mockTimeline.map((event) => {
          const Icon = getIcon(event.type);
          const color = getColor(event.type);
          
          return (
            <div key={event.id} className="relative pl-14">
              {/* Timeline Node */}
              <div className={`absolute left-0 w-12 h-12 rounded-full bg-${color}/10 flex items-center justify-center border-4 border-background`}>
                <Icon className={`w-5 h-5 text-${color}`} />
              </div>
              
              {/* Content */}
              <div className="bg-secondary/30 rounded-lg p-4 hover:bg-secondary/50 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h4 className="font-semibold">{event.title}</h4>
                  <Badge variant="outline" className="text-xs">
                    {new Date(event.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{event.description}</p>
                {event.status && (
                  <Badge variant={event.status === "normal" || event.status === "completed" ? "outline" : "secondary"} className="mt-2 text-xs border-success text-success">
                    {event.status}
                  </Badge>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
