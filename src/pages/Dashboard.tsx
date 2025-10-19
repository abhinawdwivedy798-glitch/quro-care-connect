import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, IndianRupee, AlertCircle, Activity, CheckCircle } from "lucide-react";
import { mockQueue, mockAppointments, mockPatients } from "@/lib/mockData";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const patientFlowData = [
  { day: "Mon", patients: 45 },
  { day: "Tue", patients: 52 },
  { day: "Wed", patients: 48 },
  { day: "Thu", patients: 61 },
  { day: "Fri", patients: 55 },
  { day: "Sat", patients: 38 },
];

const revenueData = [
  { name: "Consultations", value: 45000, color: "hsl(var(--primary))" },
  { name: "Procedures", value: 32000, color: "hsl(var(--accent))" },
  { name: "Pharmacy", value: 18000, color: "hsl(var(--success))" },
];

const Dashboard = () => {
  const todayAppointments = mockAppointments.length;
  const verifiedPatients = mockPatients.filter(p => p.insurance.verified).length;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
        </div>
        <Badge className="bg-success text-success-foreground px-4 py-2">
          <Activity className="w-4 h-4 mr-2" />
          System Active
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Today's Patients"
          value={todayAppointments}
          change="+12% from yesterday"
          changeType="positive"
          icon={Users}
          iconColor="text-primary"
        />
        <StatCard
          title="Active Queue"
          value={mockQueue.length}
          change="Avg wait: 15 mins"
          changeType="neutral"
          icon={Activity}
          iconColor="text-accent"
        />
        <StatCard
          title="Today's Revenue"
          value="₹95,000"
          change="+8% from avg"
          changeType="positive"
          icon={IndianRupee}
          iconColor="text-success"
        />
        <StatCard
          title="Insurance Verified"
          value={`${verifiedPatients}/${mockPatients.length}`}
          change="75% coverage rate"
          changeType="positive"
          icon={CheckCircle}
          iconColor="text-success"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Patient Flow (This Week)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={patientFlowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="patients" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={revenueData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {revenueData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
                formatter={(value: number) => `₹${value.toLocaleString()}`}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Queue and Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Live Queue</h3>
            <Badge variant="outline" className="text-accent border-accent">
              <Activity className="w-3 h-3 mr-1 animate-pulse" />
              Live
            </Badge>
          </div>
          <div className="space-y-3">
            {mockQueue.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    #{item.tokenNumber}
                  </div>
                  <div>
                    <p className="font-medium">{item.patientName}</p>
                    <p className="text-sm text-muted-foreground">{item.doctorName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge 
                    className={
                      item.status === "in-consultation" 
                        ? "bg-accent text-accent-foreground" 
                        : "bg-warning/10 text-warning border-warning"
                    }
                  >
                    {item.status === "in-consultation" ? "In Progress" : `${item.estimatedTime}`}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Today's Appointments</h3>
            <Badge variant="outline">{mockAppointments.length} Total</Badge>
          </div>
          <div className="space-y-3">
            {mockAppointments.map((apt) => (
              <div key={apt.id} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors">
                <div>
                  <p className="font-medium">{apt.patientName}</p>
                  <p className="text-sm text-muted-foreground">{apt.doctorName} • {apt.time}</p>
                </div>
                <Badge 
                  className={
                    apt.status === "in-progress" 
                      ? "bg-accent text-accent-foreground" 
                      : apt.status === "completed"
                      ? "bg-success text-success-foreground"
                      : "bg-primary/10 text-primary border-primary"
                  }
                >
                  {apt.status.replace("-", " ")}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
