import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Rocket, 
  TrendingUp, 
  Globe, 
  Users, 
  CheckCircle,
  ArrowRight,
  Target,
  Building2,
  Megaphone
} from "lucide-react";

interface Milestone {
  id: number;
  title: string;
  description: string;
  stage: "Launch" | "Growth" | "Expansion" | "Global";
  status: "completed" | "current" | "upcoming";
  icon: React.ReactNode;
}

const milestones: Milestone[] = [
  {
    id: 1,
    title: "Business Launch",
    description: "Successfully launched your business with initial product/service offering",
    stage: "Launch",
    status: "completed",
    icon: <Rocket className="w-6 h-6" />
  },
  {
    id: 2,
    title: "First 100 Customers",
    description: "Acquired your first customer base and established market presence",
    stage: "Launch",
    status: "completed",
    icon: <Users className="w-6 h-6" />
  },
  {
    id: 3,
    title: "Revenue Optimization",
    description: "Optimize pricing and improve profit margins",
    stage: "Growth",
    status: "current",
    icon: <TrendingUp className="w-6 h-6" />
  },
  {
    id: 4,
    title: "Marketing Automation",
    description: "Implement automated marketing systems and scale customer acquisition",
    stage: "Growth",
    status: "upcoming",
    icon: <Megaphone className="w-6 h-6" />
  },
  {
    id: 5,
    title: "Team Building",
    description: "Hire key team members and establish operational processes",
    stage: "Expansion",
    status: "upcoming",
    icon: <Building2 className="w-6 h-6" />
  },
  {
    id: 6,
    title: "Global Market Entry",
    description: "Expand into international markets and establish global presence",
    stage: "Global",
    status: "upcoming",
    icon: <Globe className="w-6 h-6" />
  }
];

const Scaling = () => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "current":
        return "bg-primary/10 text-primary border-primary/20";
      case "upcoming":
        return "bg-gray-100 text-gray-600 border-gray-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Launch":
        return "bg-green-500";
      case "Growth":
        return "bg-primary";
      case "Expansion":
        return "bg-secondary";
      case "Global":
        return "bg-accent";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Scaling Roadmap</h1>
          <p className="text-xl text-muted-foreground">
            Your AI-powered journey from startup to global success
          </p>
        </div>

        {/* Current Recommendation */}
        <Card className="mb-8 shadow-primary border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-6 h-6 text-primary" />
              AI Recommendation: Next Step
            </CardTitle>
            <CardDescription>Based on your current performance and market analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">
                Expand into B2B Sales Channels
              </h3>
              <p className="text-muted-foreground mb-4">
                Your product metrics show strong potential for B2B market expansion. 
                Consider reaching out to businesses in your target industry who could 
                benefit from bulk purchases or partnerships.
              </p>
              <div className="flex gap-4">
                <Badge variant="outline" className="border-primary/20 text-primary">
                  Confidence: 87%
                </Badge>
                <Badge variant="outline" className="border-primary/20 text-primary">
                  Expected ROI: 150%
                </Badge>
                <Badge variant="outline" className="border-primary/20 text-primary">
                  Timeline: 3-6 months
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="mb-8 shadow-card">
          <CardHeader>
            <CardTitle>Business Growth Timeline</CardTitle>
            <CardDescription>Your progress through key business milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={milestone.id} className="flex gap-4">
                  {/* Timeline indicator */}
                  <div className="flex flex-col items-center">
                    <div 
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        milestone.status === "completed" 
                          ? "bg-green-100 text-green-600" 
                          : milestone.status === "current"
                          ? "bg-primary/10 text-primary"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {milestone.status === "completed" ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        milestone.icon
                      )}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-0.5 h-8 bg-border mt-2" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{milestone.title}</h3>
                      <Badge 
                        variant="outline" 
                        className={getStatusColor(milestone.status)}
                      >
                        {milestone.status === "completed" ? "Completed" : 
                         milestone.status === "current" ? "In Progress" : "Upcoming"}
                      </Badge>
                      <div className={`w-3 h-3 rounded-full ${getStageColor(milestone.stage)}`} />
                      <span className="text-sm text-muted-foreground">{milestone.stage}</span>
                    </div>
                    <p className="text-muted-foreground">{milestone.description}</p>
                    
                    {milestone.status === "current" && (
                      <Button variant="outline" size="sm" className="mt-3">
                        View Action Plan
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button onClick={() => navigate("/dashboard")} variant="outline" size="lg">
            Back to Dashboard
          </Button>
          <Button onClick={() => navigate("/failsafe")} variant="hero" size="lg">
            Check AI Alerts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Scaling;