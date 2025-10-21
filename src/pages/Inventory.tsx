import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, AlertTriangle, Plus, Search, TrendingDown, TrendingUp } from "lucide-react";
import { toast } from "sonner";

interface Medicine {
  id: string;
  name: string;
  stock: number;
  minStock: number;
  expiryDate: string;
  category: string;
  price: number;
}

const mockMedicines: Medicine[] = [
  { id: "1", name: "Paracetamol 500mg", stock: 45, minStock: 100, expiryDate: "2025-12-31", category: "Pain Relief", price: 5 },
  { id: "2", name: "Amoxicillin 250mg", stock: 120, minStock: 50, expiryDate: "2025-08-15", category: "Antibiotic", price: 15 },
  { id: "3", name: "Ibuprofen 400mg", stock: 15, minStock: 80, expiryDate: "2025-06-20", category: "Pain Relief", price: 8 },
  { id: "4", name: "Cough Syrup", stock: 200, minStock: 100, expiryDate: "2026-03-10", category: "Cold & Flu", price: 12 },
  { id: "5", name: "Insulin Injection", stock: 8, minStock: 20, expiryDate: "2025-04-30", category: "Diabetes", price: 450 },
];

const Inventory = () => {
  const [medicines, setMedicines] = useState(mockMedicines);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMedicines = medicines.filter(med => 
    med.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lowStockItems = medicines.filter(m => m.stock < m.minStock).length;
  const expiringItems = medicines.filter(m => {
    const daysUntilExpiry = Math.floor((new Date(m.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry < 90;
  }).length;

  const getStockStatus = (med: Medicine) => {
    if (med.stock < med.minStock) return { status: "critical", color: "destructive", icon: AlertTriangle };
    if (med.stock < med.minStock * 1.5) return { status: "low", color: "warning", icon: TrendingDown };
    return { status: "good", color: "success", icon: TrendingUp };
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    return Math.floor((new Date(expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Medicine Inventory</h1>
          <p className="text-muted-foreground">Track stock levels and expiry dates</p>
        </div>
        <Button className="w-full md:w-auto bg-gradient-to-r from-primary to-accent">
          <Plus className="w-4 h-4 mr-2" />
          Add Medicine
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Items</p>
              <p className="text-2xl font-bold">{medicines.length}</p>
            </div>
            <Package className="w-8 h-8 text-primary" />
          </div>
        </Card>
        
        <Card className="p-4 border-destructive/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Low Stock</p>
              <p className="text-2xl font-bold text-destructive">{lowStockItems}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
        </Card>

        <Card className="p-4 border-warning/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Expiring Soon</p>
              <p className="text-2xl font-bold text-warning">{expiringItems}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-warning" />
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search medicines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        {filteredMedicines.map((med) => {
          const stockStatus = getStockStatus(med);
          const daysUntilExpiry = getDaysUntilExpiry(med.expiryDate);
          const StatusIcon = stockStatus.icon;

          return (
            <Card key={med.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-lg bg-${stockStatus.color}/10 flex items-center justify-center`}>
                      <Package className={`w-6 h-6 text-${stockStatus.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{med.name}</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="outline">{med.category}</Badge>
                        <Badge variant={stockStatus.color as any}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {stockStatus.status}
                        </Badge>
                        {daysUntilExpiry < 90 && (
                          <Badge variant="outline" className="border-warning text-warning">
                            Expires in {daysUntilExpiry} days
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{med.stock}</p>
                    <p className="text-xs text-muted-foreground">In Stock</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-primary">₹{med.price}</p>
                    <p className="text-xs text-muted-foreground">Per Unit</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toast.success(`Reordered ${med.name}`)}
                  >
                    Reorder
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Inventory;
