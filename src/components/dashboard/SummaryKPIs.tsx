// Summary KPIs component
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Target, DollarSign } from 'lucide-react';
import { useDashboardStore } from '@/store/dashboardStore';
import { useSensitivityMatrix } from '@/hooks/useSensitivityMatrix';
import { formatCurrency, formatPercentage } from '@/utils/sensitivity';
import { cn } from '@/lib/utils';

export const SummaryKPIs = () => {
  const { baseData, inputs } = useDashboardStore();
  const { kpis } = useSensitivityMatrix(baseData, inputs);

  const kpiCards = [
    {
      title: 'Break-even Volume',
      value: formatCurrency(kpis.breakEvenVolume),
      icon: Target,
      description: 'Units needed to break even',
      trend: null,
    },
    {
      title: 'Contribution Margin',
      value: formatPercentage(kpis.contributionMargin),
      icon: DollarSign,
      description: 'Gross profit as % of revenue',
      trend: kpis.contributionMargin >= 40 ? 'positive' : kpis.contributionMargin >= 25 ? 'neutral' : 'negative',
    },
    {
      title: 'Profit Variance',
      value: formatPercentage(kpis.profitVariance),
      icon: kpis.profitVariance >= 0 ? TrendingUp : TrendingDown,
      description: 'Change vs base scenario',
      trend: kpis.profitVariance >= 5 ? 'positive' : kpis.profitVariance <= -5 ? 'negative' : 'neutral',
    },
    {
      title: 'Current Net Profit',
      value: formatCurrency(kpis.currentNetProfit),
      icon: DollarSign,
      description: 'With current settings',
      trend: kpis.currentNetProfit >= baseData.netProfit ? 'positive' : 'negative',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpiCards.map((kpi, index) => (
        <Card key={index} className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <kpi.icon className="w-4 h-4" />
              {kpi.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className={cn(
                "text-2xl font-bold",
                kpi.trend === 'positive' && "text-green-600",
                kpi.trend === 'negative' && "text-red-600",
                kpi.trend === 'neutral' && "text-yellow-600"
              )}>
                {kpi.value}
              </p>
              <p className="text-xs text-muted-foreground">{kpi.description}</p>
            </div>

            {/* Trend indicator */}
            {kpi.trend && (
              <div className={cn(
                "absolute top-2 right-2 w-2 h-2 rounded-full",
                kpi.trend === 'positive' && "bg-green-500",
                kpi.trend === 'negative' && "bg-red-500",
                kpi.trend === 'neutral' && "bg-yellow-500"
              )} />
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};