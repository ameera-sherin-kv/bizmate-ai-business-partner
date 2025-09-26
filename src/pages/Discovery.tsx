import { useState, useEffect, useRef } from "react";
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
  options?: string[];
  suggestions?: { type: string; items: string[] };
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

const conversationFlow = [
  {
    question: "Welcome! Let's start by setting up your business. What's your business name?",
    type: "text",
    field: "title"
  },
  {
    question: "What's your vision for this business? Describe what you want to achieve.",
    type: "text",
    field: "vision"
  },
  {
    question: "Who are the founders behind this business?",
    type: "text", 
    field: "founders"
  },
  {
    question: "What's your mission? How will you make a difference?",
    type: "text",
    field: "mission"
  },
  {
    question: "What's your business model?",
    type: "options",
    options: ["D2C (Direct to Consumer)", "B2B (Business to Business)", "D2C + B2B (Both)", "Marketplace", "Subscription", "Franchise"],
    field: "businessModel"
  },
  {
    question: "", // This will be dynamically generated
    type: "tagline-suggestions",
    field: "tagline"
  },
  {
    question: "What products or services will you offer?",
    type: "text",
    field: "products"
  },
  {
    question: "What's your pricing strategy?",
    type: "text",
    field: "pricing"
  },
  {
    question: "Who's your target audience?",
    type: "options",
    options: ["Millennials & Gen Z", "Eco-conscious consumers", "Budget-conscious families", "Premium buyers", "Small businesses", "Urban professionals"],
    field: "targetAudience"
  },
  {
    question: "Who are your main competitors?",
    type: "text",
    field: "competitors"
  },
  {
    question: "What market opportunity do you see?",
    type: "text",
    field: "opportunity"
  },
  {
    question: "How will you market your business?",
    type: "options",
    options: ["Social media marketing", "Influencer partnerships", "Content marketing", "Paid advertising", "SEO/Organic", "Word of mouth"],
    field: "marketing"
  },
  {
    question: "How will you handle sales?",
    type: "options",
    options: ["Shopify store", "Amazon/Marketplaces", "Physical retail", "Direct sales", "Social commerce", "Wholesale partnerships"],
    field: "sales"
  },
  {
    question: "What's your branding approach?",
    type: "options",
    options: ["Minimalist & clean", "Bold & vibrant", "Earth-tones & natural", "Premium & luxury", "Playful & youthful", "Traditional & heritage"],
    field: "branding"
  },
  {
    question: "What tools will you use to run your business?",
    type: "text",
    field: "tools"
  },
  {
    question: "Who's on your team?",
    type: "text",
    field: "team"
  },
  {
    question: "How will you handle logistics and fulfillment?",
    type: "text",
    field: "logistics"
  },
  {
    question: "What's your tech stack?",
    type: "text",
    field: "techStack"
  },
  {
    question: "What are your estimated startup costs?",
    type: "options",
    options: ["Under ₹5 lakhs", "₹5-15 lakhs", "₹15-50 lakhs", "₹50 lakhs-1 crore", "Over ₹1 crore"],
    field: "startupCosts"
  },
  {
    question: "What are your revenue streams?",
    type: "text",
    field: "revenueStreams"
  },
  {
    question: "What's your financial forecast?",
    type: "text",
    field: "forecast"
  }
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
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isStarted) {
      const timer = setTimeout(() => {
        const firstQuestion = conversationFlow[0];
        setMessages(prev => [...prev, { 
          id: 2, 
          text: firstQuestion.question, 
          isAI: true,
          options: firstQuestion.options
        }]);
        setIsStarted(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isStarted]);

  const progress = ((currentQuestionIndex + 1) / conversationFlow.length) * 100;
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

  const generateSuggestions = (userResponse: string, questionIndex: number, businessPlan: BusinessPlan) => {
    // Generate AI suggestions based on user response
    if (conversationFlow[questionIndex]?.field === "tagline") {
      // Generate tagline suggestions based on vision and mission
      const taglines = [
        "Sustainable Style, Everyday Comfort",
        "Eco-Friendly Excellence",
        "Where Tradition Meets Tomorrow",
        "Conscious Comfort, Timeless Style",
        "Naturally Yours"
      ];
      return { taglines };
    }
    return null;
  };

  const updateBusinessPlan = (userResponse: string, questionIndex: number) => {
    setBusinessPlan(prev => {
      const updated = { ...prev };
      const currentQuestion = conversationFlow[questionIndex];
      
      // Update the specific field
      if (currentQuestion.field && currentQuestion.field in updated) {
        updated[currentQuestion.field as keyof BusinessPlan] = userResponse;
      }
      
      return updated;
    });

    // Auto-expand relevant sections
    const sectionToExpand = planSections.find(section => 
      section.fields.includes(conversationFlow[questionIndex].field)
    );
    if (sectionToExpand && !openAccordions.includes(sectionToExpand.id)) {
      setOpenAccordions(prev => [...prev, sectionToExpand.id]);
    }
  };

  const handleOptionSelect = (option: string) => {
    setCurrentInput(option);
    handleSubmit(null, option);
  };

  const handleSuggestionSelect = (suggestion: string, type: string) => {
    setBusinessPlan(prev => ({
      ...prev,
      [type]: suggestion
    }));
    
    // Auto-expand relevant sections
    const sectionToExpand = planSections.find(section => 
      section.fields.includes(type)
    );
    if (sectionToExpand && !openAccordions.includes(sectionToExpand.id)) {
      setOpenAccordions(prev => [...prev, sectionToExpand.id]);
    }

    // Show typing indicator and proceed to next question
    const typingId = addTypingMessage();
    
    setTimeout(() => {
      removeTypingMessage(typingId);
      
      if (currentQuestionIndex < conversationFlow.length - 1) {
        const nextQuestionData = conversationFlow[currentQuestionIndex + 1];
        const nextQuestion: Message = {
          id: messages.length + 3,
          text: nextQuestionData.question,
          isAI: true,
          options: nextQuestionData.options
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

  const handleSubmit = (e?: React.FormEvent | null, optionValue?: string) => {
    if (e) e.preventDefault();
    const inputValue = optionValue || currentInput;
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isAI: false,
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Update business plan
    updateBusinessPlan(inputValue, currentQuestionIndex);
    
    setCurrentInput("");

    // Show typing indicator
    const typingId = addTypingMessage();

    // Add next AI question or finish
    setTimeout(() => {
      removeTypingMessage(typingId);
      
      if (currentQuestionIndex < conversationFlow.length - 1) {
        const nextQuestionData = conversationFlow[currentQuestionIndex + 1];
        
        // Check if we should show tagline suggestions
        if (nextQuestionData.field === "tagline") {
          const suggestions = generateSuggestions(inputValue, currentQuestionIndex + 1, businessPlan);
          if (suggestions) {
            const suggestionMessage: Message = {
              id: messages.length + 3,
              text: "Based on your vision and mission, here are some tagline suggestions. Please select one:",
              isAI: true,
              suggestions: { type: "tagline", items: suggestions.taglines }
            };
            setMessages(prev => [...prev, suggestionMessage]);
            setCurrentQuestionIndex(prev => prev + 1);
            return;
          }
        }
        
        const nextQuestion: Message = {
          id: messages.length + 3,
          text: nextQuestionData.question,
          isAI: true,
          options: nextQuestionData.options
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
    alert("PDF export feature coming soon!");
  };

  const handleSaveDraft = () => {
    alert("Draft saved successfully!");
  };

  const handleProceedToEvaluation = () => {
    navigate("/analysis", { state: { fromDiscovery: true } });
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
                  View AI Report
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
                Question {Math.min(currentQuestionIndex + 1, conversationFlow.length)} of {conversationFlow.length}
              </div>
            </div>
          </div>

          <div className="flex-1 px-6 pb-6 overflow-y-auto space-y-6">
            {messages.map((message) => (
              <div key={message.id}>
                <div
                  className={`flex ${message.isAI ? "justify-start" : "justify-end"} animate-fade-in`}
                >
                  <div
                    className={`flex items-start space-x-3 max-w-[85%] ${
                      message.isAI ? "flex-row" : "flex-row-reverse space-x-reverse"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm flex-shrink-0 ${
                        message.isAI 
                          ? "bg-gradient-primary text-primary-foreground" 
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {message.isAI ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
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

                {/* Options */}
                {message.options && message.isAI && (
                  <div className="flex flex-wrap gap-2 mt-3 ml-11">
                    {message.options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleOptionSelect(option)}
                        className="text-xs hover:bg-primary hover:text-primary-foreground"
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                )}

                {/* Suggestions */}
                {message.suggestions && message.isAI && (
                  <div className="mt-3 ml-11 space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {message.suggestions.items.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="secondary"
                          size="sm"
                          onClick={() => handleSuggestionSelect(suggestion, message.suggestions?.type || "tagline")}
                          className="text-xs"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          {currentQuestionIndex < conversationFlow.length && (
            <div className="p-6 border-t border-border bg-background/50 sticky bottom-0">
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
            <Accordion type="multiple" value={openAccordions} onValueChange={setOpenAccordions} className="space-y-4">
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