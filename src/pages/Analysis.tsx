import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, AlertTriangle, Target, CheckCircle, XCircle, Clock } from "lucide-react";

const Analysis = () => {
  const navigate = useNavigate();
  const businessScore = 78;

  const strengths = [
    "Clear target market identification",
    "Realistic budget planning",
    "Strong industry knowledge",
  ];

  const weaknesses = [
    "Limited marketing strategy",
    "No competitor analysis done",
  ];

  const improvements = [
    "Develop comprehensive marketing plan",
    "Research main competitors",
    "Create pricing strategy",
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Your Business Analysis</h1>
          <p className="text-xl text-muted-foreground">
            AI-powered insights about your business potential
          </p>
        </div>

        {/* Business Score */}
        <Card className="mb-8 shadow-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Business Readiness Score</CardTitle>
            <CardDescription>Based on your responses and industry data</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="relative w-48 h-48 mx-auto mb-6">
              <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
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
                  strokeDasharray={`${businessScore * 2.51} 251`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">{businessScore}</div>
                  <div className="text-muted-foreground">/ 100</div>
                </div>
              </div>
            </div>
            <p className="text-lg text-muted-foreground mb-4">
              Your business has <strong className="text-primary">strong potential</strong> with some areas for improvement
            </p>
          </CardContent>
        </Card>

        {/* Analysis Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-green-200 bg-green-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <CheckCircle className="w-5 h-5" />
                Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {strengths.map((strength, index) => (
                  <li key={index} className="flex items-center gap-2 text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    {strength}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <XCircle className="w-5 h-5" />
                Weaknesses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-center gap-2 text-red-600">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    {weakness}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 bg-yellow-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-700">
                <Clock className="w-5 h-5" />
                Trial & Error Zone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {improvements.map((improvement, index) => (
                  <li key={index} className="flex items-center gap-2 text-yellow-600">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    {improvement}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button onClick={() => navigate("/dashboard")} variant="hero" size="lg" className="px-12">
            View AI Recommendations
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Analysis;