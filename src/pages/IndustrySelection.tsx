import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Store, Shirt, Coffee, Headphones, Monitor, MoreHorizontal } from "lucide-react";

const industries = [
  { 
    id: "retail", 
    name: "Retail", 
    icon: Store, 
    color: "bg-primary/10 text-primary",
    tagline: "Physical Goods",
    illustration: "🛍️"
  },
  { 
    id: "textiles", 
    name: "Textiles", 
    icon: Shirt, 
    color: "bg-secondary/10 text-secondary",
    tagline: "Clothing & Fabrics",
    illustration: "🧵"
  },
  { 
    id: "fnb", 
    name: "F&B", 
    icon: Coffee, 
    color: "bg-accent/10 text-accent",
    tagline: "Food & Beverage",
    illustration: "☕"
  },
  { 
    id: "services", 
    name: "Services", 
    icon: Headphones, 
    color: "bg-primary-light/10 text-primary-light",
    tagline: "Consulting & Support",
    illustration: "💼"
  },
  { 
    id: "digital", 
    name: "Digital Products", 
    icon: Monitor, 
    color: "bg-secondary-light/10 text-secondary-light",
    tagline: "Software & Apps",
    illustration: "💻"
  },
  { 
    id: "others", 
    name: "Others", 
    icon: MoreHorizontal, 
    color: "bg-muted text-muted-foreground",
    tagline: "Custom Business",
    illustration: "🧩"
  },
];

const IndustrySelection = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const navigate = useNavigate();

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
            Help us personalize your experience and provide tailored insights
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
                <CardContent className="p-8 text-center">
                  <div className="text-7xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {industry.illustration}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{industry.name}</h3>
                  <p className="text-muted-foreground font-medium">{industry.tagline}</p>
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