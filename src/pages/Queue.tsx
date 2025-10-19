import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockQueue } from "@/lib/mockData";
import { Activity, Users, Clock, TrendingUp, ArrowUpDown } from "lucide-react";
import { StatCard } from "@/components/StatCard";

const Queue = () => {
  const waitingCount = mockQueue.filter(q => q.status === "waiting").length;
  const inConsultation = mockQueue.filter(q => q.status === "in-consultation").length;
  const avgWaitTime = "15 mins";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Queue Management</h1>
          <p className="text-muted-foreground">AI-powered queue with real-time ETA predictions</p>
        </div>
        <Badge className="bg-accent text-accent-foreground px-4 py-2">
          <Activity className="w-4 h-4 mr-2 animate-pulse" />
          Live Queue
        </Badge>
      </div>

      <div className="bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">AI-Powered Queue Optimization</h3>
            <p className="text-sm text-muted-foreground">
              Our intelligent system predicts wait times based on historical data, consultation types, 
              and doctor availability. Patients receive accurate ETAs via SMS/WhatsApp.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="In Queue"
          value={waitingCount}
          change="Waiting patients"
          changeType="neutral"
          icon={Users}
          iconColor="text-primary"
        />
        <StatCard
          title="In Consultation"
          value={inConsultation}
          change="Currently active"
          changeType="neutral"
          icon={Activity}
          iconColor="text-accent"
        />
        <StatCard
          title="Avg Wait Time"
          value={avgWaitTime}
          change="Below target (20 mins)"
          changeType="positive"
          icon={Clock}
          iconColor="text-success"
        />
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Current Queue</h3>
          <Button variant="outline" size="sm">
            <ArrowUpDown className="w-4 h-4 mr-2" />
            Reorder Queue
          </Button>
        </div>

        <div className="space-y-3">
          {mockQueue.map((item, index) => (
            <div
              key={item.id}
              className="relative overflow-hidden rounded-lg border border-border bg-gradient-card p-5 hover:shadow-lg transition-all duration-300"
            >
              {item.status === "in-consultation" && (
                <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl ${
                    item.status === "in-consultation" 
                      ? "bg-accent text-white shadow-glow" 
                      : "bg-primary/10 text-primary"
                  }`}>
                    #{item.tokenNumber}
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-lg mb-1">{item.patientName}</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {item.doctorName}
                      </Badge>
                      {item.status === "in-consultation" ? (
                        <Badge className="bg-accent text-accent-foreground">
                          <Activity className="w-3 h-3 mr-1 animate-pulse" />
                          In Consultation
                        </Badge>
                      ) : (
                        <Badge className="bg-warning/10 text-warning border-warning">
                          <Clock className="w-3 h-3 mr-1" />
                          ETA: {item.estimatedTime}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {item.status === "waiting" && (
                    <>
                      <Button size="sm" variant="outline">Move Up</Button>
                      <Button size="sm" className="bg-accent hover:bg-accent/90">
                        Call Next
                      </Button>
                    </>
                  )}
                  {item.status === "in-consultation" && (
                    <Button size="sm" className="bg-success hover:bg-success/90">
                      Complete
                    </Button>
                  )}
                </div>
              </div>

              {/* AI Prediction indicator */}
              <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 text-xs text-muted-foreground">
                <TrendingUp className="w-3 h-3" />
                <span>AI Prediction: Based on avg consultation time and current queue</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Queue;
