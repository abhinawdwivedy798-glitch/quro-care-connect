import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockAppointments } from "@/lib/mockData";
import { Calendar as CalendarIcon, Plus, Clock, User, Stethoscope } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

const Appointments = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Appointments</h1>
          <p className="text-muted-foreground">Schedule and manage patient appointments</p>
        </div>
        <Button className="gradient-primary shadow-glow">
          <Plus className="w-4 h-4 mr-2" />
          New Appointment
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Select Date</h3>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </Card>

        <Card className="p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">
            Appointments for {date?.toLocaleDateString()}
          </h3>
          <div className="space-y-3">
            {mockAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-5 bg-gradient-card rounded-lg border border-border hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                        {appointment.patientName.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">{appointment.patientName}</h4>
                        <p className="text-sm text-muted-foreground">ID: {appointment.patientId}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Stethoscope className="w-4 h-4 text-accent" />
                        <span>{appointment.doctorName}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <Badge 
                      className={
                        appointment.status === "in-progress" 
                          ? "bg-accent text-accent-foreground" 
                          : appointment.status === "completed"
                          ? "bg-success text-success-foreground"
                          : appointment.status === "cancelled"
                          ? "bg-destructive text-destructive-foreground"
                          : "bg-primary text-primary-foreground"
                      }
                    >
                      {appointment.status.replace("-", " ")}
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {appointment.type}
                    </Badge>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border flex gap-2">
                  <Button size="sm" variant="outline">Reschedule</Button>
                  <Button size="sm" variant="outline">View Details</Button>
                  {appointment.status === "scheduled" && (
                    <Button size="sm" className="ml-auto bg-accent hover:bg-accent/90">
                      Start Consultation
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Appointments;
