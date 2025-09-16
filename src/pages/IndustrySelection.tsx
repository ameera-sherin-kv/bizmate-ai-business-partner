import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Store, Shirt, Coffee, Headphones, Monitor, MoreHorizontal, ChevronDown, CheckCircle, AlertTriangle } from "lucide-react";

const industries = [
  { 
    id: "retail", 
    name: "Retail", 
    icon: Store, 
    color: "bg-primary/10 text-primary",
    tagline: "Physical Goods",
    illustration: "🛍️",
    whyChoose: [
      "Direct customer interaction and immediate sales",
      "Tangible products with clear value proposition",
      "Multiple revenue streams (online + offline)"
    ],
    whyNot: [
      "High inventory and storage costs",
      "Seasonal fluctuations affect revenue",
      "Competition from established retailers"
    ]
  },
  { 
    id: "textiles", 
    name: "Textiles", 
    icon: Shirt, 
    color: "bg-secondary/10 text-secondary",
    tagline: "Clothing & Fabrics",
    illustration: "🧵",
    whyChoose: [
      "Growing sustainable fashion market",
      "Creative expression and design freedom",
      "Strong brand loyalty potential"
    ],
    whyNot: [
      "Complex supply chain management",
      "Fast fashion competition pressure",
      "Seasonal inventory challenges"
    ]
  },
  { 
    id: "fnb", 
    name: "F&B", 
    icon: Coffee, 
    color: "bg-accent/10 text-accent",
    tagline: "Food & Beverage",
    illustration: "☕",
    whyChoose: [
      "Essential daily need with repeat customers",
      "High profit margins on successful items",
      "Community building opportunities"
    ],
    whyNot: [
      "Strict health regulations and compliance",
      "Perishable inventory management",
      "High operational and labor costs"
    ]
  },
  { 
    id: "services", 
    name: "Services", 
    icon: Headphones, 
    color: "bg-primary-light/10 text-primary-light",
    tagline: "Consulting & Support",
    illustration: "💼",
    whyChoose: [
      "Low startup costs and overhead",
      "Scalable business model",
      "Expertise-based competitive advantage"
    ],
    whyNot: [
      "Time-intensive delivery model",
      "Difficulty scaling without team growth",
      "Client dependency and payment delays"
    ]
  },
  { 
    id: "digital", 
    name: "Digital Products", 
    icon: Monitor, 
    color: "bg-secondary-light/10 text-secondary-light",
    tagline: "Software & Apps",
    illustration: "💻",
    whyChoose: [
      "Global market reach potential",
      "High scalability with low marginal costs",
      "Recurring revenue opportunities"
    ],
    whyNot: [
      "High technical development costs",
      "Intense competition from tech giants",
      "Constant need for updates and innovation"
    ]
  },
  { 
    id: "others", 
    name: "Others", 
    icon: MoreHorizontal, 
    color: "bg-muted text-muted-foreground",
    tagline: "Custom Business",
    illustration: "🧩",
    whyChoose: [
      "Unique market positioning opportunity",
      "Flexibility to define your own rules",
      "Potential for innovative business models"
    ],
    whyNot: [
      "No established industry benchmarks",
      "Difficult to find relevant mentors",
      "Higher market education requirements"
    ]
  },
];

const IndustrySelection = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleExpanded = (industryId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedCard(expandedCard === industryId ? null : industryId);
  };

  const handleContinue = () => {
    if (selectedIndustry) {
      navigate("/discovery");
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Choose Your Business Industry</h1>
          <p className="text-xl text-muted-foreground">
            Help us personalize your experience with tailored insights for your business journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
          {industries.map((industry) => {
            const IconComponent = industry.icon;
            const isSelected = selectedIndustry === industry.id;
            return (
              <Card
                key={industry.id}
                className={`cursor-pointer transition-all duration-300 group relative overflow-hidden ${
                  isSelected
                    ? "ring-2 ring-primary shadow-glow scale-105"
                    : "hover:scale-105 hover:shadow-card"
                }`}
                onClick={() => setSelectedIndustry(industry.id)}
              >
                {isSelected && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center z-10">
                    <svg className="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {industry.illustration}
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-1">{industry.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{industry.tagline}</p>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={(e) => toggleExpanded(industry.id, e)}
                      className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      Learn More
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                        expandedCard === industry.id ? 'rotate-180' : ''
                      }`} />
                    </button>
                  </div>

                  {expandedCard === industry.id && (
                    <div className="mt-4 animate-fade-in">
                      <Tabs defaultValue="pros" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-3">
                          <TabsTrigger value="pros" className="flex items-center gap-2 text-xs">
                            <CheckCircle className="w-3 h-3" />
                            Why Choose
                          </TabsTrigger>
                          <TabsTrigger value="cons" className="flex items-center gap-2 text-xs">
                            <AlertTriangle className="w-3 h-3" />
                            Why Not
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="pros" className="mt-0">
                          <div className="bg-muted/30 rounded-lg p-3">
                            <ul className="space-y-2">
                              {industry.whyChoose.map((point, index) => (
                                <li key={index} className="text-xs text-foreground/80 flex items-start gap-2">
                                  <span className="text-green-500 mt-0.5 text-sm">•</span>
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </TabsContent>
                        <TabsContent value="cons" className="mt-0">
                          <div className="bg-muted/30 rounded-lg p-3">
                            <ul className="space-y-2">
                              {industry.whyNot.map((point, index) => (
                                <li key={index} className="text-xs text-foreground/80 flex items-start gap-2">
                                  <span className="text-orange-500 mt-0.5 text-sm">•</span>
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button
            onClick={handleContinue}
            disabled={!selectedIndustry}
            variant="hero"
            size="lg"
            className="px-12"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IndustrySelection;