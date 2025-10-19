import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, TrendingUp, Clock, Activity } from "lucide-react";

const triagePatients = [
  {
    id: 1,
    name: "Rajesh Kumar",
    symptoms: ["Chest pain", "Shortness of breath"],
    aiPriority: "Critical",
    riskScore: 95,
    suggestedTests: ["ECG", "Troponin"],
    waitTime: "2 min"
  },
  {
    id: 2,
    name: "Priya Sharma",
    symptoms: ["High fever", "Severe headache"],
    aiPriority: "High",
    riskScore: 78,
    suggestedTests: ["CBC", "CT Scan"],
    waitTime: "8 min"
  },
  {
    id: 3,
    name: "Amit Patel",
    symptoms: ["Mild cough", "Fatigue"],
    aiPriority: "Routine",
    riskScore: 35,
    suggestedTests: ["X-Ray"],
    waitTime: "15 min"
  }
];

export const SmartTriageWidget = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">AI Smart Triage</h3>
        </div>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
          <Activity className="w-3 h-3 mr-1 animate-pulse" />
          Live AI Analysis
        </Badge>
      </div>
      
      <div className="space-y-3">
        {triagePatients.map((patient) => (
          <div 
            key={patient.id} 
            className="p-4 bg-secondary/30 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium">{patient.name}</p>
                  <Badge 
                    className={
                      patient.aiPriority === "Critical" 
                        ? "bg-destructive text-destructive-foreground" 
                        : patient.aiPriority === "High"
                        ? "bg-warning text-warning-foreground"
                        : "bg-success/20 text-success border-success"
                    }
                  >
                    {patient.aiPriority}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {patient.symptoms.join(" • ")}
                </p>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 text-warning" />
                    <span>Risk: {patient.riskScore}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-accent" />
                    <span>Wait: {patient.waitTime}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground mb-1">Suggested</p>
                <div className="flex flex-wrap gap-1 justify-end">
                  {patient.suggestedTests.map((test) => (
                    <Badge key={test} variant="outline" className="text-xs">
                      {test}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
