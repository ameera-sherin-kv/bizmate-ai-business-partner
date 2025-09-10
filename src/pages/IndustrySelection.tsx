import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Store, Shirt, Coffee, Headphones, Monitor, MoreHorizontal } from "lucide-react";

const industries = [
  { id: "retail", name: "Retail", icon: Store, color: "bg-primary/10 text-primary" },
  { id: "textiles", name: "Textiles", icon: Shirt, color: "bg-secondary/10 text-secondary" },
  { id: "fnb", name: "F&B", icon: Coffee, color: "bg-accent/10 text-accent" },
  { id: "services", name: "Services", icon: Headphones, color: "bg-primary-light/10 text-primary-light" },
  { id: "digital", name: "Digital Products", icon: Monitor, color: "bg-secondary-light/10 text-secondary-light" },
  { id: "others", name: "Others", icon: MoreHorizontal, color: "bg-muted text-muted-foreground" },
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {industries.map((industry) => {
            const IconComponent = industry.icon;
            return (
              <Card
                key={industry.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-card ${
                  selectedIndustry === industry.id
                    ? "ring-2 ring-primary shadow-primary"
                    : "hover:scale-105"
                }`}
                onClick={() => setSelectedIndustry(industry.id)}
              >
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 rounded-full ${industry.color} flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{industry.name}</h3>
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