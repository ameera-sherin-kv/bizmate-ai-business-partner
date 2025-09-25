import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  FileText, 
  Sparkles, 
  BarChart3, 
  Download,
  ArrowRight,
  CheckCircle,
  Zap,
  TrendingUp,
  Play,
  Pause
} from 'lucide-react';

interface DemoStep {
  id: number;
  title: string;
  subtitle: string;
  duration: number;
  component: React.ComponentType<{ isActive: boolean; progress: number }>;
}

const rawFiles = [
  { name: 'Q3_invoices.pdf', type: 'Revenue', color: 'bg-green-500' },
  { name: 'payroll_sept.xlsx', type: 'Payroll', color: 'bg-blue-500' },
  { name: 'bank_statement.pdf', type: 'Expenses', color: 'bg-orange-500' },
  { name: 'receipts_misc.jpg', type: 'Marketing Spend', color: 'bg-purple-500' }
];

const messyData = [
  ['Employee Pay', '$5,200', 'Sept'],
  ['RENT PAYMENT', '$2,800', '9/1'],
  ['Marketing - FB Ads', '$850', 'September'],
  ['Salary - John', '$3,200', '09/15']
];

const cleanData = [
  ['Payroll', '$5,200', '2024-09'],
  ['Rent', '$2,800', '2024-09'],
  ['Marketing', '$850', '2024-09'],
  ['Payroll', '$3,200', '2024-09']
];

