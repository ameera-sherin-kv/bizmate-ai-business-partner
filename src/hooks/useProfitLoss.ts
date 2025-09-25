// Hook for fetching profit & loss data
import { useState, useEffect } from 'react';
import { ProfitLossData } from '@/types/dashboard';
import { apiService } from '@/services/api';
import { useDashboardStore } from '@/store/dashboardStore';

export const useProfitLoss = (period: string) => {
  const [data, setData] = useState<ProfitLossData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { setBaseData } = useDashboardStore();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const profitLossData = await apiService.fetchProfitLoss(period);
      setData(profitLossData);
      setBaseData(profitLossData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [period, setBaseData]);

  return { data, isLoading, error, refetch: fetchData };
};