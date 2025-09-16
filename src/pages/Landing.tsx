import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, FileText, Shield, Zap, Target, Star, ArrowRight, CheckCircle, Play, Users, Sparkles, ChevronLeft, ChevronRight, Rocket } from "lucide-react";
import bizmateLogo from "@/assets/bizmate-logo.png";
import heroIllustration from "@/assets/hero-illustration.jpg";
import flowingBg from "@/assets/flowing-bg.jpg";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { cn } from "@/lib/utils";
const Landing = () => {
  const heroAnimation = useScrollAnimation();
  const valuePropsAnimation = useStaggeredAnimation(4, 300);
  const featuresAnimation = useStaggeredAnimation(3, 200);
  const testimonialsAnimation = useStaggeredAnimation(3, 250);

  // AI conversation animation states
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  
  const conversationSteps = [
    { type: 'user', text: "What's your industry?", delay: 0 },
    { type: 'ai', text: "Textiles.", delay: 1500 },
    { type: 'user', text: "Analyzing competitors...", delay: 3000 },
    { type: 'ai', text: "Top 3 found.", delay: 4500 },
    { type: 'user', text: "Generated business plan ready ✅", delay: 6000 }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < conversationSteps.length - 1) {
          setIsTyping(true);
          setTimeout(() => setIsTyping(false), 800);
          return prev + 1;
        } else {
          // Reset animation
          setTimeout(() => setCurrentStep(0), 2000);
          return prev;
        }
      });
    }, 7000);
    
    return () => clearInterval(timer);
  }, []);

  // Carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false,
    dragFree: false
  }, [Autoplay({
    delay: 4000,
    stopOnInteraction: false
  })]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);
  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  // All carousel cards data
  const carouselCards = [{
    type: "health",
    score: "82/100",
    title: "Business Health Score",
    status: "bg-green-100 text-green-800",
    items: [{
      icon: CheckCircle,
      text: "Revenue trending up 15%",
      color: "text-green-500"
    }, {
      icon: TrendingUp,
      text: "Customer acquisition improving",
      color: "text-primary"
    }, {
      icon: Zap,
      text: "Marketing ROI: 3.2x",
      color: "text-accent"
    }],
    recommendation: "Consider expanding to sustainable home goods - 67% market opportunity match."
  }, {
    type: "roadmap",
    industry: "E-commerce",
    title: "Personalized Roadmap",
    phase: "Growth Strategy",
    items: ["Market expansion analysis", "Customer segmentation", "Revenue optimization", "Competitive positioning"]
  }, {
    type: "bizdocs",
    title: "Smart BizDocs",
    docType: "Investor Pitch Deck",
    pages: "12 slides",
    sections: ["Problem & Solution", "Market Opportunity", "Business Model", "Financial Projections"]
  }, {
    type: "insights",
    title: "Smart Insights",
    insightType: "Market Opportunity",
    confidence: "92%",
    insight: "Sustainable packaging market growing 23% annually in your region.",
    action: "Consider eco-friendly product line"
  }, {
    type: "health",
    score: "76/100",
    title: "Operational Efficiency",
    status: "bg-blue-100 text-blue-800",
    items: [{
      icon: CheckCircle,
      text: "Inventory turnover up 22%",
      color: "text-green-500"
    }, {
      icon: Target,
      text: "Production efficiency 89%",
      color: "text-primary"
    }, {
      icon: Zap,
      text: "Supply chain optimized",
      color: "text-accent"
    }],
    recommendation: "Automate customer service to reduce response time by 40%."
  }, {
    type: "roadmap",
    industry: "SaaS",
    title: "Personalized Roadmap",
    phase: "Product-Market Fit",
    items: ["User onboarding optimization", "Feature prioritization", "Churn reduction strategy", "Pricing model validation"]
  }, {
    type: "bizdocs",
    title: "Smart BizDocs",
    docType: "Business Plan",
    pages: "25 pages",
    sections: ["Executive Summary", "Market Analysis", "Operations Plan", "Financial Strategy"]
  }, {
    type: "insights",
    title: "Smart Insights",
    insightType: "Customer Behavior",
    confidence: "87%",
    insight: "Peak sales occur during weekend evening hours (6-9 PM).",
    action: "Optimize ad spend timing"
  }];
  return <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 animate-background-flow" />
        
        {/* Dynamic floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-primary-glow/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-secondary/10 to-accent/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-accent/5 to-transparent rounded-full blur-3xl animate-pulse-glow" />
        
        {/* Particle lines */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute w-px h-32 bg-gradient-to-b from-transparent via-primary/30 to-transparent animate-float" style={{top: '20%', left: '15%', animationDelay: '0s'}} />
          <div className="absolute w-px h-24 bg-gradient-to-b from-transparent via-accent/30 to-transparent animate-float" style={{top: '50%', left: '85%', animationDelay: '3s'}} />
          <div className="absolute w-24 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent animate-float" style={{top: '70%', left: '30%', animationDelay: '1.5s'}} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center z-10">
        <div className="absolute inset-0 bg-gradient-primary animate-gradient-shift" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px] animate-grid-flow" />
        <div className="container mx-auto px-4 relative z-10">
          <div ref={heroAnimation.ref} className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center lg:text-left animate-slide-in-left">
              <Badge className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/20">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Business Intelligence
              </Badge>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Don't just plan your business. 
                <span className="bg-gradient-to-r from-primary-glow to-accent bg-clip-text text-transparent animate-pulse"> Launch it smarter with AI.</span>
              </h1>
              
              <p className="text-xl text-white/90 mb-8 max-w-2xl">
                Validate, launch, and scale smarter with AI — in days, not months.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6">
                <Button variant="hero" size="lg" className="group" onClick={() => window.location.href = '/login'}>
                  Start Free with BizMate.AI
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="glass" size="lg">
                  <Play className="w-5 h-5 mr-2" />
                  Book a Demo
                </Button>
              </div>
              
              {/* Social Proof */}
              <div className="flex flex-col sm:flex-row gap-4 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <Rocket className="w-4 h-4 text-primary-glow animate-pulse" />
                  <span>Trusted by 500+ founders</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-accent animate-pulse" />
                  <span>Saves 20+ hours per week</span>
                </div>
              </div>
            </div>
            
            <div className="relative animate-slide-in-right">
              {/* Animated particles background */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                <div className="absolute w-2 h-2 bg-primary/40 rounded-full animate-float" style={{top: '20%', left: '10%', animationDelay: '0s'}} />
                <div className="absolute w-1 h-1 bg-accent/60 rounded-full animate-float" style={{top: '60%', left: '80%', animationDelay: '1s'}} />
                <div className="absolute w-1.5 h-1.5 bg-secondary/50 rounded-full animate-float" style={{top: '80%', left: '20%', animationDelay: '2s'}} />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 rounded-2xl blur-2xl transform scale-110 animate-pulse-glow" />
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <div className="relative">
                  <img src={heroIllustration} alt="AI Co-founder Dashboard" className="w-full h-64 object-cover rounded-lg mb-6 shadow-glow" />
                  {/* Typing cursor animation */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full animate-pulse" />
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <img src={bizmateLogo} alt="BizMate.AI" className="w-12 h-12" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold flex items-center gap-2">
                      AI Co-Founder 
                      <Brain className="w-4 h-4 animate-pulse text-primary-glow" />
                    </h3>
                    <p className="text-white/70 text-sm">Always ready to help</p>
                  </div>
                </div>
                
                <div className="space-y-3 min-h-[120px]">
                  {conversationSteps.slice(0, currentStep + 1).map((step, index) => (
                    <div 
                      key={index}
                      className={`${step.type === 'ai' ? 'bg-primary/20 border-primary/30' : 'bg-white/5 border-white/10'} rounded-lg p-3 border animate-slide-in-right`}
                      style={{animationDelay: `${index * 200}ms`}}
                    >
                      <p className="text-white/90 text-sm flex items-center gap-2">
                        {step.type === 'ai' && <Brain className="w-3 h-3 text-primary-glow" />}
                        {step.text}
                        {index === currentStep && isTyping && (
                          <span className="w-1 h-4 bg-white/60 animate-pulse inline-block ml-1" />
                        )}
                      </p>
                    </div>
                   ))}
                </div>
                
                {/* Loading indicator */}
                <div className="mt-4 flex items-center justify-center">
                  <div className="flex items-center gap-2 text-xs text-white/60">
                    <div className="w-1 h-1 bg-primary-glow rounded-full animate-pulse"></div>
                    <span>Next conversation loading...</span>
                    <div className="w-1 h-1 bg-primary-glow rounded-full animate-pulse delay-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-24 bg-background relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Why Use BizMate.AI?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transform your entrepreneurial journey with AI-powered insights, automated documentation, and real-time business monitoring.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div ref={valuePropsAnimation.ref} className="space-y-8">
              <div className={`flex gap-4 items-start group hover:scale-105 transition-all duration-500 ${valuePropsAnimation.visibleItems[0] ? 'animate-slide-in-left' : 'opacity-0'}`}>
                <div className="bg-gradient-primary p-3 rounded-lg shadow-glow animate-pulse-glow">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Personalized Roadmaps</h3>
                  <p className="text-muted-foreground">AI adapts to your industry, goals, and challenges to create custom business strategies.</p>
                </div>
              </div>

              <div className={`flex gap-4 items-start group hover:scale-105 transition-all duration-500 ${valuePropsAnimation.visibleItems[1] ? 'animate-slide-in-left' : 'opacity-0'}`}>
                <div className="bg-gradient-primary p-3 rounded-lg shadow-glow animate-pulse-glow">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">FailSafe AI Monitoring</h3>
                  <p className="text-muted-foreground">24/7 business health monitoring with smart alerts and actionable recommendations.</p>
                </div>
              </div>

              <div className={`flex gap-4 items-start group hover:scale-105 transition-all duration-500 ${valuePropsAnimation.visibleItems[2] ? 'animate-slide-in-left' : 'opacity-0'}`}>
                <div className="bg-gradient-primary p-3 rounded-lg shadow-glow animate-pulse-glow">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Smart BizDocs</h3>
                  <p className="text-muted-foreground">Auto-generate pitch decks, business plans, and investor documents in minutes.</p>
                </div>
              </div>

              <div className={`flex gap-4 items-start group hover:scale-105 transition-all duration-500 ${valuePropsAnimation.visibleItems[3] ? 'animate-slide-in-left' : 'opacity-0'}`}>
                <div className="bg-gradient-primary p-3 rounded-lg shadow-glow animate-pulse-glow">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Smart Insights</h3>
                  <p className="text-muted-foreground">AI-powered recommendations and market insights to stay ahead of the competition.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Carousel Controls */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-foreground">Live AI Features Demo</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={scrollPrev} disabled={!canScrollPrev} className="w-8 h-8">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={scrollNext} disabled={!canScrollNext} className="w-8 h-8">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Carousel */}
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-6 items-center">
                  {carouselCards.map((card, index) => <div key={index} className="flex-[0_0_100%] min-w-0">
                      <div className="flex items-center justify-center min-h-[400px]">
                        <div className="bg-card rounded-2xl p-8 border shadow-card transition-all duration-500 w-full max-w-md mx-auto">
                          {card.type === 'health' && <div className="space-y-6">
                              <div className="flex items-center justify-between">
                                <h4 className="text-lg font-semibold text-card-foreground">{card.title}</h4>
                                <Badge className={card.status}>{card.score}</Badge>
                              </div>
                              
                              <div className="space-y-4">
                                {card.items.map((item, idx) => {
                            const IconComponent = item.icon;
                            return <div key={idx} className="flex items-center gap-3">
                                      <IconComponent className={`w-5 h-5 ${item.color}`} />
                                      <span className="text-sm text-muted-foreground">{item.text}</span>
                                    </div>;
                          })}
                              </div>

                              <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
                                <p className="text-sm font-medium text-accent">💡 AI Recommendation</p>
                                <p className="text-sm text-muted-foreground mt-1">{card.recommendation}</p>
                              </div>
                            </div>}

                          {card.type === 'roadmap' && <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <h4 className="text-lg font-semibold text-card-foreground">{card.title}</h4>
                                <Badge variant="outline">{card.industry}</Badge>
                              </div>
                              
                              <div>
                                <p className="text-sm font-medium text-primary mb-2">{card.phase}</p>
                                <div className="space-y-2">
                                  {card.items.map((item, idx) => <div key={idx} className="flex items-center gap-2">
                                      <div className="w-2 h-2 bg-primary rounded-full" />
                                      <span className="text-sm text-muted-foreground">{item}</span>
                                    </div>)}
                                </div>
                              </div>
                            </div>}

                          {card.type === 'bizdocs' && <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <h4 className="text-lg font-semibold text-card-foreground">{card.title}</h4>
                                <Badge className="bg-secondary/10 text-secondary">{card.pages}</Badge>
                              </div>
                              
                              <div>
                                <p className="text-sm font-medium text-secondary mb-2">{card.docType}</p>
                                <div className="space-y-2">
                                  {card.sections.map((section, idx) => <div key={idx} className="flex items-center gap-2">
                                      <FileText className="w-3 h-3 text-secondary" />
                                      <span className="text-sm text-muted-foreground">{section}</span>
                                    </div>)}
                                </div>
                              </div>
                            </div>}

                          {card.type === 'insights' && <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <h4 className="text-lg font-semibold text-card-foreground">{card.title}</h4>
                                <Badge className="bg-accent/10 text-accent">{card.confidence}</Badge>
                              </div>
                              
                              <div>
                                <p className="text-sm font-medium text-accent mb-2">{card.insightType}</p>
                                <p className="text-sm text-muted-foreground mb-3">{card.insight}</p>
                                <div className="bg-accent/10 rounded-lg p-3 border border-accent/20">
                                  <p className="text-sm font-medium text-accent">🎯 Recommended Action</p>
                                  <p className="text-sm text-muted-foreground">{card.action}</p>
                                </div>
                              </div>
                            </div>}
                        </div>
                      </div>
                    </div>)}
                </div>
              </div>

              {/* Carousel Indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {carouselCards.map((_, index) => <button key={index} className={`w-2 h-2 rounded-full transition-colors ${index === selectedIndex ? 'bg-primary' : 'bg-muted-foreground/20'}`} onClick={() => emblaApi?.scrollTo(index)} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Spotlight */}
      <section className="py-24 bg-muted/50 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              See BizMate.AI in Action
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience how our AI transforms complex business tasks into simple, automated workflows.
            </p>
          </div>

          <div ref={featuresAnimation.ref} className="grid md:grid-cols-3 gap-8">
            <Card className={`group hover:shadow-glow transition-all duration-500 cursor-pointer animate-float ${featuresAnimation.visibleItems[0] ? 'animate-scale-in' : 'opacity-0'}`}>
              <CardHeader>
                <div className="bg-gradient-primary p-3 rounded-lg w-fit shadow-primary animate-pulse-glow">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <CardTitle>BizDocs Generator</CardTitle>
                <CardDescription>
                  Watch AI create professional business documents instantly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Click "Generate Pitch Deck"
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-secondary rounded-full" />
                    AI analyzes your business data
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    Professional PDF ready in 60 seconds
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={`group hover:shadow-glow transition-all duration-500 cursor-pointer animate-float delay-200 ${featuresAnimation.visibleItems[1] ? 'animate-scale-in' : 'opacity-0'}`}>
              <CardHeader>
                <div className="bg-gradient-primary p-3 rounded-lg w-fit shadow-primary animate-pulse-glow">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <CardTitle>AI Scorecard</CardTitle>
                <CardDescription>
                  Real-time business performance monitoring and alerts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    Score: 78/100 - Good Performance
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    Alert: High Ad Spend Detected
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Tip: Reduce CPC campaigns by 20%
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={`group hover:shadow-glow transition-all duration-500 cursor-pointer animate-float delay-400 ${featuresAnimation.visibleItems[2] ? 'animate-scale-in' : 'opacity-0'}`}>
              <CardHeader>
                <div className="bg-gradient-primary p-3 rounded-lg w-fit shadow-primary animate-pulse-glow">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Strategy Builder</CardTitle>
                <CardDescription>
                  AI-powered market analysis and strategy recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Define target audience
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-secondary rounded-full" />
                    AI generates buyer personas
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    Complete marketing strategy ready
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 bg-background relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Trusted by Entrepreneurs Worldwide
            </h2>
            <div className="flex items-center justify-center gap-2 mb-8">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />)}
              <span className="ml-2 text-lg font-semibold text-muted-foreground">4.9/5 from 1,200+ founders</span>
            </div>
          </div>

          <div ref={testimonialsAnimation.ref} className="grid md:grid-cols-3 gap-8">
            <Card className={`border-primary/20 shadow-card hover:shadow-glow transition-all duration-500 animate-float ${testimonialsAnimation.visibleItems[0] ? 'animate-slide-in-left' : 'opacity-0'}`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-card-foreground">Sarah Chen</h4>
                    <p className="text-sm text-muted-foreground">Tech Startup Founder</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "BizMate saved me months of confusion – it's like having an AI mentor who actually understands my business."
                </p>
              </CardContent>
            </Card>

            <Card className={`border-secondary/20 shadow-card hover:shadow-glow transition-all duration-500 animate-float delay-200 ${testimonialsAnimation.visibleItems[1] ? 'animate-slide-in-left' : 'opacity-0'}`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-card-foreground">Marcus Rodriguez</h4>
                    <p className="text-sm text-muted-foreground">E-commerce Entrepreneur</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "My pitch deck was ready in minutes, not weeks. The AI insights helped me secure Series A funding."
                </p>
              </CardContent>
            </Card>

            <Card className={`border-accent/20 shadow-card hover:shadow-glow transition-all duration-500 animate-float delay-400 ${testimonialsAnimation.visibleItems[2] ? 'animate-slide-in-left' : 'opacity-0'}`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-card-foreground">Emily Johnson</h4>
                    <p className="text-sm text-muted-foreground">SaaS Founder</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "The FailSafe monitoring caught issues before they became problems. BizMate.AI is my business co-pilot."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-24 bg-muted/50 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Choose Your Growth Path
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Start free and scale with plans designed for every stage of your entrepreneurial journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card 
              className={cn(
                "relative border-2 shadow-card hover:shadow-glow transition-all duration-300 cursor-pointer",
                selectedPlan === 'free' 
                  ? "border-primary shadow-glow scale-105" 
                  : "border-border hover:border-primary/50"
              )}
              onClick={() => setSelectedPlan(selectedPlan === 'free' ? null : 'free')}
            >
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Free</CardTitle>
                <div className="text-4xl font-bold text-primary">$0</div>
                <p className="text-muted-foreground">Perfect for exploring ideas</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Basic business plan generator</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">5 AI consultations/month</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Basic templates</span>
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  variant={selectedPlan === 'free' ? 'default' : 'outline'}
                >
                  Get Started Free
                </Button>
              </CardContent>
            </Card>

            <Card 
              className={cn(
                "relative border-2 shadow-glow transition-all duration-300 cursor-pointer",
                selectedPlan === 'pro' 
                  ? "border-primary shadow-glow scale-105" 
                  : "border-border hover:border-primary/80 hover:scale-105"
              )}
              onClick={() => setSelectedPlan(selectedPlan === 'pro' ? null : 'pro')}
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-primary text-white px-4 py-1">
                  {selectedPlan === 'pro' ? 'Selected' : 'Most Popular'}
                </Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Pro</CardTitle>
                <div className="text-4xl font-bold text-primary">$49</div>
                <p className="text-muted-foreground">For growing businesses</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Unlimited AI consultations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">FailSafe monitoring</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Premium templates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Priority support</span>
                  </div>
                </div>
                <Button className="w-full" variant="hero">Start Pro Trial</Button>
              </CardContent>
            </Card>

            <Card 
              className={cn(
                "relative border-2 shadow-card hover:shadow-glow transition-all duration-300 cursor-pointer",
                selectedPlan === 'enterprise' 
                  ? "border-primary shadow-glow scale-105" 
                  : "border-border hover:border-primary/50"
              )}
              onClick={() => setSelectedPlan(selectedPlan === 'enterprise' ? null : 'enterprise')}
            >
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <div className="text-4xl font-bold text-primary">Custom</div>
                <p className="text-muted-foreground">For established companies</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Custom AI training</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Dedicated account manager</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">Advanced integrations</span>
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  variant={selectedPlan === 'enterprise' ? 'default' : 'outline'}
                >
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-24 bg-gradient-hero relative z-10">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to launch smarter?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Join thousands of entrepreneurs who've accelerated their success with BizMate.AI
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="group">
                Explore BizMate.AI
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="glass" size="lg">
                <Play className="w-5 h-5 mr-2" />
                Book a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-background border-t relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={bizmateLogo} alt="BizMate.AI" className="w-8 h-8" />
                <span className="text-xl font-bold text-foreground">BizMate.AI</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Your AI-powered business co-founder for smarter entrepreneurship.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">AI Business Plans</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FailSafe Monitoring</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Smart BizDocs</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Strategy Builder</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 text-center">
            <p className="text-muted-foreground text-sm">© 2025 BizMate.AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Landing;