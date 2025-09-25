// Scenario selector and management component
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Save, Trash2, Plus } from 'lucide-react';
import { useDashboardStore } from '@/store/dashboardStore';
import { useScenarios } from '@/hooks/useScenarios';

export const ScenarioSelector = () => {
  const { selectedScenario, inputs, loadScenario, resetToBase } = useDashboardStore();
  const { scenarios, saveScenario, deleteScenario, isLoading } = useScenarios();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [scenarioName, setScenarioName] = useState('');

  const handleScenarioChange = (scenarioId: string) => {
    if (scenarioId === 'custom') return;
    loadScenario(scenarioId);
  };

  const handleSaveScenario = async () => {
    if (!scenarioName.trim()) return;
    
    try {
      await saveScenario(scenarioName, inputs);
      setScenarioName('');
      setIsDialogOpen(false);
    } catch (error) {
      // Error is handled by the hook
    }
  };

  const handleDeleteScenario = async (scenarioId: string) => {
    if (scenarioId === 'base') return;
    
    try {
      await deleteScenario(scenarioId);
    } catch (error) {
      // Error is handled by the hook
    }
  };

  const currentScenario = scenarios.find(s => s.id === selectedScenario);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Scenario Management
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Save Current
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Save Scenario</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="scenario-name">Scenario Name</Label>
                  <Input
                    id="scenario-name"
                    value={scenarioName}
                    onChange={(e) => setScenarioName(e.target.value)}
                    placeholder="Enter scenario name..."
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveScenario}
                    disabled={!scenarioName.trim() || isLoading}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Scenario Selector */}
        <div className="space-y-2">
          <Label>Active Scenario</Label>
          <Select value={selectedScenario} onValueChange={handleScenarioChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {scenarios.map((scenario) => (
                <SelectItem key={scenario.id} value={scenario.id}>
                  {scenario.name}
                  {selectedScenario === 'custom' && scenario.id === 'base' && ' (Modified)'}
                </SelectItem>
              ))}
              {selectedScenario === 'custom' && (
                <SelectItem value="custom">Custom Scenario</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Current Scenario Info */}
        {currentScenario && (
          <div className="p-3 bg-muted/50 rounded-lg space-y-2">
            <p className="text-sm font-medium">{currentScenario.name}</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div>Sales: {currentScenario.inputs.salesVolumeChange}%</div>
              <div>Price: {currentScenario.inputs.priceChange}%</div>
              <div>COGS: {currentScenario.inputs.cogsPercent}%</div>
              <div>Overheads: {currentScenario.inputs.overheadsChange}%</div>
              <div>Tax: {currentScenario.inputs.taxRate}%</div>
            </div>
          </div>
        )}

        {/* Scenario Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={resetToBase}
            className="flex-1"
          >
            Reset to Base
          </Button>
          
          {currentScenario && currentScenario.id !== 'base' && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDeleteScenario(currentScenario.id)}
              disabled={isLoading}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Saved Scenarios List */}
        {scenarios.length > 3 && (
          <div className="space-y-2">
            <Label>Saved Scenarios</Label>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {scenarios
                .filter(s => !['base', 'optimistic', 'pessimistic'].includes(s.id))
                .map((scenario) => (
                  <div
                    key={scenario.id}
                    className="flex items-center justify-between p-2 rounded border"
                  >
                    <button
                      onClick={() => loadScenario(scenario.id)}
                      className="text-sm font-medium hover:text-primary"
                    >
                      {scenario.name}
                    </button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteScenario(scenario.id)}
                      disabled={isLoading}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};