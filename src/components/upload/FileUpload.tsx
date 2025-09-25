import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, File, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface UploadedFile {
  id: string;
  file: File;
  status: 'uploading' | 'success' | 'error';
  progress: number;
  error?: string;
}

interface FileUploadProps {
  onFilesUploaded: (files: UploadedFile[]) => void;
  uploadedFiles: UploadedFile[];
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFilesUploaded,
  uploadedFiles,
  className
}) => {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      status: 'uploading' as const,
      progress: 0
    }));

    onFilesUploaded([...uploadedFiles, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach((uploadFile, index) => {
      setTimeout(() => {
        const interval = setInterval(() => {
          uploadFile.progress += 10;
          if (uploadFile.progress >= 100) {
            uploadFile.status = 'success';
            uploadFile.progress = 100;
            clearInterval(interval);
          }
        }, 100);
      }, index * 200);
    });
  }, [uploadedFiles, onFilesUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'text/csv': ['.csv'],
      'application/pdf': ['.pdf']
    },
    multiple: true
  });

  const removeFile = (fileId: string) => {
    const updatedFiles = uploadedFiles.filter(f => f.id !== fileId);
    onFilesUploaded(updatedFiles);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Upload Area */}
      <Card
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed cursor-pointer transition-all duration-200",
          isDragActive || dragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50"
        )}
      >
        <CardContent className="flex flex-col items-center justify-center py-12 px-6">
          <input {...getInputProps()} />
          <Upload className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Upload Financial Documents</h3>
          <p className="text-muted-foreground text-center mb-4">
            Drag & drop your files here, or click to browse
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Supported formats: .xlsx, .csv, .pdf
          </p>
          <Button variant="outline" size="sm">
            Choose Files
          </Button>
        </CardContent>
      </Card>

      {/* File List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-muted-foreground">Uploaded Files</h4>
          {uploadedFiles.map((uploadFile) => (
            <Card key={uploadFile.id} className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <File className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {uploadFile.file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(uploadFile.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {uploadFile.status === 'uploading' && (
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  )}
                  {uploadFile.status === 'success' && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                  {uploadFile.status === 'error' && (
                    <XCircle className="h-4 w-4 text-destructive" />
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(uploadFile.id)}
                    className="h-8 w-8 p-0"
                  >
                    <XCircle className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {uploadFile.status === 'uploading' && (
                <div className="mt-2">
                  <div className="w-full bg-muted rounded-full h-1">
                    <div
                      className="bg-primary h-1 rounded-full transition-all duration-300"
                      style={{ width: `${uploadFile.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {uploadFile.status === 'error' && uploadFile.error && (
                <p className="text-xs text-destructive mt-1">{uploadFile.error}</p>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};