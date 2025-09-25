import { useState } from 'react';
import { DocumentTemplateGrid } from '@/components/bizdocs/DocumentTemplateGrid';
import { DocumentPreviewPanel } from '@/components/bizdocs/DocumentPreviewPanel';
import { ProductDemo } from '@/components/bizdocs/ProductDemo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { FileText, Sparkles, Play, ArrowLeft } from 'lucide-react';

export interface DocumentTemplate {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  category: string;
  estimatedTime: string;
}

export const documentTemplates: DocumentTemplate[] = [
  {
    id: 'project-proposal',
    title: 'Project Proposal',
    description: 'AI-generated project plan with milestones and goals',
    icon: FileText,
    category: 'Planning',
    estimatedTime: '2 min'
  },
  {
    id: 'pitch-deck',
    title: 'Pitch Deck',
    description: '3-5 investor-ready slides using your live data',
    icon: Sparkles,
    category: 'Investment',
    estimatedTime: '3 min'
  },
  {
    id: 'business-profile',
    title: 'Business Profile',
    description: 'One-pager introducing your brand and mission',
    icon: FileText,
    category: 'Marketing',
    estimatedTime: '1 min'
  },
  {
    id: 'investor-memo',
    title: 'Investor Memo',
    description: 'Market analysis, traction, and funding ask brief',
    icon: FileText,
    category: 'Investment',
    estimatedTime: '4 min'
  }
];

const BizDocs = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Back to Dashboard CTA */}
        <div className="flex justify-start">
          <Link to="/dashboard">
            <Button variant="ghost" className="flex items-center gap-2 hover-scale">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-gradient-to-r from-primary to-primary/80 p-3 rounded-lg shadow-lg">
              <FileText className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              BizDocs
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your AI Document Partner. Proposals, decks, and profiles, generated in minutes, not months.
          </p>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="templates" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Document Templates
            </TabsTrigger>
            <TabsTrigger value="demo" className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              Interactive Financial Intelligence
            </TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Templates Grid */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      Document Templates
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DocumentTemplateGrid 
                      templates={documentTemplates}
                      onSelectTemplate={setSelectedTemplate}
                      selectedTemplate={selectedTemplate}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Preview Panel */}
              <div className="lg:col-span-1">
                <DocumentPreviewPanel 
                  selectedTemplate={selectedTemplate}
                  onClose={() => setSelectedTemplate(null)}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="demo">
            <ProductDemo />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BizDocs;