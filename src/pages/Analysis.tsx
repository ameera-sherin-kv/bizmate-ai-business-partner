import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUpload, UploadedFile } from "@/components/upload/FileUpload";
import { financeApi, FinanceAnalysisResult } from "@/services/financeApi";
import { useDashboardStore } from "@/store/dashboardStore";
import { Upload, TrendingUp, BarChart3, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Analysis = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setBaseData } = useDashboardStore();
  
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<FinanceAnalysisResult | null>(null);
  const [currentStep, setCurrentStep] = useState<'upload' | 'processing' | 'complete'>('upload');

  const processingMessages = [
    "Parsing your financial documents...",
    "Analyzing profit & loss patterns...",
    "Calculating sensitivity metrics...", 
    "Generating AI-powered insights...",
    "Preparing your dashboard..."
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const handleFilesUploaded = (files: UploadedFile[]) => {
    setUploadedFiles(files);
  };

  const handleAnalyze = async () => {
    const successfulFiles = uploadedFiles.filter(f => f.status === 'success');
    
    if (successfulFiles.length === 0) {
      toast({
        title: "No files to analyze",
        description: "Please upload at least one financial document first.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    setCurrentStep('processing');

    try {
      // Rotate processing messages
      const messageInterval = setInterval(() => {
        setCurrentMessageIndex(prev => (prev + 1) % processingMessages.length);
      }, 1000);

      // Upload files first
      const uploadResponses = await financeApi.uploadFiles(
        successfulFiles.map(f => f.file)
      );
      
      // Analyze the uploaded files
      const fileIds = uploadResponses.map(r => r.fileId);
      const result = await financeApi.analyzeFinancials(fileIds);
      
      clearInterval(messageInterval);
      
      // Set the base data in dashboard store
      setBaseData(result.profitLoss);
      setAnalysisResult(result);
      setCurrentStep('complete');
      
      toast({
        title: "Analysis Complete!",
        description: "Your financial dashboard is ready.",
      });

      // Auto-navigate to dashboard after 3 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);

    } catch (error) {
      console.error('Analysis failed:', error);
      toast({
        title: "Analysis Failed",
        description: "There was an error processing your files. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Processing screen
  if (isProcessing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-8">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>
          
          <h2 className="text-2xl font-bold text-primary mb-4">
            Analyzing Your Finances
          </h2>
          
          <p className="text-lg text-muted-foreground mb-6 animate-fade-in">
            {processingMessages[currentMessageIndex]}
          </p>
          
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '60%' }} />
          </div>
        </div>
      </div>
    );
  }

  // Success/Complete screen
  if (currentStep === 'complete' && analysisResult) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          
          <h2 className="text-2xl font-bold text-primary mb-4">
            Analysis Complete!
          </h2>
          
          <p className="text-lg text-muted-foreground mb-6">
            Your profit sensitivity dashboard is ready. Redirecting...
          </p>
          
          <div className="space-y-4">
            <Card className="p-4">
              <div className="text-2xl font-bold text-primary">
                Business Score: {analysisResult.businessScore}/100
              </div>
            </Card>
            
            <Button onClick={() => navigate('/dashboard')} className="w-full">
              View Dashboard Now
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6 pt-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Financial Health & Profit Sensitivity
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your financials and discover how changes impact your profit
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload Financial Documents
              </CardTitle>
              <CardDescription>
                Upload your Profit & Loss, Balance Sheet, and Cash Flow statements for AI-powered analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload 
                onFilesUploaded={handleFilesUploaded}
                uploadedFiles={uploadedFiles}
              />
            </CardContent>
          </Card>

          {/* Analysis Button */}
          {uploadedFiles.some(f => f.status === 'success') && (
            <div className="text-center">
              <Button
                onClick={handleAnalyze}
                disabled={isProcessing}
                size="lg"
                className="px-8"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Analyze Financials
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Benefits Preview */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center p-6">
              <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Profit Sensitivity Analysis</h3>
              <p className="text-sm text-muted-foreground">
                See how changes in key drivers affect your bottom line
              </p>
            </Card>
            
            <Card className="text-center p-6">
              <BarChart3 className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Interactive Dashboard</h3>
              <p className="text-sm text-muted-foreground">
                Visualize your financial data with dynamic charts
              </p>
            </Card>
            
            <Card className="text-center p-6">
              <AlertCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">AI-Powered Insights</h3>
              <p className="text-sm text-muted-foreground">
                Get personalized recommendations for growth
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;