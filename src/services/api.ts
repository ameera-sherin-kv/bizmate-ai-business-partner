// API service layer for dashboard data
import { ProfitLossData, Scenario, ProfitInputs } from '@/types/dashboard';

// Mock data for development - will be replaced with actual API calls
const mockProfitLoss: ProfitLossData = {
  revenue: 1000000,
  cogs: 600000,
  grossProfit: 400000,
  overheads: 250000,
  ebit: 150000,
  tax: 45000,
  netProfit: 105000,
};

const mockScenarios: Scenario[] = [
  {
    id: 'base',
    name: 'Base Case',
    inputs: {
      salesVolumeChange: 0,
      priceChange: 0,
      cogsPercent: 60,
      overheadsChange: 0,
      taxRate: 30,
    },
    createdAt: '2024-01-01',
  },
  {
    id: 'optimistic',
    name: 'Optimistic',
    inputs: {
      salesVolumeChange: 15,
      priceChange: 5,
      cogsPercent: 55,
      overheadsChange: -10,
      taxRate: 30,
    },
    createdAt: '2024-01-01',
  },
  {
    id: 'pessimistic',
    name: 'Pessimistic',
    inputs: {
      salesVolumeChange: -10,
      priceChange: -5,
      cogsPercent: 65,
      overheadsChange: 15,
      taxRate: 35,
    },
    createdAt: '2024-01-01',
  },
];

export const apiService = {
  // Fetch P&L data for given period
  async fetchProfitLoss(period: string): Promise<ProfitLossData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockProfitLoss;
  },

  // Fetch saved scenarios
  async fetchScenarios(): Promise<Scenario[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...mockScenarios];
  },

  // Save new scenario
  async saveScenario(name: string, inputs: ProfitInputs): Promise<Scenario> {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newScenario: Scenario = {
      id: `custom-${Date.now()}`,
      name,
      inputs,
      createdAt: new Date().toISOString(),
    };
    mockScenarios.push(newScenario);
    return newScenario;
  },

  // Delete scenario
  async deleteScenario(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = mockScenarios.findIndex(s => s.id === id);
    if (index > -1) {
      mockScenarios.splice(index, 1);
    }
  },
};