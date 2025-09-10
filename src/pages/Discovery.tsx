import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Bot, User } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isAI: boolean;
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
    { id: 2, text: questions[0], isAI: true },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const navigate = useNavigate();

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

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

    // Add next AI question or finish
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        const nextQuestion: Message = {
          id: messages.length + 2,
          text: questions[currentQuestionIndex + 1],
          isAI: true,
        };
        setMessages(prev => [...prev, nextQuestion]);
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        // All questions answered
        const finalMessage: Message = {
          id: messages.length + 2,
          text: "Perfect! I have all the information I need. Let me analyze your responses and create your business score...",
          isAI: true,
        };
        setMessages(prev => [...prev, finalMessage]);
        
        setTimeout(() => {
          navigate("/analysis");
        }, 2000);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-primary">AI Discovery</h1>
            <span className="text-sm text-muted-foreground">
              Question {Math.min(currentQuestionIndex + 1, questions.length)} of {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isAI ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`flex items-start space-x-3 max-w-[80%] ${
                  message.isAI ? "flex-row" : "flex-row-reverse space-x-reverse"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.isAI 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {message.isAI ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>
                <Card
                  className={`${
                    message.isAI
                      ? "bg-primary/5 border-primary/20"
                      : "bg-secondary/5 border-secondary/20"
                  }`}
                >
                  <CardContent className="p-4">
                    <p className="text-foreground">{message.text}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>

        {currentQuestionIndex < questions.length && (
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <Input
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder="Type your answer here..."
              className="flex-1"
            />
            <Button type="submit" variant="hero">
              Send
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Discovery;