import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Target, TrendingUp, DollarSign, Heart } from 'lucide-react';

interface RegenerateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onRegenerate: (emphasis: string, customInstructions?: string) => void;
  documentType: string;
}

const emphasisOptions = [
  {
    id: 'sustainability',
    label: 'Sustainability Focus',
    description: 'Emphasize environmental impact and sustainable practices',
    icon: Heart
  },
  {
    id: 'growth',
    label: 'Growth Emphasis', 
    description: 'Highlight scalability and expansion opportunities',
    icon: TrendingUp
  },
  {
    id: 'revenue',
    label: 'Revenue Focus',
    description: 'Prioritize financial performance and profitability',
    icon: DollarSign
  },
  {
    id: 'innovation',
    label: 'Innovation & Technology',
    description: 'Showcase unique technology and competitive advantages',
    icon: Sparkles
  },
  {
    id: 'market',
    label: 'Market Positioning',
    description: 'Focus on market opportunity and competitive landscape',
    icon: Target
  }
];

export const RegenerateDialog = ({ 
  isOpen, 
  onClose, 
  onRegenerate, 
  documentType 
}: RegenerateDialogProps) => {
  const [selectedEmphasis, setSelectedEmphasis] = useState('growth');
  const [customInstructions, setCustomInstructions] = useState('');
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onRegenerate(selectedEmphasis, customInstructions);
    setIsRegenerating(false);
    onClose();
    
    // Reset form
    setSelectedEmphasis('growth');
    setCustomInstructions('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-background border shadow-lg z-50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Regenerate {documentType}
          </DialogTitle>
          <DialogDescription>
            Choose what aspect you'd like us to emphasize in the regenerated document.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Emphasis Options */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Emphasis Focus</Label>
            <RadioGroup value={selectedEmphasis} onValueChange={setSelectedEmphasis}>
              {emphasisOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <div key={option.id} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <RadioGroupItem 
                      value={option.id} 
                      id={option.id}
                      className="mt-1"
                    />
                    <div className="flex items-start gap-3 flex-1">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <Label 
                          htmlFor={option.id} 
                          className="font-medium cursor-pointer"
                        >
                          {option.label}
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </RadioGroup>
          </div>

          {/* Custom Instructions */}
          <div className="space-y-2">
            <Label htmlFor="custom-instructions" className="text-sm font-medium">
              Additional Instructions (Optional)
            </Label>
            <Textarea
              id="custom-instructions"
              placeholder="Any specific requirements or focus areas you'd like us to include..."
              value={customInstructions}
              onChange={(e) => setCustomInstructions(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="min-w-[120px]"
          >
            {isRegenerating ? (
              <>
                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Regenerate
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};