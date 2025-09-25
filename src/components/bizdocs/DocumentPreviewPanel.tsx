import { useState } from 'react';
import { DocumentTemplate } from '@/pages/BizDocs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { 
  Sparkles, 
  Download, 
  FileText, 
  RotateCcw, 
  Lightbulb,
  X
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface DocumentPreviewPanelProps {
  selectedTemplate: DocumentTemplate | null;
  onClose: () => void;
}

const mockPreviewContent = {
  'project-proposal': {
    title: 'Q1 Growth Initiative Proposal',
    content: [
      '📋 Executive Summary',
      '• Revenue target: $250K increase',
      '• Timeline: 90 days',
      '• Key milestones: 3 phases',
      '',
      '🎯 Phase 1: Market Research',
      '• Customer survey deployment',
      '• Competitor analysis',
      '• Market sizing validation'
    ],
    aiInsight: 'Based on your FailSafe metrics, we emphasized customer acquisition costs. Want us to pivot toward retention strategies instead?'
  },
  'pitch-deck': {
    title: 'Series A Pitch Deck',
    content: [
      '🚀 Slide 1: Problem & Solution',
      '• Market pain point identified',
      '• Your unique solution approach',
      '',
      '📊 Slide 2: Market Opportunity',
      '• $2.5B addressable market',
      '• 12% annual growth rate',
      '',
      '💰 Slide 3: Business Model',
      '• SaaS subscription revenue',
      '• $150 average monthly value'
    ],
    aiInsight: 'Based on your Failsafe metrics, we emphasized customer traction in Slide 2. Want us to pivot toward funding ask instead?'
  },
  'business-profile': {
    title: 'Company One-Pager',
    content: [
      '🏢 Company Overview',
      '• Founded: 2023',
      '• Mission: Streamline business operations',
      '• Vision: AI-powered efficiency',
      '',
      '📈 Key Metrics',
      '• 150+ active customers',
      '• 95% customer satisfaction',
      '• 40% month-over-month growth'
    ],
    aiInsight: 'We highlighted your growth metrics prominently. Should we focus more on your unique technology advantages?'
  },
  'investor-memo': {
    title: 'Investment Opportunity Brief',
    content: [
      '💼 Investment Thesis',
      '• Large market opportunity',
      '• Proven product-market fit',
      '• Experienced founding team',
      '',
      '📊 Traction Highlights',
      '• 300% revenue growth YoY',
      '• Enterprise client pipeline',
      '• Strategic partnerships secured'
    ],
    aiInsight: 'We emphasized financial metrics based on your data. Want to highlight team experience or market timing instead?'
  }
};

export const DocumentPreviewPanel = ({ selectedTemplate, onClose }: DocumentPreviewPanelProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  if (!selectedTemplate) {
    return (
      <Card className="h-fit">
        <CardContent className="p-12 text-center">
          <FileText className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            Select a Template
          </h3>
          <p className="text-sm text-muted-foreground">
            Choose a document template to see a preview and start generating.
          </p>
        </CardContent>
      </Card>
    );
  }

  const previewData = mockPreviewContent[selectedTemplate.id as keyof typeof mockPreviewContent];
  const Icon = selectedTemplate.icon;

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGenerated(true);
    }, 2000);
  };

  const handleRegenerate = () => {
    setGenerated(false);
    handleGenerate();
  };

  return (
    <Card className="h-fit">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{selectedTemplate.title}</CardTitle>
              <Badge variant="outline" className="mt-1">
                {selectedTemplate.category}
              </Badge>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Preview Content */}
        {!generated ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {selectedTemplate.description}
            </p>
            
            <div className="bg-muted/50 rounded-lg p-4 border-2 border-dashed">
              <p className="text-sm text-muted-foreground text-center">
                Preview will appear here after generation
              </p>
            </div>

            <Button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Document
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Generated Preview */}
            <div className="bg-card border rounded-lg p-4 space-y-3">
              <h4 className="font-semibold text-primary">{previewData.title}</h4>
              <div className="text-sm space-y-1">
                {previewData.content.map((line, index) => (
                  <div key={index} className={line === '' ? 'h-2' : ''}>
                    {line}
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insight */}
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertDescription className="text-sm">
                📌 {previewData.aiInsight}
              </AlertDescription>
            </Alert>

            <Separator />

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="flex gap-2">
                <Button 
                  onClick={handleRegenerate}
                  variant="outline"
                  className="flex-1"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Regenerate
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Regenerate with...
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleRegenerate()}>
                      Sustainability Focus
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleRegenerate()}>
                      Growth Emphasis
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleRegenerate()}>
                      Revenue Focus
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleRegenerate()}>
                      Brand Identity
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Export Options */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Export Options:</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="w-4 h-4 mr-1" />
                    PDF
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="w-4 h-4 mr-1" />
                    PPT
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="w-4 h-4 mr-1" />
                    Docs
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};