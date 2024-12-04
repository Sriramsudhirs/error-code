"use client";

import { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import ImageUploader from './ImageUploader';
import ProcessedImage from './ProcessedImage';
import BackgroundPicker from './BackgroundPicker';
import { removeBackground } from '@imgly/background-removal';
import { toast } from 'sonner';
import imageCompression from 'browser-image-compression';

export default function ImageProcessor() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedBackground, setSelectedBackground] = useState("transparent");

  const compressImage = async (file: File) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };
    try {
      return await imageCompression(file, options);
    } catch (error) {
      console.error('Error compressing image:', error);
      return file;
    }
  };

  const handleImageSelect = useCallback(async (file: File, preview: string) => {
    setFile(file);
    setPreview(preview);
    setProcessedImage(null);
    setProgress(0);

    if (file) {
      try {
        setIsProcessing(true);
        toast.info("Optimizing image...");
        
        const compressedFile = await compressImage(file);
        toast.info("Removing background...");
        
        const blob = await removeBackground(compressedFile, {
          progress: (p) => {
            setProgress(Math.round(p * 100));
          },
        });
        
        const url = URL.createObjectURL(blob);
        setProcessedImage(url);
        toast.success("Background removed successfully!");
      } catch (error) {
        console.error("Error removing background:", error);
        toast.error("Failed to process image. Please try again.");
      } finally {
        setIsProcessing(false);
      }
    }
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
          <ImageUploader
            onImageSelect={handleImageSelect}
            preview={preview}
            isProcessing={isProcessing}
          />
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Result</h2>
          <ProcessedImage
            processedImage={processedImage}
            isProcessing={isProcessing}
            progress={progress}
            background={selectedBackground}
          />
        </Card>
      </div>

      {processedImage && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Choose Background</h2>
          <BackgroundPicker
            onSelect={setSelectedBackground}
            selected={selectedBackground}
          />
        </Card>
      )}
    </div>
  );
}