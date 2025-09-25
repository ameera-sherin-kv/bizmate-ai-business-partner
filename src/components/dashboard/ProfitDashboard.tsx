// Main profit sensitivity dashboard component
import { useEffect } from 'react';
import { DashboardHeader } from './DashboardHeader';
import { KeyDriversPanel } from './KeyDriversPanel';
import { SensitivityMatrix } from './SensitivityMatrix';
import { WaterfallChart } from './WaterfallChart';
import { TornadoChart } from './TornadoChart';
import { ScenarioSelector } from './ScenarioSelector';
import { SummaryKPIs } from './SummaryKPIs';
import { useProfitLoss } from '@/hooks/useProfitLoss';
import { useDashboardStore } from '@/store/dashboardStore';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export const ProfitDashboard = () => {
  const { period } = useDashboardStore();
  const { data, isLoading, error } = useProfitLoss(period);

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load dashboard data: {error}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <Skeleton className="h-20 w-full" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <DashboardHeader />

      {/* Summary KPIs */}
      <SummaryKPIs />

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {/* Key Drivers Panel */}
        <div className="lg:col-span-1">
          <KeyDriversPanel />
        </div>

        {/* Sensitivity Matrix */}
        <div className="lg:col-span-1">
          <SensitivityMatrix />
        </div>

        {/* Scenario Selector */}
        <div className="lg:col-span-1">
          <ScenarioSelector />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WaterfallChart />
        <TornadoChart />
      </div>
    </div>
  );
};