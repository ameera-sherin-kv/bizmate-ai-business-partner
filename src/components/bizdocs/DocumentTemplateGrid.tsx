import { DocumentTemplate } from '@/pages/BizDocs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

interface DocumentTemplateGridProps {
  templates: DocumentTemplate[];
  onSelectTemplate: (template: DocumentTemplate) => void;
  selectedTemplate: DocumentTemplate | null;
}

export const DocumentTemplateGrid = ({ 
  templates, 
  onSelectTemplate, 
  selectedTemplate 
}: DocumentTemplateGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {templates.map((template) => {
        const Icon = template.icon;
        const isSelected = selectedTemplate?.id === template.id;
        
        return (
          <Card 
            key={template.id}
            className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg group ${
              isSelected 
                ? 'ring-2 ring-primary shadow-lg bg-primary/5' 
                : 'hover:shadow-md'
            }`}
            onClick={() => onSelectTemplate(template)}
          >
            <CardContent className="p-6 space-y-4">
              {/* Icon and Category */}
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-lg transition-colors ${
                  isSelected 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted group-hover:bg-primary/10'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <Badge variant="secondary" className="text-xs">
                  {template.category}
                </Badge>
              </div>

              {/* Title and Description */}
              <div className="space-y-2">
                <h3 className={`font-semibold text-lg transition-colors ${
                  isSelected ? 'text-primary' : 'text-foreground'
                }`}>
                  {template.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {template.description}
                </p>
              </div>

              {/* Time Estimate */}
              <div className="flex items-center gap-1 text-xs text-muted-foreground pt-2 border-t">
                <Clock className="w-3 h-3" />
                <span>Est. {template.estimatedTime}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};