// Zustand store for dashboard state
import { create } from 'zustand';
import { DashboardState, ProfitInputs, ProfitLossData, Scenario } from '@/types/dashboard';

interface DashboardStore extends DashboardState {
  // State
  isLoading: boolean;
  scenarios: Scenario[];
  
  // Actions
  setPeriod: (period: string) => void;
  setInputs: (inputs: Partial<ProfitInputs>) => void;
  setBaseData: (data: ProfitLossData) => void;
  setSelectedScenario: (scenarioId: string) => void;
  setScenarios: (scenarios: Scenario[]) => void;
  addScenario: (scenario: Scenario) => void;
  removeScenario: (scenarioId: string) => void;
  setLoading: (loading: boolean) => void;
  
  // Computed actions
  loadScenario: (scenarioId: string) => void;
  resetToBase: () => void;
}

const defaultInputs: ProfitInputs = {
  salesVolumeChange: 0,
  priceChange: 0,
  cogsPercent: 60,
  overheadsChange: 0,
  taxRate: 30,
};

const defaultBaseData: ProfitLossData = {
  revenue: 1000000,
  cogs: 600000,
  grossProfit: 400000,
  overheads: 250000,
  ebit: 150000,
  tax: 45000,
  netProfit: 105000,
};

export const useDashboardStore = create<DashboardStore>((set, get) => ({
  // Initial state
  period: 'FY 2024-25',
  inputs: defaultInputs,
  baseData: defaultBaseData,
  selectedScenario: 'base',
  isLoading: false,
  scenarios: [],

  // Actions
  setPeriod: (period) => set({ period }),
  
  setInputs: (newInputs) => 
    set((state) => ({ 
      inputs: { ...state.inputs, ...newInputs },
      selectedScenario: 'custom' // Switch to custom when inputs change
    })),
  
  setBaseData: (baseData) => set({ baseData }),
  
  setSelectedScenario: (scenarioId) => set({ selectedScenario: scenarioId }),
  
  setScenarios: (scenarios) => set({ scenarios }),
  
  addScenario: (scenario) => 
    set((state) => ({ scenarios: [...state.scenarios, scenario] })),
  
  removeScenario: (scenarioId) => 
    set((state) => ({ 
      scenarios: state.scenarios.filter(s => s.id !== scenarioId),
      selectedScenario: state.selectedScenario === scenarioId ? 'base' : state.selectedScenario
    })),
  
  setLoading: (isLoading) => set({ isLoading }),

  // Computed actions
  loadScenario: (scenarioId) => {
    const { scenarios } = get();
    const scenario = scenarios.find(s => s.id === scenarioId);
    if (scenario) {
      set({ 
        inputs: scenario.inputs,
        selectedScenario: scenarioId 
      });
    }
  },

  resetToBase: () => {
    set({ 
      inputs: defaultInputs,
      selectedScenario: 'base' 
    });
  },
}));