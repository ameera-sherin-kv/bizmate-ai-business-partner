import { useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
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
  Trash2,
  Edit3,
  Plus
} from 'lucide-react';

interface DemoStep {
  id: number;
  title: string;
  subtitle: string;
  component: React.ComponentType<{ onNext: () => void; onPrevious: () => void; isFirst: boolean; isLast: boolean }>;
}

const rawFiles = [
  { name: 'Q3_invoices.pdf', type: 'Revenue', color: 'bg-green-500' },
  { name: 'payroll_sept.xlsx', type: 'Payroll', color: 'bg-blue-500' },
  { name: 'bank_statement.pdf', type: 'Expenses', color: 'bg-orange-500' },
  { name: 'receipts_misc.jpg', type: 'Marketing Spend', color: 'bg-purple-500' }
];

// Step 1: Interactive File Upload
const UploadStep = ({ onNext, isLast }: { onNext: () => void; onPrevious: () => void; isFirst: boolean; isLast: boolean }) => {
  const [uploadedFiles, setUploadedFiles] = useState<typeof rawFiles>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = useCallback(() => {
    setUploadedFiles(rawFiles);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload();
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div 
        className={`h-64 flex items-center justify-center bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg border-2 border-dashed transition-all cursor-pointer ${
          isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/20 hover:border-muted-foreground/40'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleFileUpload}
      >
        <div className="text-center space-y-4">
          <Upload className={`w-12 h-12 mx-auto transition-colors ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
          <div>
            <p className="text-lg font-medium">Drop files here or click to upload</p>
            <p className="text-sm text-muted-foreground">PDF invoices, Excel sheets, bank statements, receipts</p>
          </div>
        </div>
      </div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Uploaded Files ({uploadedFiles.length})
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="p-4 bg-card border rounded-lg group hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-2">
                  <FileText className="w-6 h-6 text-muted-foreground" />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(index);
                    }}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
                <p className="text-sm font-medium truncate mb-2">{file.name}</p>
                <Badge className={`text-xs ${file.color} text-white`}>
                  {file.type}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end">
        <Button 
          onClick={onNext} 
          disabled={uploadedFiles.length === 0}
          className="min-w-32"
        >
          Process Files
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

const messyData = [
  { id: 1, original: 'Employee Pay', amount: '$5,200', date: 'Sept', cleaned: 'Payroll', cleanedDate: '2024-09' },
  { id: 2, original: 'RENT PAYMENT', amount: '$2,800', date: '9/1', cleaned: 'Rent', cleanedDate: '2024-09' },
  { id: 3, original: 'Marketing - FB Ads', amount: '$850', date: 'September', cleaned: 'Marketing', cleanedDate: '2024-09' },
  { id: 4, original: 'Salary - John', amount: '$3,200', date: '09/15', cleaned: 'Payroll', cleanedDate: '2024-09' }
];

// Step 2: Interactive Data Cleaning
const CleaningStep = ({ onNext, onPrevious }: { onNext: () => void; onPrevious: () => void; isFirst: boolean; isLast: boolean }) => {
  const [cleanedData, setCleanedData] = useState(messyData);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const startEdit = (id: number, currentValue: string) => {
    setEditingId(id);
    setEditValue(currentValue);
  };

  const saveEdit = (id: number) => {
    setCleanedData(prev => prev.map(item => 
      item.id === id ? { ...item, cleaned: editValue } : item
    ));
    setEditingId(null);
    setEditValue('');
  };

  const autoClean = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setCleanedData(prev => prev.map(item => ({ ...item, cleaned: item.cleaned })));
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Data Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">Raw Financial Data</h4>
          <Button 
            onClick={autoClean} 
            disabled={isProcessing}
            variant="outline"
            size="sm"
          >
            {isProcessing ? (
              <>
                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                Cleaning...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Auto-Clean All
              </>
            )}
          </Button>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="grid grid-cols-5 gap-4 p-3 bg-muted font-medium text-sm">
            <span>Original</span>
            <span>Amount</span>
            <span>Date</span>
            <span>Cleaned</span>
            <span>Actions</span>
          </div>
          
          {cleanedData.map((row) => (
            <div key={row.id} className="grid grid-cols-5 gap-4 p-3 border-t hover:bg-muted/50">
              <span className="text-sm text-destructive font-mono">{row.original}</span>
              <span className="text-sm font-mono">{row.amount}</span>
              <span className="text-sm font-mono text-muted-foreground">{row.date}</span>
              <div className="flex items-center gap-2">
                {editingId === row.id ? (
                  <Input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="h-6 text-xs"
                    onKeyDown={(e) => e.key === 'Enter' && saveEdit(row.id)}
                    autoFocus
                  />
                ) : (
                  <span className="text-sm font-medium text-green-600">{row.cleaned}</span>
                )}
              </div>
              <div className="flex gap-1">
                {editingId === row.id ? (
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-6 w-6 p-0"
                    onClick={() => saveEdit(row.id)}
                  >
                    <CheckCircle className="w-3 h-3" />
                  </Button>
                ) : (
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-6 w-6 p-0"
                    onClick={() => startEdit(row.id, row.cleaned)}
                  >
                    <Edit3 className="w-3 h-3" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          Back
        </Button>
        <Button onClick={onNext}>
          Categorize Data
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

// Step 3: Interactive Categorization
const CategorizationStep = ({ onNext, onPrevious }: { onNext: () => void; onPrevious: () => void; isFirst: boolean; isLast: boolean }) => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Payroll', amount: 8400, transactions: 2, color: 'bg-blue-500' },
    { id: 2, name: 'Rent', amount: 2800, transactions: 1, color: 'bg-orange-500' },
    { id: 3, name: 'Marketing', amount: 850, transactions: 1, color: 'bg-purple-500' }
  ]);

  const [newCategoryName, setNewCategoryName] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);

  const addCategory = () => {
    if (newCategoryName.trim()) {
      const colors = ['bg-green-500', 'bg-red-500', 'bg-yellow-500', 'bg-pink-500'];
      setCategories(prev => [...prev, {
        id: Date.now(),
        name: newCategoryName.trim(),
        amount: 0,
        transactions: 0,
        color: colors[Math.floor(Math.random() * colors.length)]
      }]);
      setNewCategoryName('');
      setShowAddCategory(false);
    }
  };

  const removeCategory = (id: number) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
  };

  const totalAmount = categories.reduce((sum, cat) => sum + cat.amount, 0);

  return (
    <div className="space-y-6">
      {/* Categories Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Financial Categories</h4>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowAddCategory(!showAddCategory)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </div>

          {showAddCategory && (
            <div className="flex gap-2 p-3 bg-muted/50 rounded-lg">
              <Input
                placeholder="Category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addCategory()}
                className="flex-1"
              />
              <Button size="sm" onClick={addCategory}>Add</Button>
            </div>
          )}

          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center justify-between p-4 bg-card border rounded-lg group">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${category.color}`} />
                  <div>
                    <span className="font-medium">{category.name}</span>
                    <p className="text-xs text-muted-foreground">{category.transactions} transactions</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-medium">${category.amount.toLocaleString()}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                    onClick={() => removeCategory(category.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-4">
          <h4 className="font-medium">Financial Summary</h4>
          <div className="p-4 bg-card border rounded-lg space-y-3">
            <div className="flex justify-between text-sm">
              <span>Total Expenses</span>
              <span className="font-mono">${totalAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Categories</span>
              <span className="font-mono">{categories.length}</span>
            </div>
            <div className="flex justify-between text-sm font-medium text-green-600">
              <span>Ready for Reports</span>
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          Back
        </Button>
        <Button onClick={onNext}>
          Generate Forecasts
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

// Step 4: Interactive Forecasting
const ForecastingStep = ({ onNext, onPrevious }: { onNext: () => void; onPrevious: () => void; isFirst: boolean; isLast: boolean }) => {
  const [rentAdjustment, setRentAdjustment] = useState([20]);
  const [marketingBudget, setMarketingBudget] = useState([15]);
  const [revenueGrowth, setRevenueGrowth] = useState([25]);
  
  const baseValues = {
    rent: 2800,
    marketing: 850,
    revenue: 15000
  };

  const calculateProjections = () => {
    const adjustedRent = baseValues.rent * (1 + rentAdjustment[0] / 100);
    const adjustedMarketing = baseValues.marketing * (1 + marketingBudget[0] / 100);
    const adjustedRevenue = baseValues.revenue * (1 + revenueGrowth[0] / 100);
    
    return {
      rent: adjustedRent,
      marketing: adjustedMarketing,
      revenue: adjustedRevenue,
      netProfit: adjustedRevenue - adjustedRent - adjustedMarketing - 8400 // Fixed payroll
    };
  };

  const projections = calculateProjections();

  return (
    <div className="space-y-6">
      {/* Interactive Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Rent Adjustment</span>
            <Badge variant="outline">{rentAdjustment[0] > 0 ? '+' : ''}{rentAdjustment[0]}%</Badge>
          </div>
          <Slider
            value={rentAdjustment}
            onValueChange={setRentAdjustment}
            max={50}
            min={-30}
            step={5}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Current: ${projections.rent.toLocaleString()}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Marketing Budget</span>
            <Badge variant="outline">{marketingBudget[0] > 0 ? '+' : ''}{marketingBudget[0]}%</Badge>
          </div>
          <Slider
            value={marketingBudget}
            onValueChange={setMarketingBudget}
            max={100}
            min={-50}
            step={5}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Current: ${projections.marketing.toLocaleString()}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Revenue Growth</span>
            <Badge variant="outline">{revenueGrowth[0] > 0 ? '+' : ''}{revenueGrowth[0]}%</Badge>
          </div>
          <Slider
            value={revenueGrowth}
            onValueChange={setRevenueGrowth}
            max={100}
            min={-20}
            step={5}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Current: ${projections.revenue.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Financial Projections */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-card border rounded-lg">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            Monthly Projections
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Revenue</span>
              <span className="font-mono text-green-600">${projections.revenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Expenses</span>
              <span className="font-mono text-red-600">-${(projections.rent + projections.marketing + 8400).toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-medium pt-2 border-t">
              <span>Net Profit</span>
              <span className={`font-mono ${projections.netProfit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${projections.netProfit.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-card border rounded-lg">
          <h4 className="font-medium mb-3">Scenario Analysis</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Break-even Point</span>
              <span className="font-mono">Month 8</span>
            </div>
            <div className="flex justify-between">
              <span>Cash Runway</span>
              <span className="font-mono">14 months</span>
            </div>
            <div className="flex justify-between">
              <span>ROI Projection</span>
              <span className="font-mono text-green-600">285%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          Back
        </Button>
        <Button onClick={onNext}>
          Export Model
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

// Step 5: Interactive Export
const ExportStep = ({ onPrevious }: { onNext: () => void; onPrevious: () => void; isFirst: boolean; isLast: boolean }) => {
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeProjections, setIncludeProjections] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExported(true);
    }, 2000);
  };

  const exportFormats = [
    { id: 'pdf', name: 'PDF Report', icon: FileText, description: 'Professional document' },
    { id: 'excel', name: 'Excel Model', icon: BarChart3, description: 'Interactive spreadsheet' },
    { id: 'powerpoint', name: 'Presentation', icon: Sparkles, description: 'Investor pitch deck' }
  ];

  return (
    <div className="space-y-6">
      {/* Export Options */}
      <div className="space-y-4">
        <h4 className="font-medium">Choose Export Format</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {exportFormats.map((format) => {
            const Icon = format.icon;
            return (
              <div
                key={format.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedFormat === format.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-muted hover:border-muted-foreground/40'
                }`}
                onClick={() => setSelectedFormat(format.id)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{format.name}</span>
                </div>
                <p className="text-xs text-muted-foreground">{format.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Include Options */}
      <div className="space-y-3">
        <h4 className="font-medium">Include in Export</h4>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeCharts}
              onChange={(e) => setIncludeCharts(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Financial charts and graphs</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeProjections}
              onChange={(e) => setIncludeProjections(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">12-month projections and scenarios</span>
          </label>
        </div>
      </div>

      {/* Export Result */}
      {exported && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-800">Export Successful!</span>
          </div>
          <p className="text-sm text-green-700">
            Your financial model has been generated and is ready for download.
          </p>
          <Button size="sm" className="mt-3" variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download File
          </Button>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          Back
        </Button>
        <Button 
          onClick={handleExport}
          disabled={isExporting}
          className="min-w-32"
        >
          {isExporting ? (
            <>
              <Sparkles className="w-4 h-4 mr-2 animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Export Model
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

const demoSteps: DemoStep[] = [
  {
    id: 1,
    title: 'Upload Financial Data',
    subtitle: 'Drag and drop your PDFs, Excel sheets, and bank statements',
    component: UploadStep
  },
  {
    id: 2,
    title: 'Clean & Normalize Data',
    subtitle: 'Review and edit AI-cleaned financial data',
    component: CleaningStep
  },
  {
    id: 3,
    title: 'Categorize Transactions',
    subtitle: 'Organize expenses into meaningful categories',
    component: CategorizationStep
  },
  {
    id: 4,
    title: 'Create Financial Forecasts',
    subtitle: 'Adjust parameters and see real-time projections',
    component: ForecastingStep
  },
  {
    id: 5,
    title: 'Export Financial Model',
    subtitle: 'Download professional reports and presentations',
    component: ExportStep
  }
];

export const ProductDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const CurrentStepComponent = demoSteps[currentStep].component;

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardContent className="p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-2">
            Interactive Financial Intelligence Demo
          </h2>
          <p className="text-muted-foreground">
            Experience how BizMate AI transforms your financial data into actionable insights
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
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
              <span className="text-xs font-medium text-center max-w-24">
                {step.title}
              </span>
            </button>
          ))}
        </div>

        {/* Current Step */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">{demoSteps[currentStep].title}</h3>
          <p className="text-muted-foreground">{demoSteps[currentStep].subtitle}</p>
        </div>

        {/* Demo Content */}
        <div className="border rounded-lg p-6 min-h-96">
          <CurrentStepComponent 
            onNext={nextStep}
            onPrevious={previousStep}
            isFirst={currentStep === 0}
            isLast={currentStep === demoSteps.length - 1}
          />
        </div>
      </CardContent>
    </Card>
  );
};