// Step 1: Raw Data Upload
const UploadStep = ({ isActive, progress }: { isActive: boolean; progress: number }) => {
  const [taggedFiles, setTaggedFiles] = useState<string[]>([]);

  useEffect(() => {
    if (isActive && progress > 20) {
      const timer = setInterval(() => {
        setTaggedFiles(prev => {
          if (prev.length < rawFiles.length) {
            return [...prev, rawFiles[prev.length].name];
          }
          return prev;
        });
      }, 800);
      return () => clearInterval(timer);
    }
  }, [isActive, progress]);

  return (
    <div className="h-80 flex items-center justify-center bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg border-2 border-dashed border-muted-foreground/20">
      <div className="text-center space-y-6">
        <div className="grid grid-cols-2 gap-4 max-w-md">
          {rawFiles.map((file, index) => (
            <div
              key={file.name}
              className={`p-4 bg-card border rounded-lg transition-all duration-500 ${
                taggedFiles.includes(file.name) 
                  ? 'scale-105 shadow-md border-primary' 
                  : 'hover:shadow-sm'
              }`}
            >
              <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-xs font-medium truncate">{file.name}</p>
              {taggedFiles.includes(file.name) && (
                <Badge className={`mt-2 text-xs ${file.color} text-white animate-fade-in`}>
                  {file.type}
                </Badge>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Upload className="w-4 h-4" />
          <span>AI automatically tags and categorizes files</span>
          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
        </div>
      </div>
    </div>
  );
};

// Step 2: Cleaning & Normalization
const CleaningStep = ({ isActive, progress }: { isActive: boolean; progress: number }) => {
  const [showClean, setShowClean] = useState(false);

  useEffect(() => {
    if (isActive && progress > 50) {
      const timer = setTimeout(() => setShowClean(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [isActive, progress]);

  return (
    <div className="h-80 flex items-center justify-center space-x-8">
      {/* Messy Data */}
      <div className={`transition-all duration-1000 ${showClean ? 'opacity-50 scale-95' : 'opacity-100'}`}>
        <h4 className="text-sm font-medium mb-3 text-destructive">Raw Data</h4>
        <div className="space-y-2">
          {messyData.map((row, index) => (
            <div key={index} className="flex gap-2 text-xs p-2 bg-destructive/10 border border-destructive/20 rounded">
              <span className="w-20 truncate font-mono">{row[0]}</span>
              <span className="w-16 font-mono">{row[1]}</span>
              <span className="w-16 font-mono text-muted-foreground">{row[2]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Arrow */}
      <div className="flex flex-col items-center">
        <ArrowRight className={`w-6 h-6 text-primary transition-all duration-500 ${
          showClean ? 'animate-pulse' : ''
        }`} />
        <Zap className="w-4 h-4 text-primary mt-2" />
      </div>

      {/* Clean Data */}
      <div className={`transition-all duration-1000 ${showClean ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <h4 className="text-sm font-medium mb-3 text-green-600">Normalized</h4>
        <div className="space-y-2">
          {cleanData.map((row, index) => (
            <div key={index} className="flex gap-2 text-xs p-2 bg-green-50 border border-green-200 rounded">
              <span className="w-20 font-mono font-medium">{row[0]}</span>
              <span className="w-16 font-mono">{row[1]}</span>
              <span className="w-16 font-mono text-muted-foreground">{row[2]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Step 3: Categorization & Mapping
const CategorizationStep = ({ isActive, progress }: { isActive: boolean; progress: number }) => {
  const [showReports, setShowReports] = useState(false);

  useEffect(() => {
    if (isActive && progress > 30) {
      const timer = setTimeout(() => setShowReports(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [isActive, progress]);

  const categories = [
    { name: 'Payroll', amount: '$8,400', color: 'bg-blue-500' },
    { name: 'Rent', amount: '$2,800', color: 'bg-orange-500' },
    { name: 'Marketing', amount: '$850', color: 'bg-purple-500' }
  ];

  return (
    <div className="h-80 flex items-center justify-center">
      <div className="grid grid-cols-3 gap-8 items-center">
        {/* Input Data */}
        <div className="text-center">
          <h4 className="text-sm font-medium mb-4">Raw Transactions</h4>
          <div className="space-y-2">
            {cleanData.map((row, index) => (
              <div key={index} className="text-xs p-2 bg-muted/50 rounded border">
                {row[0]}
              </div>
            ))}
          </div>
        </div>

        {/* AI Pipeline */}
        <div className="text-center">
          <div className="bg-gradient-to-b from-primary to-primary/80 p-6 rounded-full mx-auto w-24 h-24 flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-white animate-spin" />
          </div>
          <p className="text-sm font-medium">AI Categorization</p>
        </div>

        {/* Output Categories */}
        <div className={`transition-all duration-1000 ${showReports ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <h4 className="text-sm font-medium mb-4">Financial Reports</h4>
          <div className="space-y-2">
            {categories.map((cat, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-card border rounded">
                <div className={`w-3 h-3 rounded-full ${cat.color}`} />
                <span className="text-xs font-medium flex-1">{cat.name}</span>
                <span className="text-xs font-mono">{cat.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Step 4: Forecasting & Simulation
const ForecastingStep = ({ isActive, progress }: { isActive: boolean; progress: number }) => {
  const [sliderValue, setSliderValue] = useState(20);
  const [showGraphs, setShowGraphs] = useState(false);

  useEffect(() => {
    if (isActive && progress > 20) {
      setShowGraphs(true);
      const interval = setInterval(() => {
        setSliderValue(prev => prev === 20 ? 40 : 20);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isActive, progress]);

  return (
    <div className="h-80 flex items-center justify-center">
      <div className="w-full max-w-lg space-y-6">
        {/* Graph Area */}
        <div className={`bg-card border rounded-lg p-4 transition-all duration-1000 ${
          showGraphs ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium">Cash Flow Projection</h4>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
          
          {/* Simulated Graph */}
          <div className="h-32 bg-gradient-to-r from-green-100 to-blue-100 rounded relative overflow-hidden">
            <div 
              className="absolute bottom-0 left-0 bg-gradient-to-t from-green-500 to-green-300 transition-all duration-1000"
              style={{ 
                width: '100%', 
                height: `${40 + sliderValue}%`,
                clipPath: 'polygon(0% 100%, 10% 90%, 25% 85%, 40% 75%, 60% 65%, 80% 55%, 100% 45%, 100% 100%)'
              }}
            />
          </div>
        </div>

        {/* Interactive Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Rent Adjustment</span>
            <Badge variant="outline">+{sliderValue}%</Badge>
          </div>
          <div className="bg-muted h-2 rounded-full overflow-hidden">
            <div 
              className="bg-primary h-full transition-all duration-1000"
              style={{ width: `${sliderValue * 2.5}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Step 5: Export to Docs
const ExportStep = ({ isActive, progress }: { isActive: boolean; progress: number }) => {
  const [showDocument, setShowDocument] = useState(false);

  useEffect(() => {
    if (isActive && progress > 30) {
      const timer = setTimeout(() => setShowDocument(true), 800);
      return () => clearTimeout(timer);
    }
  }, [isActive, progress]);

  return (
    <div className="h-80 flex items-center justify-center">
      <div className="text-center space-y-6">
        <Button 
          size="lg" 
          className="animate-pulse"
          disabled
        >
          <Download className="w-4 h-4 mr-2" />
          Generate Financial Model
        </Button>

        <div className={`transition-all duration-1000 ${
          showDocument ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="bg-card border-2 border-primary shadow-lg rounded-lg p-6 max-w-sm mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <span className="font-medium">Financial_Model_2024.pdf</span>
            </div>
            
            <div className="space-y-3 text-left">
              <div className="flex justify-between text-sm">
                <span>Revenue Forecast</span>
                <span className="font-mono">$127K</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Operating Expenses</span>
                <span className="font-mono">$89K</span>
              </div>
              <div className="flex justify-between text-sm font-medium text-green-600">
                <span>Net Profit</span>
                <span className="font-mono">$38K</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="flex gap-2">
                <Badge variant="secondary" className="text-xs">P&L Statement</Badge>
                <Badge variant="secondary" className="text-xs">Cash Flow</Badge>
                <Badge variant="secondary" className="text-xs">Projections</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const demoSteps: DemoStep[] = [
  {
    id: 1,
    title: 'Ingest Any Financial Data',
    subtitle: 'Upload PDFs, Excel sheets, bank statements, and receipts',
    duration: 4000,
    component: UploadStep
  },
  {
    id: 2,
    title: 'Clean & Normalize',
    subtitle: 'AI standardizes inconsistent data formats automatically',
    duration: 3500,
    component: CleaningStep
  },
  {
    id: 3,
    title: 'Auto-Categorize into Reports',
    subtitle: 'Generate P&L, Balance Sheet, and Cash Flow statements',
    duration: 4000,
    component: CategorizationStep
  },
  {
    id: 4,
    title: 'Forecast & Simulate Scenarios',
    subtitle: 'Interactive "what-if" analysis with real-time updates',
    duration: 4500,
    component: ForecastingStep
  },
  {
    id: 5,
    title: 'Generate Investor-Ready Financial Models',
    subtitle: 'Export polished documents with projections and insights',
    duration: 3000,
    component: ExportStep
  }
];

export const ProductDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          setCurrentStep(current => {
            const nextStep = (current + 1) % demoSteps.length;
            return nextStep;
          });
          return 0;
        }
        return newProgress;
      });
    }, demoSteps[currentStep].duration / 50);

    return () => clearInterval(interval);
  }, [currentStep, isPlaying]);

  const startDemo = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    setProgress(0);
  };

  const pauseDemo = () => {
    setIsPlaying(false);
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    setProgress(0);
    setIsPlaying(false);
  };

  const CurrentStepComponent = demoSteps[currentStep].component;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-2">
            From Raw Data to Financial Intelligence
          </h2>
          <p className="text-muted-foreground">
            Watch BizMate AI transform unstructured financial data into investor-ready models
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-6">
          {demoSteps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => goToStep(index)}
              className={`flex flex-col items-center space-y-2 p-2 rounded-lg transition-all ${
                index === currentStep 
                  ? 'bg-primary/10 text-primary' 
                  : index < currentStep 
                    ? 'text-green-600' 
                    : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                index === currentStep 
                  ? 'bg-primary text-primary-foreground' 
                  : index < currentStep 
                    ? 'bg-green-500 text-white' 
                    : 'bg-muted text-muted-foreground'
              }`}>
                {index < currentStep ? <CheckCircle className="w-4 h-4" /> : index + 1}
              </div>
              <span className="text-xs font-medium text-center max-w-20">
                Step {index + 1}
              </span>
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold">{demoSteps[currentStep].title}</h3>
            <div className="flex gap-2">
              {isPlaying ? (
                <Button variant="outline" size="sm" onClick={pauseDemo}>
                  <Pause className="w-4 h-4" />
                </Button>
              ) : (
                <Button variant="outline" size="sm" onClick={startDemo}>
                  <Play className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
          <p className="text-muted-foreground mb-4">{demoSteps[currentStep].subtitle}</p>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Demo Content */}
        <div className="border rounded-lg">
          <CurrentStepComponent isActive={true} progress={progress} />
        </div>

        {/* Controls */}
        <div className="flex justify-center mt-6">
          <Button onClick={startDemo} size="lg" className="min-w-32">
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause Demo
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                {progress > 0 ? 'Resume Demo' : 'Start Demo'}
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};