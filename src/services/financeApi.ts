// Finance API service for document analysis and suggestions
import { ProfitLossData, ProfitInputs } from '@/types/dashboard';

export interface FinanceAnalysisResult {
  profitLoss: ProfitLossData;
  suggestions: AISuggestion[];
  businessScore: number;
  riskFactors: string[];
  opportunities: string[];
}

export interface AISuggestion {
  id: string;
  category: 'cost-cutting' | 'revenue-growth' | 'efficiency' | 'strategic';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'high' | 'medium' | 'low';
  timeframe: string;
  potentialSavings?: number;
  potentialRevenue?: number;
}

export interface UploadResponse {
  fileId: string;
  status: 'success' | 'error';
  message: string;
}

class FinanceApiService {
  private baseUrl = '/api/finance'; // Will be configured for backend integration

  async uploadFiles(files: File[]): Promise<UploadResponse[]> {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const responses: UploadResponse[] = files.map(file => ({
          fileId: Math.random().toString(36).substr(2, 9),
          status: 'success' as const,
          message: `${file.name} uploaded successfully`
        }));
        resolve(responses);
      }, 2000);
    });
  }

  async analyzeFinancials(fileIds: string[]): Promise<FinanceAnalysisResult> {
    // Mock implementation - replace with actual backend call
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockResult: FinanceAnalysisResult = {
          profitLoss: {
            revenue: 1500000,
            cogs: 900000,
            grossProfit: 600000,
            overheads: 350000,
            ebit: 250000,
            tax: 62500,
            netProfit: 187500
          },
          businessScore: 78,
          riskFactors: [
            'High COGS ratio (60%) compared to industry average',
            'Limited cash flow visibility',
            'Seasonal revenue fluctuations'
          ],
          opportunities: [
            'Potential for automation in operations',
            'Opportunity to renegotiate supplier terms',
            'Market expansion possibilities'
          ],
          suggestions: [
            {
              id: '1',
              category: 'cost-cutting',
              title: 'Optimize Inventory Management',
              description: 'Implement just-in-time inventory to reduce holding costs and improve cash flow.',
              impact: 'high',
              effort: 'medium',
              timeframe: '3-6 months',
              potentialSavings: 45000
            },
            {
              id: '2',
              category: 'revenue-growth',
              title: 'Premium Product Line',
              description: 'Introduce a premium tier with 30% higher margins targeting existing customers.',
              impact: 'high',
              effort: 'high',
              timeframe: '6-12 months',
              potentialRevenue: 225000
            },
            {
              id: '3',
              category: 'efficiency',
              title: 'Automate Financial Reporting',
              description: 'Reduce manual work and improve accuracy with automated financial dashboards.',
              impact: 'medium',
              effort: 'low',
              timeframe: '1-2 months',
              potentialSavings: 12000
            },
            {
              id: '4',
              category: 'strategic',
              title: 'Diversify Revenue Streams',
              description: 'Add subscription services to create predictable recurring revenue.',
              impact: 'high',
              effort: 'high',
              timeframe: '9-18 months',
              potentialRevenue: 180000
            }
          ]
        };
        resolve(mockResult);
      }, 5000); // 5 second processing time
    });
  }

  async generateSuggestions(profitLoss: ProfitLossData, inputs: ProfitInputs): Promise<AISuggestion[]> {
    // Mock implementation for additional suggestions based on sensitivity analysis
    return new Promise((resolve) => {
      setTimeout(() => {
        const suggestions: AISuggestion[] = [
          {
            id: '5',
            category: 'cost-cutting',
            title: 'Renegotiate Key Supplier Contracts',
            description: 'Based on your COGS sensitivity, a 5% reduction could increase profit by 15%.',
            impact: 'high',
            effort: 'medium',
            timeframe: '2-4 months',
            potentialSavings: 45000
          }
        ];
        resolve(suggestions);
      }, 1000);
    });
  }
}

export const financeApi = new FinanceApiService();