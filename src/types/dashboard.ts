// Dashboard types for Profit Sensitivity Dashboard
export interface ProfitInputs {
  salesVolumeChange: number; // % change
  priceChange: number; // % change
  cogsPercent: number; // % of revenue
  overheadsChange: number; // % change
  taxRate: number; // % rate
}

export interface ProfitLossData {
  revenue: number;
  cogs: number;
  grossProfit: number;
  overheads: number;
  ebit: number;
  tax: number;
  netProfit: number;
}

export interface SensitivityCell {
  salesChange: number;
  priceChange: number;
  profitChange: number;
  color: string;
}

export interface WaterfallData {
  name: string;
  value: number;
  cumulative: number;
  isPositive: boolean;
}

export interface TornadoData {
  driver: string;
  impact: number;
  positive: number;
  negative: number;
}

export interface Scenario {
  id: string;
  name: string;
  inputs: ProfitInputs;
  createdAt: string;
}

export interface KPIData {
  breakEvenVolume: number;
  contributionMargin: number;
  profitVariance: number;
  currentNetProfit: number;
}

export interface DashboardState {
  period: string;
  inputs: ProfitInputs;
  baseData: ProfitLossData;
  selectedScenario: string;
}