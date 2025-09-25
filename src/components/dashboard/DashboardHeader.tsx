// Dashboard header component
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, TrendingUp, FileText, Shield } from 'lucide-react';
import { formatCurrency } from '@/utils/sensitivity';
import { useDashboardStore } from '@/store/dashboardStore';
import { useSensitivityMatrix } from '@/hooks/useSensitivityMatrix';
import { Link } from 'react-router-dom';

export const DashboardHeader = () => {
  const { period, setPeriod, baseData, inputs } = useDashboardStore();
  const { currentProfit } = useSensitivityMatrix(baseData, inputs);

  const periods = [
    'FY 2024-25',
    'Q1 2024-25',
    'Q2 2024-25',
    'Q3 2024-25',
    'Q4 2024-25',
    'Monthly - Jan 2024',
    'Monthly - Feb 2024',
    'Monthly - Mar 2024',
  ];

  return (
    <div className="space-y-6 mb-6">
      {/* Top Row: Business Info & CTAs */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Business Info */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">BizMate Analytics</h1>
            <p className="text-sm text-muted-foreground">Profit Sensitivity Dashboard</p>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          <Link to="/bizdocs">
            <Button variant="outline" className="flex items-center gap-2 hover-scale">
              <FileText className="w-4 h-4" />
              Generate Documents
            </Button>
          </Link>
          
          <Link to="/failsafe">
            <Button variant="default" className="flex items-center gap-2 hover-scale">
              <Shield className="w-4 h-4" />
              View AI Report
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom Row: Period Selector & Net Profit KPI */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Period Selector */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-muted-foreground">Period</label>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {periods.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Net Profit KPI */}
        <Card className="min-w-[200px]">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Net Profit</p>
                <p className="text-xl font-bold text-foreground">
                  {formatCurrency(currentProfit.netProfit)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};