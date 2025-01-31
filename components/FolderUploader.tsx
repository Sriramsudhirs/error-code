"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Folder, X, Download } from "lucide-react";
import { removeBackground } from "@imgly/background-removal";
import { toast } from "sonner";
import Image from "next/image";
import JSZip from "jszip";

interface ProcessingImage {
  file: File;
  preview: string;
  progress: number;
  processed?: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
}

export default function FolderUploader() {
  const [images, setImages] = useState<ProcessingImage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [totalProgress, setTotalProgress] = useState(0);

  const handleFolderSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      toast.error('No image files found in the selected folder');
      return;
    }

    const newImages = imageFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
      status: 'pending' as const
    }));

    setImages(prev => [...prev, ...newImages]);
    toast.success(`${imageFiles.length} images found in folder`);
  };

  const processAllImages = async () => {
    setIsProcessing(true);
    setTotalProgress(0);
    toast.info(`Processing ${images.length} images...`);

    let completed = 0;

    for (let i = 0; i < images.length; i++) {
      if (images[i].status !== 'completed') {
        try {
          setImages(prev => prev.map((img, idx) => 
            idx === i ? { ...img, status: 'processing' } : img
          ));

          const blob = await removeBackground(images[i].file, {
            progress: (p) => {
              setImages(prev => prev.map((img, idx) => 
                idx === i ? { ...img, progress: Math.round(p * 100) } : img
              ));
              setTotalProgress((completed + p) / images.length * 100);
            },
          });

          const url = URL.createObjectURL(blob);
          setImages(prev => prev.map((img, idx) => 
            idx === i ? { ...img, processed: url, status: 'completed' } : img
          ));
          completed++;
        } catch (error) {
          setImages(prev => prev.map((img, idx) => 
            idx === i ? { ...img, status: 'error' } : img
          ));
          toast.error(`Failed to process ${images[i].file.name}`);
        }
      }
    }

    setIsProcessing(false);
    toast.success('Folder processing completed!');
  };

  const downloadAll = async () => {
    const zip = new JSZip();
    const processedImages = images.filter(img => img.processed);
    
    if (processedImages.length === 0) {
      toast.error('No processed images to download');
      return;
    }

    toast.info('Preparing download...');

    for (let i = 0; i < processedImages.length; i++) {
      const img = processedImages[i];
      const response = await fetch(img.processed!);
      const blob = await response.blob();
      zip.file(`processed-${img.file.name}`, blob);
    }

    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'processed-folder.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Download started!');
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-8">
          <input
            type="file"
            webkitdirectory=""
            directory=""
            multiple
            className="hidden"
            id="folder-input"
            onChange={handleFolderSelect}
          />
          <Folder className="h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600 text-center mb-4">
            Select a folder containing images to process
          </p>
          <Button asChild>
            <label htmlFor="folder-input">Select Folder</label>
          </Button>
        </div>
      </Card>

      {images.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">
              {images.length} Image{images.length !== 1 ? 's' : ''} from Folder
            </h3>
            <div className="space-x-4">
              <Button
                onClick={processAllImages}
                disabled={isProcessing}
              >
                Process Folder
              </Button>
              <Button
                variant="outline"
                onClick={downloadAll}
                disabled={!images.some(img => img.processed)}
              >
                <Download className="h-4 w-4 mr-2" />
                Download All
              </Button>
            </div>
          </div>

          {isProcessing && (
            <Card className="p-4">
              <p className="text-sm font-medium mb-2">Total Progress</p>
              <Progress value={totalProgress} />
              <p className="text-sm text-gray-600 mt-2">
                {Math.round(totalProgress)}% Complete
              </p>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <Card key={index} className="p-4 relative">
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 z-10"
                  onClick={() => setImages(prev => prev.filter((_, i) => i !== index))}
                >
                  <X className="h-4 w-4" />
                </Button>
                <div className="relative h-48 mb-4">
                  <Image
                    src={image.processed || image.preview}
                    alt={`Image ${index + 1}`}
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
                {image.status === 'processing' && (
                  <Progress value={image.progress} className="mb-2" />
                )}
                <p className="text-sm text-gray-600 truncate">
                  {image.file.name}
                </p>
                <p className="text-sm font-medium mt-1">
                  {image.status === 'completed' && '✅ Completed'}
                  {image.status === 'processing' && '⏳ Processing...'}
                  {image.status === 'error' && '❌ Failed'}
                  {image.status === 'pending' && '⏳ Pending'}
                </p>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}