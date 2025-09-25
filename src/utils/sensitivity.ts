// Sensitivity analysis calculations
import { 
  ProfitInputs, 
  ProfitLossData, 
  SensitivityCell, 
  WaterfallData, 
  TornadoData, 
  KPIData 
} from '@/types/dashboard';

export class SensitivityCalculator {
  private baseData: ProfitLossData;

  constructor(baseData: ProfitLossData) {
    this.baseData = baseData;
  }

  // Calculate profit with given input changes
  calculateProfit(inputs: ProfitInputs): ProfitLossData {
    const volumeMultiplier = 1 + (inputs.salesVolumeChange / 100);
    const priceMultiplier = 1 + (inputs.priceChange / 100);
    const overheadMultiplier = 1 + (inputs.overheadsChange / 100);

    const newRevenue = this.baseData.revenue * volumeMultiplier * priceMultiplier;
    const newCogs = newRevenue * (inputs.cogsPercent / 100);
    const newGrossProfit = newRevenue - newCogs;
    const newOverheads = this.baseData.overheads * overheadMultiplier;
    const newEbit = newGrossProfit - newOverheads;
    const newTax = Math.max(0, newEbit * (inputs.taxRate / 100));
    const newNetProfit = newEbit - newTax;

    return {
      revenue: newRevenue,
      cogs: newCogs,
      grossProfit: newGrossProfit,
      overheads: newOverheads,
      ebit: newEbit,
      tax: newTax,
      netProfit: newNetProfit,
    };
  }

  // Generate sensitivity matrix
  generateSensitivityMatrix(baseInputs: ProfitInputs): SensitivityCell[][] {
    const salesChanges = [-20, -10, 0, 10, 20];
    const priceChanges = [-10, -5, 0, 5, 10];
    const matrix: SensitivityCell[][] = [];

    for (const salesChange of salesChanges) {
      const row: SensitivityCell[] = [];
      for (const priceChange of priceChanges) {
        const testInputs = {
          ...baseInputs,
          salesVolumeChange: salesChange,
          priceChange: priceChange,
        };
        
        const result = this.calculateProfit(testInputs);
        const profitChange = ((result.netProfit - this.baseData.netProfit) / this.baseData.netProfit) * 100;
        
        row.push({
          salesChange,
          priceChange,
          profitChange,
          color: this.getProfitColor(profitChange),
        });
      }
      matrix.push(row);
    }

    return matrix;
  }

  // Generate waterfall chart data
  generateWaterfallData(inputs: ProfitInputs): WaterfallData[] {
    const result = this.calculateProfit(inputs);
    
    return [
      { name: 'Revenue', value: result.revenue, cumulative: result.revenue, isPositive: true },
      { name: 'COGS', value: -result.cogs, cumulative: result.grossProfit, isPositive: false },
      { name: 'Gross Profit', value: result.grossProfit, cumulative: result.grossProfit, isPositive: true },
      { name: 'Overheads', value: -result.overheads, cumulative: result.ebit, isPositive: false },
      { name: 'EBIT', value: result.ebit, cumulative: result.ebit, isPositive: true },
      { name: 'Tax', value: -result.tax, cumulative: result.netProfit, isPositive: false },
      { name: 'Net Profit', value: result.netProfit, cumulative: result.netProfit, isPositive: true },
    ];
  }

  // Generate tornado chart data
  generateTornadoData(baseInputs: ProfitInputs): TornadoData[] {
    const baseProfit = this.calculateProfit(baseInputs).netProfit;
    const sensitivity = 10; // +/- 10% change

    const drivers = [
      { name: 'Sales Volume', key: 'salesVolumeChange' as keyof ProfitInputs },
      { name: 'Price', key: 'priceChange' as keyof ProfitInputs },
      { name: 'COGS %', key: 'cogsPercent' as keyof ProfitInputs },
      { name: 'Overheads', key: 'overheadsChange' as keyof ProfitInputs },
      { name: 'Tax Rate', key: 'taxRate' as keyof ProfitInputs },
    ];

    return drivers.map(driver => {
      // Positive impact
      const positiveInputs = { ...baseInputs };
      if (driver.key === 'cogsPercent' || driver.key === 'taxRate') {
        positiveInputs[driver.key] = (positiveInputs[driver.key] as number) - sensitivity;
      } else {
        positiveInputs[driver.key] = (positiveInputs[driver.key] as number) + sensitivity;
      }
      const positiveProfit = this.calculateProfit(positiveInputs).netProfit;

      // Negative impact
      const negativeInputs = { ...baseInputs };
      if (driver.key === 'cogsPercent' || driver.key === 'taxRate') {
        negativeInputs[driver.key] = (negativeInputs[driver.key] as number) + sensitivity;
      } else {
        negativeInputs[driver.key] = (negativeInputs[driver.key] as number) - sensitivity;
      }
      const negativeProfit = this.calculateProfit(negativeInputs).netProfit;

      const positiveChange = ((positiveProfit - baseProfit) / baseProfit) * 100;
      const negativeChange = ((negativeProfit - baseProfit) / baseProfit) * 100;
      const impact = Math.abs(positiveChange - negativeChange) / 2;

      return {
        driver: driver.name,
        impact,
        positive: positiveChange,
        negative: negativeChange,
      };
    }).sort((a, b) => b.impact - a.impact);
  }

  // Calculate KPIs
  calculateKPIs(inputs: ProfitInputs): KPIData {
    const result = this.calculateProfit(inputs);
    const baseResult = this.calculateProfit({
      salesVolumeChange: 0,
      priceChange: 0,
      cogsPercent: 60,
      overheadsChange: 0,
      taxRate: 30,
    });

    // Break-even sales volume (simplified)
    const fixedCosts = result.overheads;
    const pricePerUnit = 100; // Assumed price per unit
    const variableCostPerUnit = pricePerUnit * (inputs.cogsPercent / 100);
    const contributionPerUnit = pricePerUnit - variableCostPerUnit;
    const breakEvenVolume = contributionPerUnit > 0 ? fixedCosts / contributionPerUnit : 0;

    // Contribution margin
    const contributionMargin = ((result.revenue - result.cogs) / result.revenue) * 100;

    // Profit variance vs base
    const profitVariance = ((result.netProfit - baseResult.netProfit) / baseResult.netProfit) * 100;

    return {
      breakEvenVolume,
      contributionMargin,
      profitVariance,
      currentNetProfit: result.netProfit,
    };
  }

  private getProfitColor(profitChange: number): string {
    if (profitChange >= 20) return 'bg-green-600';
    if (profitChange >= 10) return 'bg-green-500';
    if (profitChange >= 5) return 'bg-green-400';
    if (profitChange >= -5) return 'bg-yellow-400';
    if (profitChange >= -10) return 'bg-orange-400';
    if (profitChange >= -20) return 'bg-red-400';
    return 'bg-red-600';
  }
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatPercentage = (value: number, decimals = 1): string => {
  return `${value.toFixed(decimals)}%`;
};