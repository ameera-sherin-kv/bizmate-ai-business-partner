import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUpload, UploadedFile } from "@/components/upload/FileUpload";
import { financeApi, FinanceAnalysisResult } from "@/services/financeApi";
import { useDashboardStore } from "@/store/dashboardStore";
import { Upload, TrendingUp, BarChart3, Loader2, CheckCircle, AlertCircle, ArrowLeft, Edit, TestTube } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

const Analysis = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { setBaseData } = useDashboardStore();
  
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<FinanceAnalysisResult | null>(null);
  const [currentStep, setCurrentStep] = useState<'upload' | 'processing' | 'complete' | 'evaluation'>('upload');
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Check if coming from discovery page for evaluation mode
  useEffect(() => {
    if (location.state?.fromDiscovery) {
      setCurrentStep('processing');
      setIsProcessing(true);
      
      // Simulate AI report generation
      const generateReport = async () => {
        for (let i = 0; i <= 100; i += 10) {
          setLoadingProgress(i);
          await new Promise(resolve => setTimeout(resolve, 200));
        }
        
        // Mock evaluation result
        const mockResult: FinanceAnalysisResult = {
          businessScore: 76,
          profitLoss: {
            revenue: 1000000,
            cogs: 600000,
            grossProfit: 400000,
            overheads: 250000,
            ebit: 150000,
            tax: 45000,
            netProfit: 105000,
          },
          suggestions: [],
          riskFactors: [
            "Limited market research depth",
            "High customer acquisition cost assumptions",
            "Competitive analysis needs strengthening"
          ],
          opportunities: [
            "Strong value proposition alignment",
            "Clear target market definition", 
            "Scalable business model structure"
          ]
        };
        
        setAnalysisResult(mockResult);
        setCurrentStep('evaluation');
        setIsProcessing(false);
      };
      
      generateReport();
    }
  }, [location.state]);

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

  // AI Report Generation Loading screen
  if (isProcessing && location.state?.fromDiscovery) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-8">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>
          
          <h2 className="text-2xl font-bold text-primary mb-4">
            Generating AI Report...
          </h2>
          
          <p className="text-lg text-muted-foreground mb-6">
            Analyzing your business plan for insights
          </p>
          
          <Progress value={loadingProgress} className="w-full mb-4" />
          <p className="text-sm text-muted-foreground">{loadingProgress}% complete</p>
        </div>
      </div>
    );
  }

  // Business Plan Evaluation Mode
  if (currentStep === 'evaluation' && analysisResult) {
    const strengthsData = [
      "Clear value proposition and target market identification",
      "Realistic financial projections based on market research",
      "Strong competitive differentiation strategy",
      "Comprehensive go-to-market plan"
    ];

    const improvementsData = [
      "Market size validation needs deeper research",
      "Customer acquisition cost assumptions require testing",
      "Revenue model scalability concerns",
      "Risk mitigation strategies need development"
    ];

    const experimentsData = [
      "Run MVP test with 100 target customers",
      "A/B test pricing models with small customer groups",
      "Validate key assumptions through market surveys",
      "Test distribution channels with pilot programs"
    ];

    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto p-6 pt-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/discovery')}
              className="p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-primary">Business Plan Evaluation</h1>
              <p className="text-muted-foreground">AI-powered analysis of your business plan</p>
            </div>
          </div>

          {/* Business Viability Score */}
          <Card className="mb-8 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-4">
                <span className="text-3xl font-bold text-primary">{analysisResult.businessScore}</span>
                <span className="text-lg text-primary/70">/100</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">Overall Business Viability Score</h2>
              <p className="text-lg text-muted-foreground">
                {analysisResult.businessScore >= 80 ? "Excellent" : 
                 analysisResult.businessScore >= 60 ? "Good" : 
                 analysisResult.businessScore >= 40 ? "Fair" : "Needs Work"} business plan foundation
              </p>
            </CardContent>
          </Card>

          {/* Analysis Cards */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* What Went Well */}
            <Card className="border-green-200 dark:border-green-800">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  What Went Well
                </CardTitle>
                <CardDescription>Strengths identified in your plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {strengthsData.map((strength, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/30">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">{strength}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* What Needs Improvement */}
            <Card className="border-yellow-200 dark:border-yellow-800">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
                  <AlertCircle className="w-5 h-5" />
                  What Needs Improvement
                </CardTitle>
                <CardDescription>Areas requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {improvementsData.map((improvement, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/30">
                      <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">{improvement}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trial & Error Areas */}
            <Card className="border-blue-200 dark:border-blue-800">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                  <TestTube className="w-5 h-5" />
                  Trial & Error Areas
                </CardTitle>
                <CardDescription>Test these before big investments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {experimentsData.map((experiment, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30">
                      <TestTube className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">{experiment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/discovery')}
              size="lg"
              className="flex items-center gap-2 px-8"
            >
              <Edit className="w-4 h-4" />
              Update Plan
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
              size="lg"
              className="flex items-center gap-2 px-8"
            >
              <BarChart3 className="w-4 h-4" />
              View Financial Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Processing screen for file analysis
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

  // Success/Complete screen for file analysis
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

  // Default file upload interface
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