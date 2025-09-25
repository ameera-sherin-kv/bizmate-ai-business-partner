import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
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
  const [isLoading, setIsLoading] = useState(true);
  const [showScoreReveal, setShowScoreReveal] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const overallScore = 82;

  const loadingTexts = [
    "Loading your AI report as per the statistics…",
    "Analyzing what's going wrong…",
    "Identifying what's performing well…",
    "Finalizing actionable insights…"
  ];

  useEffect(() => {
    // Cycle through loading texts every 2.5 seconds
    const textInterval = setInterval(() => {
      setLoadingTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 2500);

    // Complete loading after 10 seconds
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      setShowScoreReveal(true);
      clearInterval(textInterval);
    }, 10000);

    return () => {
      clearInterval(textInterval);
      clearTimeout(loadingTimer);
    };
  }, []);

  useEffect(() => {
    if (showScoreReveal) {
      // Animate score counter
      let start = 0;
      const duration = 2000;
      const increment = overallScore / (duration / 16);
      
      const scoreTimer = setInterval(() => {
        start += increment;
        if (start >= overallScore) {
          setCurrentScore(overallScore);
          clearInterval(scoreTimer);
          // Show cards after score animation completes
          setTimeout(() => setShowCards(true), 500);
        } else {
          setCurrentScore(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(scoreTimer);
    }
  }, [showScoreReveal, overallScore]);

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

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          {/* Simple spinning loader */}
          <div className="w-16 h-16 mx-auto mb-8">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>

          {/* Cycling status texts */}
          <div className="h-16 flex items-center justify-center">
            <p className="text-lg text-muted-foreground animate-fade-in max-w-md">
              {loadingTexts[loadingTextIndex]}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto pt-8">

        {/* Page Title */}
        <div className={`text-center mb-12 transition-all duration-700 ${
          showScoreReveal ? 'animate-fade-in' : 'opacity-0 translate-y-8'
        }`}>
          <h1 className="text-4xl font-bold text-primary mb-2">FailSafe AI Report</h1>
          <p className="text-xl text-muted-foreground">AI-powered business monitoring and alerts</p>
        </div>

        {/* Overall Business Health */}
        <Card className={`mb-8 shadow-card transition-all duration-700 ${
          showScoreReveal ? 'animate-scale-in' : 'opacity-0 scale-95'
        }`}>
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
                    strokeDasharray={`${currentScore * 2.51} 251`}
                    className="transition-all duration-500 ease-out"
                    style={{
                      filter: currentScore === overallScore ? 'drop-shadow(0 0 8px hsl(var(--primary) / 0.5))' : 'none'
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{currentScore}</div>
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
                  </div>here are
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
        <Card className={`mb-8 shadow-card transition-all duration-700 ${
          showCards ? 'animate-fade-in translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <CardHeader>
            <CardTitle>AI Alerts & Recommendations</CardTitle>
            <CardDescription>Real-time monitoring of your business metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <Card
                  key={alert.id}
                  className={`${getSeverityColor(alert.severity)} transition-all hover:shadow-md ${
                    showCards 
                      ? 'animate-scale-in opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-4 scale-95'
                  }`}
                  style={{
                    animationDelay: showCards ? `${index * 200}ms` : '0ms'
                  }}
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
        <div className={`flex gap-4 justify-center transition-all duration-700 ${
          showCards ? 'animate-fade-in' : 'opacity-0 translate-y-4'
        }`}
        style={{ animationDelay: showCards ? '800ms' : '0ms' }}>
          <Button onClick={() => navigate("/dashboard")} variant="outline" size="lg">
            Back to Dashboard
          </Button>
          <Button onClick={() => navigate("/scaling")} variant="hero" size="lg">
            View Scaling Roadmap
          </Button>
          <Button 
            onClick={handleRefresh}
            variant="outline"
            disabled={isRefreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FailSafe;