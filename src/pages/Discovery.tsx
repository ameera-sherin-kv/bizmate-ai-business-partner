import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Bot, User, Send, Download, Save, FileText, Building, Package, BarChart3, Target, Settings, DollarSign } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Message {
  id: number;
  text: string;
  isAI: boolean;
  isTyping?: boolean;
}

interface BusinessPlan {
  title: string;
  tagline: string;
  vision: string;
  founders: string;
  mission: string;
  businessModel: string;
  products: string;
  pricing: string;
  targetAudience: string;
  competitors: string;
  opportunity: string;
  marketing: string;
  sales: string;
  branding: string;
  team: string;
  tools: string;
  logistics: string;
  techStack: string;
  startupCosts: string;
  revenueStreams: string;
  forecast: string;
}

const questions = [
  "What is your business idea? Describe it in detail.",
  "What's your starting budget for this business?",
  "Who is your target customer? Describe them in detail.",
  "How do you plan to sell your products/services?",
  "What experience do you have in this industry?",
  "What are your main revenue streams?",
  "What's your biggest concern about starting this business?",
];

const planSections = [
  { id: 'executive', title: 'Executive Summary', icon: FileText, fields: ['title', 'tagline', 'vision'] },
  { id: 'business', title: 'The Business', icon: Building, fields: ['founders', 'mission', 'businessModel'] },
  { id: 'products', title: 'Products / Services', icon: Package, fields: ['products', 'pricing'] },
  { id: 'market', title: 'Market Analysis', icon: BarChart3, fields: ['targetAudience', 'competitors', 'opportunity'] },
  { id: 'strategy', title: 'Strategy', icon: Target, fields: ['marketing', 'sales', 'branding'] },
  { id: 'operations', title: 'Operations', icon: Settings, fields: ['team', 'tools', 'logistics', 'techStack'] },
  { id: 'financials', title: 'Financials', icon: DollarSign, fields: ['startupCosts', 'revenueStreams', 'forecast'] },
];

