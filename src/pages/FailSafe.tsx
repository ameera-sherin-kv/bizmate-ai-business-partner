import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  RefreshCw,
  TrendingDown,
  DollarSign,
  Users,
  ShoppingCart,
  BarChart3
} from "lucide-react";

interface Alert {
  id: number;
  title: string;
  description: string;
  severity: "green" | "yellow" | "red";
  icon: React.ReactNode;
}

const alerts: Alert[] = [
  {
    id: 1,
    title: "Sales Performance Stable",
    description: "Monthly sales tracking well vs. targets",
    severity: "green",
    icon: <CheckCircle className="w-5 h-5" />
  },
  {
    id: 2,
    title: "High Ad Spend Alert",
    description: "Marketing costs 25% above average with low conversion rates",
    severity: "yellow",
    icon: <AlertTriangle className="w-5 h-5" />
  },
  {
    id: 3,
    title: "Inventory Running Low",
    description: "Organic Cotton Shirts below threshold (12 units left)",
    severity: "red",
    icon: <XCircle className="w-5 h-5" />
  },
  {
    id: 4,
    title: "Customer Acquisition Improving",
    description: "New customer rate increased by 15% this week",
    severity: "green",
    icon: <CheckCircle className="w-5 h-5" />
  }
];

const FailSafe = () => {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const overallScore = 82;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "green":
        return "border-green-200 bg-green-50/50";
      case "yellow":
        return "border-yellow-200 bg-yellow-50/50";
      case "red":
        return "border-red-200 bg-red-50/50";
      default:
        return "border-gray-200 bg-gray-50/50";
    }
  };

  const getSeverityTextColor = (severity: string) => {
    switch (severity) {
      case "green":
        return "text-green-700";
      case "yellow":
        return "text-yellow-700";
      case "red":
        return "text-red-700";
      default:
        return "text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto pt-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">FailSafe AI Report</h1>
            <p className="text-xl text-muted-foreground">AI-powered business monitoring and alerts</p>
          </div>
          <Button 
            onClick={handleRefresh}
            variant="hero"
            disabled={isRefreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh Report
          </Button>
        </div>

        {/* Overall Business Health */}
        <Card className="mb-8 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-primary" />
              Daily Business Health Score
            </CardTitle>
            <CardDescription>AI analysis of your business performance today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="hsl(var(--muted))"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="hsl(var(--primary))"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${overallScore * 2.51} 251`}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{overallScore}</div>
                    <div className="text-xs text-muted-foreground">/ 100</div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Good Performance</h3>
                <p className="text-muted-foreground mb-4">
                  Your business is performing well overall with some areas requiring attention.
                </p>
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>2 Good</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>1 Warning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>1 Critical</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alert List */}
        <Card className="mb-8 shadow-card">
          <CardHeader>
            <CardTitle>AI Alerts & Recommendations</CardTitle>
            <CardDescription>Real-time monitoring of your business metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <Card
                  key={alert.id}
                  className={`${getSeverityColor(alert.severity)} transition-all hover:shadow-md`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={getSeverityTextColor(alert.severity)}>
                        {alert.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold ${getSeverityTextColor(alert.severity)}`}>
                          {alert.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {alert.description}
                        </p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`${getSeverityTextColor(alert.severity)} border-current`}
                      >
                        {alert.severity === "green" ? "Good" : alert.severity === "yellow" ? "Warning" : "Critical"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button onClick={() => navigate("/dashboard")} variant="outline" size="lg">
            Back to Dashboard
          </Button>
          <Button onClick={() => navigate("/scaling")} variant="hero" size="lg">
            View Scaling Roadmap
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FailSafe;