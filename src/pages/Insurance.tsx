import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockClaims, mockPatients } from "@/lib/mockData";
import { Shield, CheckCircle, Clock, XCircle, IndianRupee, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/StatCard";

const Insurance = () => {
  const totalClaims = mockClaims.length;
  const approvedClaims = mockClaims.filter(c => c.status === "approved").length;
  const pendingClaims = mockClaims.filter(c => c.status === "pending").length;
  const totalClaimAmount = mockClaims.reduce((sum, claim) => sum + claim.claimAmount, 0);
  const verifiedPatients = mockPatients.filter(p => p.insurance.verified).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Insurance & Claims</h1>
        <p className="text-muted-foreground">
          Automated insurance verification and claim management system
        </p>
      </div>

      <div className="bg-gradient-to-r from-success/10 to-accent/10 border border-success/20 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-success flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Automated Insurance Integration</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Our system automatically verifies patient insurance coverage and generates claims in real-time.
              Connect with major providers: Star Health, HDFC Ergo, Max Bupa, and more.
            </p>
            <Button className="bg-success hover:bg-success/90 text-white">
              Connect New Provider
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Claims"
          value={totalClaims}
          change="This month"
          changeType="neutral"
          icon={Shield}
          iconColor="text-primary"
        />
        <StatCard
          title="Approved Claims"
          value={approvedClaims}
          change={`${((approvedClaims/totalClaims)*100).toFixed(0)}% approval rate`}
          changeType="positive"
          icon={CheckCircle}
          iconColor="text-success"
        />
        <StatCard
          title="Pending Review"
          value={pendingClaims}
          change="Avg 2-3 days"
          changeType="neutral"
          icon={Clock}
          iconColor="text-warning"
        />
        <StatCard
          title="Claim Value"
          value={`₹${(totalClaimAmount/1000).toFixed(0)}K`}
          change="+15% from last month"
          changeType="positive"
          icon={IndianRupee}
          iconColor="text-accent"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Recent Claims</h3>
          <div className="space-y-3">
            {mockClaims.map((claim) => (
              <div 
                key={claim.id} 
                className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    claim.status === "approved" ? "bg-success/10" :
                    claim.status === "pending" ? "bg-warning/10" :
                    "bg-destructive/10"
                  }`}>
                    {claim.status === "approved" && <CheckCircle className="w-5 h-5 text-success" />}
                    {claim.status === "pending" && <Clock className="w-5 h-5 text-warning" />}
                    {claim.status === "rejected" && <XCircle className="w-5 h-5 text-destructive" />}
                  </div>
                  <div>
                    <p className="font-medium">{claim.patientName}</p>
                    <p className="text-sm text-muted-foreground">
                      {claim.provider} • {claim.submittedDate}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-lg">₹{claim.claimAmount.toLocaleString()}</p>
                  <Badge 
                    className={
                      claim.status === "approved" 
                        ? "bg-success text-success-foreground" 
                        : claim.status === "pending"
                        ? "bg-warning text-warning-foreground"
                        : "bg-destructive text-destructive-foreground"
                    }
                  >
                    {claim.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Patient Coverage</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Verified Patients</span>
                <span className="text-sm font-bold">{verifiedPatients}/{mockPatients.length}</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-3">
                <div 
                  className="gradient-success h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(verifiedPatients/mockPatients.length)*100}%` }}
                />
              </div>
            </div>

            <div className="pt-4 border-t border-border space-y-3">
              <h4 className="text-sm font-semibold text-muted-foreground">Top Providers</h4>
              {["Star Health", "HDFC Ergo", "Max Bupa"].map((provider, idx) => (
                <div key={provider} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                      {idx + 1}
                    </div>
                    <span className="text-sm">{provider}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {3 - idx} patients
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Insurance;
