// Hook for managing scenarios
import { useState, useEffect } from 'react';
import { Scenario, ProfitInputs } from '@/types/dashboard';
import { apiService } from '@/services/api';
import { useDashboardStore } from '@/store/dashboardStore';
import { useToast } from '@/hooks/use-toast';

export const useScenarios = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { scenarios, setScenarios, addScenario, removeScenario } = useDashboardStore();
  const { toast } = useToast();

  // Fetch scenarios on mount
  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await apiService.fetchScenarios();
        setScenarios(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch scenarios';
        setError(message);
        toast({
          title: "Error",
          description: message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchScenarios();
  }, [setScenarios, toast]);

  // Save new scenario
  const saveScenario = async (name: string, inputs: ProfitInputs) => {
    try {
      setIsLoading(true);
      const newScenario = await apiService.saveScenario(name, inputs);
      addScenario(newScenario);
      toast({
        title: "Success",
        description: `Scenario "${name}" saved successfully`,
      });
      return newScenario;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save scenario';
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete scenario
  const deleteScenario = async (scenarioId: string) => {
    try {
      setIsLoading(true);
      await apiService.deleteScenario(scenarioId);
      removeScenario(scenarioId);
      toast({
        title: "Success",
        description: "Scenario deleted successfully",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete scenario';
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    scenarios,
    isLoading,
    error,
    saveScenario,
    deleteScenario,
  };
};