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
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center justify-between">
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
      <CardContent className="space-y-6">
        {/* Scenario Selector */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Active Scenario</Label>
          <Select value={selectedScenario} onValueChange={handleScenarioChange}>
            <SelectTrigger className="h-11">
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
          <div className="p-4 bg-muted/50 rounded-lg space-y-3">
            <p className="text-base font-semibold">{currentScenario.name}</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sales:</span>
                <span className="font-medium">{currentScenario.inputs.salesVolumeChange}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price:</span>
                <span className="font-medium">{currentScenario.inputs.priceChange}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">COGS:</span>
                <span className="font-medium">{currentScenario.inputs.cogsPercent}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Overheads:</span>
                <span className="font-medium">{currentScenario.inputs.overheadsChange}%</span>
              </div>
              <div className="flex justify-between col-span-2">
                <span className="text-muted-foreground">Tax Rate:</span>
                <span className="font-medium">{currentScenario.inputs.taxRate}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Scenario Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="default"
            onClick={resetToBase}
            className="flex-1 h-10"
          >
            Reset to Base
          </Button>
          
          {currentScenario && currentScenario.id !== 'base' && (
            <Button
              variant="destructive"
              size="default"
              onClick={() => handleDeleteScenario(currentScenario.id)}
              disabled={isLoading}
              className="h-10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Saved Scenarios List */}
        {scenarios.length > 3 && (
          <div className="space-y-3">
            <Label className="text-base font-medium">Saved Scenarios</Label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {scenarios
                .filter(s => !['base', 'optimistic', 'pessimistic'].includes(s.id))
                .map((scenario) => (
                  <div
                    key={scenario.id}
                    className="flex items-center justify-between p-3 rounded-md border bg-background hover:bg-muted/30 transition-colors"
                  >
                    <button
                      onClick={() => loadScenario(scenario.id)}
                      className="text-sm font-medium hover:text-primary transition-colors"
                    >
                      {scenario.name}
                    </button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteScenario(scenario.id)}
                      disabled={isLoading}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="w-4 h-4" />
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