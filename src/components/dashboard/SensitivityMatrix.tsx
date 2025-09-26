// Sensitivity matrix heatmap component
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDashboardStore } from '@/store/dashboardStore';
import { useSensitivityMatrix } from '@/hooks/useSensitivityMatrix';
import { formatPercentage } from '@/utils/sensitivity';
import { cn } from '@/lib/utils';

export const SensitivityMatrix = () => {
  const { baseData, inputs } = useDashboardStore();
  const { matrix } = useSensitivityMatrix(baseData, inputs);

  const changeValues = [-20, -10, 0, 10, 20];
  const parameters = ['Sales Volume', 'Price', 'COGS%', 'Overheads', 'Tax Rate'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profit Sensitivity Matrix</CardTitle>
        <p className="text-sm text-muted-foreground">
          Net profit change (%) for sales volume and price variations
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            {/* Header row */}
            <div className="grid grid-cols-6 gap-1 mb-2">
              <div className="p-2 text-center font-medium text-sm text-muted-foreground">
                Parameter
              </div>
              {changeValues.map((changeValue) => (
                <div key={changeValue} className="p-2 text-center font-medium text-sm text-muted-foreground">
                  {changeValue === 0 ? '0' : formatPercentage(changeValue, 0)}
                </div>
              ))}
            </div>

            {/* Data rows */}
            {matrix.map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-6 gap-1 mb-1">
                <div className="p-2 text-center font-medium text-sm text-muted-foreground min-w-[100px]">
                  {parameters[rowIndex]}
                </div>
                {row.map((cell, colIndex) => (
                  <div
                    key={colIndex}
                    className={cn(
                      "p-3 text-center text-white text-sm font-medium rounded-md transition-all hover:scale-105",
                      cell.color
                    )}
                  >
                    {changeValues[colIndex] === 0 ? '0' : formatPercentage(cell.profitChange)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-600 rounded"></div>
            <span className="text-muted-foreground">&gt;20% increase</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-400 rounded"></div>
            <span className="text-muted-foreground">5-20% increase</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-400 rounded"></div>
            <span className="text-muted-foreground">±5% change</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-400 rounded"></div>
            <span className="text-muted-foreground">5-20% decrease</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-600 rounded"></div>
            <span className="text-muted-foreground">&gt;20% decrease</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};