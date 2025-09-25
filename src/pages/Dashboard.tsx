import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProfitDashboard } from '@/components/dashboard/ProfitDashboard';
import { useDashboardStore } from '@/store/dashboardStore';
import { Progress } from '@/components/ui/progress';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setBaseData } = useDashboardStore();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);

  const loadingMessages = [
    "Analyzing your financial documents...",
    "Processing profit & loss data...",
    "Calculating sensitivity metrics...",
    "Generating interactive charts...", 
    "Building your financial dashboard...",
    "Finalizing insights and recommendations..."
  ];

  useEffect(() => {
    if (location.state?.fromAnalysis) {
      setIsLoading(true);
      
      // Set the analysis result data if provided
      if (location.state.analysisResult?.profitLoss) {
        setBaseData(location.state.analysisResult.profitLoss);
      }

      // Simulate dashboard generation with progress
      const generateDashboard = async () => {
        for (let i = 0; i <= 100; i += 5) {
          setLoadingProgress(i);
          
          // Change message every 20% progress
          if (i % 20 === 0 && i > 0) {
            setCurrentMessage(prev => Math.min(prev + 1, loadingMessages.length - 1));
          }
          
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        setIsLoading(false);
        
        // Clear the navigation state
        navigate('/dashboard', { replace: true });
      };
      
      generateDashboard();
    }
  }, [location.state, setBaseData, navigate]);

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-lg">
          <div className="w-20 h-20 mx-auto mb-8">
            <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>
          
          <h2 className="text-3xl font-bold text-primary mb-4">
            Generating Financial Dashboard
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 animate-fade-in">
            {loadingMessages[currentMessage]}
          </p>
          
          <div className="space-y-4">
            <Progress value={loadingProgress} className="w-full h-3" />
            <p className="text-sm text-muted-foreground">
              {loadingProgress}% complete
            </p>
          </div>
          
          <div className="mt-8 text-sm text-muted-foreground">
            <p>Setting up your interactive profit sensitivity analysis...</p>
          </div>
        </div>
      </div>
    );
  }

  return <ProfitDashboard />;
};

export default Dashboard;