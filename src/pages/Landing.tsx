import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  TrendingUp, 
  FileText, 
  Shield, 
  Zap, 
  Target, 
  Star,
  ArrowRight,
  CheckCircle,
  Play,
  Users,
  Sparkles
} from "lucide-react";
import bizmateLogo from "@/assets/bizmate-logo.png";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero min-h-screen flex items-center">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left animate-fade-in">
              <Badge className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/20">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Business Intelligence
              </Badge>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Still spending weeks figuring out your 
                <span className="bg-gradient-to-r from-primary-glow to-accent bg-clip-text text-transparent"> business plan?</span>
              </h1>
              
              <p className="text-xl text-white/90 mb-8 max-w-2xl">
                BizMate.AI helps entrepreneurs validate, launch, and scale smarter in half the time.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
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
            
            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-2xl blur-3xl transform scale-110" />
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <div className="flex items-center gap-4 mb-6">
                  <img src={bizmateLogo} alt="BizMate.AI" className="w-12 h-12" />
                  <div>
                    <h3 className="text-white font-semibold">AI Co-Founder</h3>
                    <p className="text-white/70 text-sm">Always ready to help</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <p className="text-white/90 text-sm">"Let's analyze your market opportunity..."</p>
                  </div>
                  <div className="bg-primary/20 rounded-lg p-4 border border-primary/30">
                    <p className="text-white text-sm">✨ Generated business plan ready!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Why Use BizMate.AI?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transform your entrepreneurial journey with AI-powered insights, automated documentation, and real-time business monitoring.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="flex gap-4 items-start group hover:scale-105 transition-transform">
                <div className="bg-gradient-primary p-3 rounded-lg shadow-glow">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Personalized Roadmaps</h3>
                  <p className="text-muted-foreground">AI adapts to your industry, goals, and challenges to create custom business strategies.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start group hover:scale-105 transition-transform">
                <div className="bg-gradient-primary p-3 rounded-lg shadow-glow">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">FailSafe AI Monitoring</h3>
                  <p className="text-muted-foreground">24/7 business health monitoring with smart alerts and actionable recommendations.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start group hover:scale-105 transition-transform">
                <div className="bg-gradient-primary p-3 rounded-lg shadow-glow">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Smart BizDocs</h3>
                  <p className="text-muted-foreground">Auto-generate pitch decks, business plans, and investor documents in minutes.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start group hover:scale-105 transition-transform">
                <div className="bg-gradient-primary p-3 rounded-lg shadow-glow">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Smart Insights</h3>
                  <p className="text-muted-foreground">AI-powered recommendations and market insights to stay ahead of the competition.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-card rounded-2xl blur-xl transform scale-110 opacity-50" />
              <div className="relative bg-card rounded-2xl p-8 border shadow-card">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-card-foreground">Business Health Score</h4>
                    <Badge className="bg-green-100 text-green-800">82/100</Badge>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-muted-foreground">Revenue trending up 15%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <span className="text-sm text-muted-foreground">Customer acquisition improving</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-accent" />
                      <span className="text-sm text-muted-foreground">Marketing ROI: 3.2x</span>
                    </div>
                  </div>

                  <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
                    <p className="text-sm font-medium text-accent">💡 AI Recommendation</p>
                    <p className="text-sm text-muted-foreground mt-1">Consider expanding to sustainable home goods - 67% market opportunity match.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Spotlight */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              See BizMate.AI in Action
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience how our AI transforms complex business tasks into simple, automated workflows.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-glow transition-all duration-300 cursor-pointer">
              <CardHeader>
                <div className="bg-gradient-primary p-3 rounded-lg w-fit shadow-primary">
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

            <Card className="group hover:shadow-glow transition-all duration-300 cursor-pointer">
              <CardHeader>
                <div className="bg-gradient-primary p-3 rounded-lg w-fit shadow-primary">
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

            <Card className="group hover:shadow-glow transition-all duration-300 cursor-pointer">
              <CardHeader>
                <div className="bg-gradient-primary p-3 rounded-lg w-fit shadow-primary">
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
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Trusted by Entrepreneurs Worldwide
            </h2>
            <div className="flex items-center justify-center gap-2 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
              ))}
              <span className="ml-2 text-lg font-semibold text-muted-foreground">4.9/5 from 1,200+ founders</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-primary/20 shadow-card">
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

            <Card className="border-secondary/20 shadow-card">
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

            <Card className="border-accent/20 shadow-card">
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
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Choose Your Growth Path
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Start free and scale with plans designed for every stage of your entrepreneurial journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="relative border-2 border-border shadow-card">
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
                <Button className="w-full" variant="outline">Get Started Free</Button>
              </CardContent>
            </Card>

            <Card className="relative border-2 border-primary shadow-glow scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-primary text-white px-4 py-1">Most Popular</Badge>
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

            <Card className="relative border-2 border-border shadow-card">
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
                <Button className="w-full" variant="outline">Contact Sales</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-24 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
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
      </section>

      {/* Footer */}
      <footer className="py-16 bg-background border-t">
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
            <p className="text-muted-foreground text-sm">
              © 2024 BizMate.AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;