import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, AlertTriangle, Target, CheckCircle, XCircle, Clock } from "lucide-react";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";

const Analysis = () => {
  const navigate = useNavigate();
  const businessScore = 76;

  // Animation hooks
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: scoreRef, isVisible: scoreVisible } = useScrollAnimation();
  const { ref: cardsRef, visibleItems: cardsVisible } = useStaggeredAnimation(3, 150);
  const { ref: buttonRef, isVisible: buttonVisible } = useScrollAnimation();

  const strengths = [
    "Strong eco-friendly positioning",
    "Growing niche market demand",
    "Clear artisan partnership strategy",
  ];

  const weaknesses = [
    "High initial inventory cost",
    "Limited founder experience in textiles",
  ];

  const improvements = [
    "Subscription model vs. retail",
    "Influencer-heavy marketing vs. organic storytelling",
    "Premium vs. mass market positioning",
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div 
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-700 ${
            headerVisible ? 'animate-fade-in' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="text-4xl font-bold text-primary mb-4">Your Business Analysis</h1>
          <p className="text-xl text-muted-foreground">
            AI-powered insights about your business potential
          </p>
        </div>

        {/* Business Score */}
        <Card 
          ref={scoreRef}
          className={`mb-8 shadow-card transition-all duration-700 ${
            scoreVisible ? 'animate-scale-in' : 'opacity-0 scale-95'
          }`}
        >
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
                  strokeDasharray={scoreVisible ? `${businessScore * 2.51} 251` : '0 251'}
                  className="transition-all duration-2000 ease-out"
                  style={{ 
                    transitionDelay: scoreVisible ? '300ms' : '0ms' 
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`text-center transition-all duration-500 ${
                  scoreVisible ? 'animate-fade-in' : 'opacity-0'
                }`} style={{ transitionDelay: scoreVisible ? '800ms' : '0ms' }}>
                  <div className="text-4xl font-bold text-primary">{scoreVisible ? businessScore : 0}</div>
                  <div className="text-muted-foreground">/ 100</div>
                </div>
              </div>
            </div>
            <p className={`text-lg text-muted-foreground mb-4 transition-all duration-500 ${
              scoreVisible ? 'animate-fade-in' : 'opacity-0'
            }`} style={{ transitionDelay: scoreVisible ? '1000ms' : '0ms' }}>
              Your business has <strong className="text-primary">strong potential</strong> with some areas for improvement
            </p>
          </CardContent>
        </Card>

        {/* Analysis Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className={`border-green-200 bg-green-50/50 transition-all duration-700 ${
            cardsVisible[0] ? 'animate-fade-in' : 'opacity-0 translate-y-8'
          }`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <CheckCircle className="w-5 h-5" />
                Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {strengths.map((strength, index) => (
                  <li 
                    key={index} 
                    className={`flex items-center gap-2 text-green-600 transition-all duration-300 ${
                      cardsVisible[0] ? 'animate-fade-in' : 'opacity-0'
                    }`}
                    style={{ transitionDelay: cardsVisible[0] ? `${200 + index * 100}ms` : '0ms' }}
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    {strength}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className={`border-red-200 bg-red-50/50 transition-all duration-700 ${
            cardsVisible[1] ? 'animate-fade-in' : 'opacity-0 translate-y-8'
          }`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <XCircle className="w-5 h-5" />
                Weaknesses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {weaknesses.map((weakness, index) => (
                  <li 
                    key={index} 
                    className={`flex items-center gap-2 text-red-600 transition-all duration-300 ${
                      cardsVisible[1] ? 'animate-fade-in' : 'opacity-0'
                    }`}
                    style={{ transitionDelay: cardsVisible[1] ? `${200 + index * 100}ms` : '0ms' }}
                  >
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    {weakness}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className={`border-yellow-200 bg-yellow-50/50 transition-all duration-700 ${
            cardsVisible[2] ? 'animate-fade-in' : 'opacity-0 translate-y-8'
          }`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-700">
                <Clock className="w-5 h-5" />
                Trial & Error Zone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {improvements.map((improvement, index) => (
                  <li 
                    key={index} 
                    className={`flex items-center gap-2 text-yellow-600 transition-all duration-300 ${
                      cardsVisible[2] ? 'animate-fade-in' : 'opacity-0'
                    }`}
                    style={{ transitionDelay: cardsVisible[2] ? `${200 + index * 100}ms` : '0ms' }}
                  >
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    {improvement}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div 
          ref={buttonRef}
          className={`text-center transition-all duration-700 ${
            buttonVisible ? 'animate-fade-in' : 'opacity-0 translate-y-8'
          }`}
        >
          <Button 
            onClick={() => navigate("/dashboard")} 
            variant="hero" 
            size="lg" 
            className="px-12 hover-scale"
          >
            View AI Recommendations
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Analysis;