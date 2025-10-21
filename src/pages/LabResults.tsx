import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload, Search, Download, CheckCircle2, AlertTriangle, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface LabResult {
  id: string;
  patientName: string;
  testName: string;
  date: string;
  status: "normal" | "abnormal" | "critical";
  results: { parameter: string; value: string; range: string; status: string }[];
}

const mockResults: LabResult[] = [
  {
    id: "1",
    patientName: "Rajesh Kumar",
    testName: "Complete Blood Count (CBC)",
    date: "2025-01-20",
    status: "normal",
    results: [
      { parameter: "Hemoglobin", value: "14.5 g/dL", range: "13-17 g/dL", status: "normal" },
      { parameter: "WBC Count", value: "7.2 K/μL", range: "4-11 K/μL", status: "normal" },
      { parameter: "Platelet Count", value: "250 K/μL", range: "150-400 K/μL", status: "normal" },
    ]
  },
  {
    id: "2",
    patientName: "Priya Sharma",
    testName: "Blood Sugar (Fasting)",
    date: "2025-01-19",
    status: "abnormal",
    results: [
      { parameter: "Glucose", value: "145 mg/dL", range: "70-100 mg/dL", status: "high" },
    ]
  },
  {
    id: "3",
    patientName: "Amit Patel",
    testName: "Lipid Profile",
    date: "2025-01-18",
    status: "critical",
    results: [
      { parameter: "Total Cholesterol", value: "260 mg/dL", range: "<200 mg/dL", status: "high" },
      { parameter: "LDL", value: "180 mg/dL", range: "<100 mg/dL", status: "high" },
      { parameter: "HDL", value: "35 mg/dL", range: ">40 mg/dL", status: "low" },
    ]
  },
];

const LabResults = () => {
  const [results] = useState(mockResults);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResults = results.filter(r => 
    r.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.testName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal": return "success";
      case "abnormal": return "warning";
      case "critical": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "normal": return CheckCircle2;
      case "abnormal": return AlertTriangle;
      case "critical": return AlertTriangle;
      default: return FileText;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Lab Results</h1>
          <p className="text-muted-foreground">View and manage test results with AI insights</p>
        </div>
        <Button className="w-full md:w-auto bg-gradient-to-r from-primary to-accent">
          <Upload className="w-4 h-4 mr-2" />
          Upload Results
        </Button>
      </div>

      <div className="bg-gradient-to-r from-accent/10 via-primary/10 to-success/10 border border-accent/20 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-accent" />
          <p className="text-sm">
            <strong>AI-Powered Analysis:</strong> Automatic result interpretation and trend detection coming soon
          </p>
        </div>
      </div>

      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by patient name or test..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        {filteredResults.map((result) => {
          const StatusIcon = getStatusIcon(result.status);
          const statusColor = getStatusColor(result.status);

          return (
            <Card key={result.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-${statusColor}/10 flex items-center justify-center`}>
                      <StatusIcon className={`w-6 h-6 text-${statusColor}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{result.patientName}</h3>
                      <p className="text-muted-foreground">{result.testName}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="outline">{result.date}</Badge>
                        <Badge variant={statusColor as any}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {result.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>

                <div className="border-t border-border pt-4">
                  <h4 className="font-semibold mb-3">Test Parameters</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {result.results.map((param, idx) => (
                      <div key={idx} className="p-3 bg-secondary/30 rounded-lg">
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-medium text-sm">{param.parameter}</p>
                          <Badge 
                            variant={param.status === "normal" ? "outline" : "destructive"} 
                            className={`text-xs ${param.status === "normal" ? "border-success text-success" : ""}`}
                          >
                            {param.status}
                          </Badge>
                        </div>
                        <p className="text-lg font-semibold">{param.value}</p>
                        <p className="text-xs text-muted-foreground">Normal: {param.range}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default LabResults;
