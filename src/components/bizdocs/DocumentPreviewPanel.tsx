import { useState } from 'react';
import { DocumentTemplate } from '@/pages/BizDocs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RegenerateDialog } from './RegenerateDialog';
import { detailedMockContent } from './mockContent';
import { 
  Sparkles, 
  Download, 
  FileText, 
  RotateCcw, 
  Lightbulb,
  X,
  Settings
} from 'lucide-react';

interface DocumentPreviewPanelProps {
  selectedTemplate: DocumentTemplate | null;
  onClose: () => void;
}

export const DocumentPreviewPanel = ({ selectedTemplate, onClose }: DocumentPreviewPanelProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [showRegenerateDialog, setShowRegenerateDialog] = useState(false);
  const [currentEmphasis, setCurrentEmphasis] = useState('growth');

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

  const previewData = detailedMockContent[selectedTemplate.id as keyof typeof detailedMockContent];
  const Icon = selectedTemplate.icon;

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGenerated(true);
    }, 2000);
  };

  const handleRegenerate = (emphasis: string, customInstructions?: string) => {
    setCurrentEmphasis(emphasis);
    setGenerated(true); // Keep the generated state but with new emphasis
  };

  const handleQuickRegenerate = () => {
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
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-primary">{previewData.title}</h4>
                <Badge variant="outline" className="text-xs">
                  Emphasis: {currentEmphasis.charAt(0).toUpperCase() + currentEmphasis.slice(1)}
                </Badge>
              </div>
              
              <ScrollArea className="h-80 w-full rounded-lg border bg-card p-4">
                <div className="text-sm space-y-2 whitespace-pre-line leading-relaxed">
                  {previewData.content}
                </div>
              </ScrollArea>
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
                  onClick={handleQuickRegenerate}
                  variant="outline"
                  className="flex-1"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Quick Regenerate
                </Button>

                <Button 
                  onClick={() => setShowRegenerateDialog(true)}
                  variant="outline"
                  className="flex-1"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Regenerate with...
                </Button>
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

      <RegenerateDialog
        isOpen={showRegenerateDialog}
        onClose={() => setShowRegenerateDialog(false)}
        onRegenerate={handleRegenerate}
        documentType={selectedTemplate.title}
      />
    </Card>
  );
};