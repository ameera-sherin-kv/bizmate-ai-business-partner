// Hook for sensitivity matrix calculations
import { useMemo } from 'react';
import { ProfitInputs, ProfitLossData } from '@/types/dashboard';
import { SensitivityCalculator } from '@/utils/sensitivity';

export const useSensitivityMatrix = (baseData: ProfitLossData, inputs: ProfitInputs) => {
  const calculator = useMemo(() => new SensitivityCalculator(baseData), [baseData]);

  const results = useMemo(() => {
    return {
      matrix: calculator.generateSensitivityMatrix(inputs),
      waterfall: calculator.generateWaterfallData(inputs),
      tornado: calculator.generateTornadoData(inputs),
      kpis: calculator.calculateKPIs(inputs),
      currentProfit: calculator.calculateProfit(inputs),
    };
  }, [calculator, inputs]);

  return results;
};