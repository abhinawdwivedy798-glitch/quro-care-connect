import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockPatients } from "@/lib/mockData";
import { Search, Plus, Shield, ShieldCheck, Phone, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PatientHistoryTimeline } from "@/components/PatientHistoryTimeline";

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Patient Management</h1>
          <p className="text-muted-foreground">Manage patient records and insurance information</p>
        </div>
        <Button className="gradient-primary shadow-glow">
          <Plus className="w-4 h-4 mr-2" />
          Add Patient
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Search by name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {filteredPatients.map((patient) => (
          <Card 
            key={patient.id} 
            className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
            onClick={() => navigate(`/patients/${patient.id}`)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xl font-bold">
                  {patient.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
                    {patient.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {patient.age} years • ID: {patient.id}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <Badge className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {patient.phone}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Last: {patient.lastVisit}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-4 mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {patient.insurance.verified ? (
                    <>
                      <ShieldCheck className="w-5 h-5 text-success" />
                      <div>
                        <p className="text-sm font-medium text-success">Insurance Verified ✓</p>
                        <p className="text-xs text-muted-foreground">{patient.insurance.provider}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">No Insurance</p>
                        <p className="text-xs text-muted-foreground">Click to enroll</p>
                      </div>
                    </>
                  )}
                </div>
                {patient.insurance.verified && (
                  <Badge className="bg-success/10 text-success border-success">
                    {patient.insurance.coverage}
                  </Badge>
                )}
              </div>
            </div>

            {patient.medicalHistory.length > 0 && (
              <div className="mt-4">
                <p className="text-xs text-muted-foreground mb-2">Medical History:</p>
                <div className="flex gap-2 flex-wrap">
                  {patient.medicalHistory.map((condition, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {condition}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </Card>
          ))}
        </div>
        
        <div className="lg:col-span-1">
          <PatientHistoryTimeline />
        </div>
      </div>
    </div>
  );
};

export default Patients;