const Discovery = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi! I'm your AI business coach. Let's create your business plan together. I'll ask you questions and build your plan in real-time as we chat.", isAI: true },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [businessPlan, setBusinessPlan] = useState<BusinessPlan>({
    title: "",
    tagline: "",
    vision: "",
    founders: "",
    mission: "",
    businessModel: "",
    products: "",
    pricing: "",
    targetAudience: "",
    competitors: "",
    opportunity: "",
    marketing: "",
    sales: "",
    branding: "",
    team: "",
    tools: "",
    logistics: "",
    techStack: "",
    startupCosts: "",
    revenueStreams: "",
    forecast: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isStarted) {
      const timer = setTimeout(() => {
        setMessages(prev => [...prev, { id: 2, text: questions[0], isAI: true }]);
        setIsStarted(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isStarted]);

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const completedSections = planSections.filter(section => 
    section.fields.some(field => businessPlan[field as keyof BusinessPlan])
  ).length;

  const addTypingMessage = () => {
    const typingMessage: Message = {
      id: Date.now(),
      text: "",
      isAI: true,
      isTyping: true,
    };
    setMessages(prev => [...prev, typingMessage]);
    return typingMessage.id;
  };

  const removeTypingMessage = (id: number) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  };

  const updateBusinessPlan = (userResponse: string, questionIndex: number) => {
    setBusinessPlan(prev => {
      const updated = { ...prev };
      
      // Simple mapping based on question index
      switch (questionIndex) {
        case 0: // Business idea
          updated.title = userResponse.split(' ').slice(0, 3).join(' ') + " Business";
          updated.vision = userResponse;
          updated.products = userResponse;
          break;
        case 1: // Budget
          updated.startupCosts = userResponse;
          updated.forecast = `Based on ${userResponse} budget`;
          break;
        case 2: // Target customer
          updated.targetAudience = userResponse;
          updated.marketing = `Target ${userResponse}`;
          break;
        case 3: // Sales plan
          updated.sales = userResponse;
          updated.businessModel = userResponse;
          break;
        case 4: // Experience
          updated.founders = userResponse;
          updated.team = userResponse;
          break;
        case 5: // Revenue streams
          updated.revenueStreams = userResponse;
          break;
        case 6: // Concerns
          updated.mission = `Address concerns about ${userResponse}`;
          break;
      }
      
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: currentInput,
      isAI: false,
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Update business plan
    updateBusinessPlan(currentInput, currentQuestionIndex);
    
    setCurrentInput("");

    // Show typing indicator
    const typingId = addTypingMessage();

    // Add next AI question or finish
    setTimeout(() => {
      removeTypingMessage(typingId);
      
      if (currentQuestionIndex < questions.length - 1) {
        const nextQuestion: Message = {
          id: messages.length + 3,
          text: questions[currentQuestionIndex + 1],
          isAI: true,
        };
        setMessages(prev => [...prev, nextQuestion]);
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        // All questions answered - show summary
        const summaryText = "Excellent! I've created a comprehensive business plan based on our conversation. You can review and edit it on the right, then export it or proceed to evaluation.";
        
        const finalMessage: Message = {
          id: messages.length + 3,
          text: summaryText,
          isAI: true,
        };
        setMessages(prev => [...prev, finalMessage]);
      }
    }, 1500);
  };

  const handleExportPDF = () => {
    // Placeholder for PDF export
    alert("PDF export feature coming soon!");
  };

  const handleSaveDraft = () => {
    // Placeholder for save draft
    alert("Draft saved successfully!");
  };

  const handleProceedToEvaluation = () => {
    navigate("/analysis");
  };

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header */}
      <div className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                AI Business Plan Builder
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Chat with AI • {completedSections}/{planSections.length} sections complete
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={handleSaveDraft}>
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button variant="outline" onClick={handleExportPDF}>
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              {completedSections >= 4 && (
                <Button variant="hero" onClick={handleProceedToEvaluation}>
                  Get AI Evaluation
                </Button>
              )}
            </div>
          </div>
          <Progress value={(completedSections / planSections.length) * 100} className="h-2 mt-4" />
        </div>
      </div>

      {/* Split View */}
      <div className="max-w-7xl mx-auto flex h-[calc(100vh-140px)]">
        {/* Left Panel - AI Chat */}
        <div className="w-1/2 border-r border-border flex flex-col">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">AI Chat</h2>
              <div className="text-sm text-muted-foreground bg-muted rounded-full px-3 py-1">
                Question {Math.min(currentQuestionIndex + 1, questions.length)} of {questions.length}
              </div>
            </div>
          </div>

          <div className="flex-1 px-6 pb-6 overflow-y-auto space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isAI ? "justify-start" : "justify-end"} animate-fade-in`}
              >
                <div
                  className={`flex items-end space-x-3 max-w-[85%] ${
                    message.isAI ? "flex-row" : "flex-row-reverse space-x-reverse"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm flex-shrink-0 ${
                      message.isAI 
                        ? "bg-gradient-primary text-primary-foreground" 
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {message.isAI ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                  </div>
                  <Card
                    className={`shadow-sm transition-all duration-300 ${
                      message.isAI
                        ? "bg-gradient-primary text-primary-foreground border-primary/20"
                        : "bg-background text-foreground border-border"
                    }`}
                  >
                    <CardContent className="p-4">
                      {message.isTyping ? (
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                          <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                        </div>
                      ) : (
                        <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          {currentQuestionIndex < questions.length && (
            <div className="p-6 border-t border-border bg-background/50">
              <form onSubmit={handleSubmit} className="flex space-x-3">
                <div className="flex-1">
                  <Input
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    placeholder="Type your response..."
                    className="h-10 text-sm"
                  />
                </div>
                <Button 
                  type="submit" 
                  variant="hero" 
                  size="sm"
                  className="h-10 w-10 rounded-full p-0"
                  disabled={!currentInput.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          )}
        </div>

        {/* Right Panel - Business Plan Builder */}
        <div className="w-1/2 flex flex-col">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-semibold">Your Business Plan</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Auto-populated from our conversation
            </p>
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            <Accordion type="multiple" className="space-y-4">
              {planSections.map((section) => {
                const hasContent = section.fields.some(field => businessPlan[field as keyof BusinessPlan]);
                const IconComponent = section.icon;
                
                return (
                  <AccordionItem key={section.id} value={section.id} className="border border-border rounded-lg">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          hasContent ? 'bg-gradient-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                        }`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium">{section.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {hasContent ? 'Content added' : 'Waiting for content...'}
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="space-y-3">
                        {section.fields.map((field) => {
                          const value = businessPlan[field as keyof BusinessPlan];
                          return (
                            <div key={field} className="space-y-1">
                              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                {field.replace(/([A-Z])/g, ' $1').trim()}
                              </label>
                              <div className={`p-3 rounded border text-sm ${
                                value ? 'bg-background border-border' : 'bg-muted/50 border-muted text-muted-foreground'
                              }`}>
                                {value || 'This will be filled as we chat...'}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discovery;