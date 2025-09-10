import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Bot, User, Send } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isAI: boolean;
  isTyping?: boolean;
}

const questions = [
  "What's your starting budget for this business?",
  "Who is your target customer? Describe them in detail.",
  "How do you plan to sell your products/services?",
  "What experience do you have in this industry?",
  "What's your biggest concern about starting this business?",
];

const Discovery = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi! I'm your AI business coach. Let's discover what makes your business unique. I'll ask you a few questions to understand your vision better.", isAI: true },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
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
        const summaryText = "Perfect! I have all the information I need. Here's what I learned about your business:\n\n• Your target market and budget\n• Your sales strategy and experience\n• Your main concerns and goals\n\nLet me analyze your responses and create your business score...";
        
        const finalMessage: Message = {
          id: messages.length + 3,
          text: summaryText,
          isAI: true,
        };
        setMessages(prev => [...prev, finalMessage]);
        
        setTimeout(() => {
          navigate("/analysis");
        }, 3000);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-muted/20 p-4">
      <div className="max-w-3xl mx-auto pt-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AI Discovery
            </h1>
            <div className="text-sm text-muted-foreground bg-background rounded-full px-4 py-2 shadow-sm">
              Step {Math.min(currentQuestionIndex + 1, questions.length)} of {questions.length}
            </div>
          </div>
          <Progress value={progress} className="h-3 bg-muted" />
        </div>

        <div className="space-y-6 mb-8 max-h-[60vh] overflow-y-auto pr-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isAI ? "justify-start" : "justify-end"} animate-fade-in`}
            >
              <div
                className={`flex items-start space-x-4 max-w-[85%] ${
                  message.isAI ? "flex-row" : "flex-row-reverse space-x-reverse"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${
                    message.isAI 
                      ? "bg-gradient-primary text-primary-foreground" 
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {message.isAI ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </div>
                <Card
                  className={`shadow-card transition-all duration-300 ${
                    message.isAI
                      ? "bg-gradient-primary text-primary-foreground border-primary/20"
                      : "bg-background text-foreground border-border hover:shadow-card"
                  }`}
                >
                  <CardContent className="p-5">
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

        {currentQuestionIndex < questions.length && (
          <div className="sticky bottom-0 bg-background/80 backdrop-blur-sm border-t border-border p-6 -mx-4">
            <form onSubmit={handleSubmit} className="flex space-x-4 max-w-3xl mx-auto">
              <div className="flex-1 relative">
                <Input
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  placeholder="Type your response..."
                  className="pr-12 h-12 text-base border-2 focus:border-primary transition-colors"
                />
              </div>
              <Button 
                type="submit" 
                variant="hero" 
                size="lg"
                className="h-12 w-12 rounded-full p-0 shadow-glow"
                disabled={!currentInput.trim()}
              >
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discovery;