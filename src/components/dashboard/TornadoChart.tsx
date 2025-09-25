// Tornado chart component
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useDashboardStore } from '@/store/dashboardStore';
import { useSensitivityMatrix } from '@/hooks/useSensitivityMatrix';
import { formatPercentage } from '@/utils/sensitivity';

export const TornadoChart = () => {
  const { baseData, inputs } = useDashboardStore();
  const { tornado } = useSensitivityMatrix(baseData, inputs);

  // Transform data for tornado chart
  const chartData = tornado.map(item => ({
    driver: item.driver,
    positive: item.positive,
    negative: Math.abs(item.negative), // Make positive for display
    impact: item.impact,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = tornado.find(item => item.driver === label);
      if (data) {
        return (
          <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
            <p className="font-medium">{label}</p>
            <p className="text-sm text-green-600">
              Upside: {formatPercentage(data.positive)}
            </p>
            <p className="text-sm text-red-600">
              Downside: {formatPercentage(data.negative)}
            </p>
            <p className="text-sm text-muted-foreground">
              Impact Range: {formatPercentage(data.impact)}
            </p>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sensitivity Tornado</CardTitle>
        <p className="text-sm text-muted-foreground">
          Impact ranking of key drivers (±10% change)
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="horizontal"
              margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                type="number"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => formatPercentage(value, 0)}
                domain={['dataMin', 'dataMax']}
              />
              <YAxis 
                type="category"
                dataKey="driver"
                tick={{ fontSize: 12 }}
                width={80}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="positive" 
                fill="hsl(var(--primary))"
                radius={[0, 2, 2, 0]}
              />
              <Bar 
                dataKey="negative" 
                fill="hsl(var(--destructive))"
                radius={[2, 0, 0, 2]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded"></div>
            <span className="text-muted-foreground">Upside Impact</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-destructive rounded"></div>
            <span className="text-muted-foreground">Downside Risk</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};