import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, AlertTriangle, Target, CheckCircle, XCircle, Clock, Zap } from "lucide-react";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";

const Analysis = () => {
  const navigate = useNavigate();
  const businessScore = 76;

  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showScoreReveal, setShowScoreReveal] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showCards, setShowCards] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);

  const loadingTexts = [
    "BizMate is generating your AI report…",
    "We're closely monitoring your inputs…",
    "Optimizing with advanced algorithms…",
    "Generating the best possible output for your business…",
    "Almost there… your insights are loading."
  ];

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

  // Loading sequence effect
  useEffect(() => {
    // Rotate text every 2.5 seconds
    const textInterval = setInterval(() => {
      setCurrentTextIndex(prev => (prev + 1) % loadingTexts.length);
    }, 2500);

    // End loading after 12 seconds
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
      setShowScoreReveal(true);
      
      // Start score animation after a brief delay
      setTimeout(() => {
        const scoreAnimation = setInterval(() => {
          setAnimatedScore(prev => {
            if (prev >= businessScore) {
              clearInterval(scoreAnimation);
              // Show cards after score completes
              setTimeout(() => {
                setShowCards(true);
                // Animate cards one by one
                const cardInterval = setInterval(() => {
                  setCardIndex(prev => {
                    if (prev >= 2) {
                      clearInterval(cardInterval);
                      return prev;
                    }
                    return prev + 1;
                  });
                }, 600);
              }, 1000);
              return businessScore;
            }
            return prev + 2;
          });
        }, 50);
      }, 500);
    }, 12000);

    return () => {
      clearInterval(textInterval);
      clearTimeout(loadingTimeout);
    };
  }, [businessScore]);

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          {/* Centered circular loader with AI glow */}
          <div className="relative mb-12">
            <div className="w-32 h-32 mx-auto">
              <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse"></div>
              <div className="absolute inset-2 rounded-full bg-primary/30 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute inset-4 rounded-full bg-primary/40 animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute inset-6 rounded-full bg-primary animate-spin border-4 border-transparent border-t-primary-foreground"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Zap className="w-8 h-8 text-primary-foreground animate-pulse" />
              </div>
            </div>
          </div>

          {/* Rotating text statements */}
          <div className="h-16 flex items-center justify-center">
            <p 
              key={currentTextIndex}
              className="text-xl text-primary font-medium animate-fade-in max-w-md"
            >
              {loadingTexts[currentTextIndex]}
            </p>
          </div>
        </div>
      </div>
    );
  }

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
          className={`mb-8 shadow-card transition-all duration-1000 ${
            showScoreReveal ? 'animate-scale-in' : 'opacity-0 scale-95'
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
                  strokeDasharray={`${animatedScore * 2.51} 251`}
                  className="transition-all duration-100 ease-out"
                  style={{
                    filter: animatedScore === businessScore ? 'drop-shadow(0 0 20px hsl(var(--primary) / 0.5))' : 'none'
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`text-center transition-all duration-500 ${
                  showScoreReveal ? 'animate-fade-in' : 'opacity-0'
                }`}>
                  <div className="text-4xl font-bold text-primary">{animatedScore}</div>
                  <div className="text-muted-foreground">/ 100</div>
                </div>
              </div>
            </div>
            <p className={`text-lg text-muted-foreground mb-4 transition-all duration-500 ${
              animatedScore === businessScore ? 'animate-fade-in' : 'opacity-0'
            }`}>
              Your business has <strong className="text-primary">strong potential</strong> with some areas for improvement
            </p>
          </CardContent>
        </Card>

        {/* Analysis Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Strengths Card */}
          <Card className={`border-green-200 bg-green-50/50 transition-all duration-700 ${
            showCards && cardIndex >= 0 
              ? 'animate-scale-in animate-fade-in' 
              : 'opacity-0 scale-75 translate-y-8'
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
                      showCards && cardIndex >= 0 ? 'animate-fade-in' : 'opacity-0'
                    }`}
                    style={{ 
                      transitionDelay: showCards && cardIndex >= 0 ? `${400 + index * 150}ms` : '0ms' 
                    }}
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    {strength}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Weaknesses Card */}
          <Card className={`border-yellow-200 bg-yellow-50/50 transition-all duration-700 ${
            showCards && cardIndex >= 1 
              ? 'animate-scale-in animate-fade-in' 
              : 'opacity-0 scale-75 translate-y-8'
          }`} style={{ transitionDelay: showCards && cardIndex >= 1 ? '200ms' : '0ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-700">
                <AlertTriangle className="w-5 h-5" />
                Weaknesses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {weaknesses.map((weakness, index) => (
                  <li 
                    key={index} 
                    className={`flex items-center gap-2 text-yellow-600 transition-all duration-300 ${
                      showCards && cardIndex >= 1 ? 'animate-fade-in' : 'opacity-0'
                    }`}
                    style={{ 
                      transitionDelay: showCards && cardIndex >= 1 ? `${600 + index * 150}ms` : '0ms' 
                    }}
                  >
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    {weakness}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Trial & Error Card */}
          <Card className={`border-blue-200 bg-blue-50/50 transition-all duration-700 ${
            showCards && cardIndex >= 2 
              ? 'animate-scale-in animate-fade-in' 
              : 'opacity-0 scale-75 translate-y-8'
          }`} style={{ transitionDelay: showCards && cardIndex >= 2 ? '400ms' : '0ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Zap className="w-5 h-5" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {improvements.map((improvement, index) => (
                  <li 
                    key={index} 
                    className={`flex items-center gap-2 text-blue-600 transition-all duration-300 ${
                      showCards && cardIndex >= 2 ? 'animate-fade-in' : 'opacity-0'
                    }`}
                    style={{ 
                      transitionDelay: showCards && cardIndex >= 2 ? `${800 + index * 150}ms` : '0ms' 
                    }}
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    {improvement}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div 
          className={`text-center transition-all duration-700 ${
            showCards && cardIndex >= 2 ? 'animate-fade-in' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: showCards && cardIndex >= 2 ? '1200ms' : '0ms' }}
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