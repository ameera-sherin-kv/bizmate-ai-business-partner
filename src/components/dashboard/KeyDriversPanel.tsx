// Key drivers input panel component
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDashboardStore } from '@/store/dashboardStore';
import { ProfitInputs } from '@/types/dashboard';

export const KeyDriversPanel = () => {
  const { inputs, setInputs } = useDashboardStore();

  const handleInputChange = (key: keyof ProfitInputs, value: number) => {
    setInputs({ [key]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Key Drivers
          <span className="text-sm font-normal text-muted-foreground">
            (Adjust to see impact)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sales Volume Change */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="sales-volume">Sales Volume Change (%)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="sales-volume"
                type="number"
                value={inputs.salesVolumeChange}
                onChange={(e) => handleInputChange('salesVolumeChange', Number(e.target.value))}
                className="w-20 text-right"
                min={-50}
                max={100}
              />
              <span className="text-sm text-muted-foreground">%</span>
            </div>
          </div>
          <Slider
            value={[inputs.salesVolumeChange]}
            onValueChange={([value]) => handleInputChange('salesVolumeChange', value)}
            min={-50}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        {/* Price Change */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="price">Price Change (%)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="price"
                type="number"
                value={inputs.priceChange}
                onChange={(e) => handleInputChange('priceChange', Number(e.target.value))}
                className="w-20 text-right"
                min={-30}
                max={50}
              />
              <span className="text-sm text-muted-foreground">%</span>
            </div>
          </div>
          <Slider
            value={[inputs.priceChange]}
            onValueChange={([value]) => handleInputChange('priceChange', value)}
            min={-30}
            max={50}
            step={1}
            className="w-full"
          />
        </div>

        {/* COGS Percentage */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="cogs">COGS (% of Revenue)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="cogs"
                type="number"
                value={inputs.cogsPercent}
                onChange={(e) => handleInputChange('cogsPercent', Number(e.target.value))}
                className="w-20 text-right"
                min={30}
                max={90}
              />
              <span className="text-sm text-muted-foreground">%</span>
            </div>
          </div>
          <Slider
            value={[inputs.cogsPercent]}
            onValueChange={([value]) => handleInputChange('cogsPercent', value)}
            min={30}
            max={90}
            step={1}
            className="w-full"
          />
        </div>

        {/* Overheads Change */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="overheads">Overheads Change (%)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="overheads"
                type="number"
                value={inputs.overheadsChange}
                onChange={(e) => handleInputChange('overheadsChange', Number(e.target.value))}
                className="w-20 text-right"
                min={-50}
                max={100}
              />
              <span className="text-sm text-muted-foreground">%</span>
            </div>
          </div>
          <Slider
            value={[inputs.overheadsChange]}
            onValueChange={([value]) => handleInputChange('overheadsChange', value)}
            min={-50}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        {/* Tax Rate */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="tax-rate">Tax Rate (%)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="tax-rate"
                type="number"
                value={inputs.taxRate}
                onChange={(e) => handleInputChange('taxRate', Number(e.target.value))}
                className="w-20 text-right"
                min={0}
                max={50}
              />
              <span className="text-sm text-muted-foreground">%</span>
            </div>
          </div>
          <Slider
            value={[inputs.taxRate]}
            onValueChange={([value]) => handleInputChange('taxRate', value)}
            min={0}
            max={50}
            step={1}
            className="w-full"
          />
        </div>
      </CardContent>
    </Card>
  );
};