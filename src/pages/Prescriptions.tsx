import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Mic, FileText, Plus, Printer, Send } from "lucide-react";
import { toast } from "sonner";

const Prescriptions = () => {
  const [prescription, setPrescription] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast.success("Voice recording started");
      // Simulate voice input
      setTimeout(() => {
        setPrescription(prev => prev + "\nTablet Paracetamol 500mg - 1 tablet three times daily for 5 days\nTablet Amoxicillin 250mg - 1 capsule twice daily for 7 days\nSyrup Cough Relief - 10ml three times daily as needed");
        setIsRecording(false);
        toast.success("Voice input processed");
      }, 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Prescriptions</h1>
        <p className="text-muted-foreground">Create prescriptions with voice-to-text AI assistance</p>
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
            <Mic className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Voice-to-Prescription</h3>
            <p className="text-sm text-muted-foreground">
              Use our AI-powered voice recognition to quickly create prescriptions. 
              Just speak naturally, and the system will format it properly with dosage, frequency, and duration.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">New Prescription</h3>
              <Button
                onClick={handleVoiceInput}
                className={isRecording ? "bg-destructive hover:bg-destructive/90 shadow-glow" : "bg-accent hover:bg-accent/90"}
              >
                <Mic className={`w-4 h-4 mr-2 ${isRecording && "animate-pulse"}`} />
                {isRecording ? "Stop Recording" : "Start Voice Input"}
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Patient Name</label>
                <Input placeholder="Search patient..." />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Date</label>
                <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Diagnosis</label>
              <Input placeholder="e.g., Common Cold, Fever" />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 flex items-center justify-between">
                <span>Medications & Instructions</span>
                {isRecording && (
                  <Badge className="bg-destructive text-destructive-foreground animate-pulse">
                    <Mic className="w-3 h-3 mr-1" />
                    Recording...
                  </Badge>
                )}
              </label>
              <Textarea
                placeholder="Type or use voice input to add medications..."
                value={prescription}
                onChange={(e) => setPrescription(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
              />
            </div>

            <div className="flex gap-2">
              <Button className="flex-1 bg-success hover:bg-success/90">
                <Send className="w-4 h-4 mr-2" />
                Send to Patient
              </Button>
              <Button variant="outline" className="flex-1">
                <Printer className="w-4 h-4 mr-2" />
                Print Prescription
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Add Medications</h3>
          <div className="space-y-2">
            {[
              "Paracetamol 500mg",
              "Amoxicillin 250mg",
              "Cough Syrup",
              "Ibuprofen 400mg",
              "Antibiotic Cream",
            ].map((med) => (
              <Button
                key={med}
                variant="outline"
                className="w-full justify-start"
                onClick={() => setPrescription(prev => prev + `\n${med} - `)}
              >
                <Plus className="w-4 h-4 mr-2" />
                {med}
              </Button>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <h4 className="text-sm font-semibold mb-3 text-muted-foreground">Recent Prescriptions</h4>
            <div className="space-y-2">
              {[
                { patient: "Rajesh Kumar", date: "Jan 18" },
                { patient: "Priya Sharma", date: "Jan 17" },
                { patient: "Amit Patel", date: "Jan 15" },
              ].map((item) => (
                <div
                  key={item.patient}
                  className="p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                >
                  <p className="font-medium text-sm">{item.patient}</p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Prescriptions;
