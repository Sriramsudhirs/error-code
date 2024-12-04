"use client";

import { useState, useEffect } from 'react';
import { Download, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { createBackgroundImage, analyzeImageQuality } from '@/lib/imageProcessing';

interface ProcessedImageProps {
  processedImage: string | null;
  isProcessing: boolean;
  progress: number;
  background?: string;
}

export default function ProcessedImage({ 
  processedImage, 
  isProcessing, 
  progress, 
  background = "transparent" 
}: ProcessedImageProps) {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isHD, setIsHD] = useState(false);
  const [quality, setQuality] = useState<number | null>(null);
  const [isProcessingQuality, setIsProcessingQuality] = useState(false);

  useEffect(() => {
    const updateImage = async () => {
      if (processedImage) {
        try {
          setIsProcessingQuality(true);
          
          // Create image with background if needed
          const url = background !== 'transparent' 
            ? await createBackgroundImage(processedImage, background, {
                isHD,
                quality: 100,
                format: 'png',
                compression: 9
              })
            : processedImage;
          
          setDownloadUrl(url);

          // Analyze image quality
          const qualityScore = await analyzeImageQuality(url);
          setQuality(qualityScore);
        } catch (error) {
          console.error('Error processing image:', error);
          toast.error('Failed to process image with background');
        } finally {
          setIsProcessingQuality(false);
        }
      }
    };

    updateImage();
  }, [processedImage, background, isHD]);

  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `bgremoval-result${isHD ? '-hd' : ''}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success(`Image downloaded successfully in ${isHD ? 'HD' : 'standard'} quality!`);
    }
  };

  return (
    <div 
      className="border-2 border-dashed border-gray-200 rounded-xl h-[400px] flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        ...(background !== 'transparent' && background !== 'none' && {
          backgroundImage: background.startsWith('http') ? `url(${background})` : background,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        })
      }}
    >
      {isProcessing ? (
        <div className="flex flex-col items-center gap-4 p-4">
          <Progress value={progress || 0} className="w-[60%]" />
          <p className="text-sm text-gray-600">
            Processing image... {Math.round(progress || 0)}%
          </p>
        </div>
      ) : processedImage ? (
        <>
          <div className="relative w-full h-full">
            <Image
              src={downloadUrl || processedImage}
              alt="Processed"
              fill
              className="object-contain rounded-xl"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={100}
              unoptimized={isHD}
            />
          </div>
          <div className="absolute bottom-4 right-4 flex gap-2">
            {isProcessingQuality ? (
              <div className="flex items-center gap-2 bg-white/90 px-3 py-2 rounded-md">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Processing...</span>
              </div>
            ) : quality !== null && (
              <div className="bg-white/90 px-3 py-2 rounded-md">
                <span className="text-sm font-medium">
                  Quality: {Math.round(quality * 100)}%
                </span>
              </div>
            )}
            <Button
              variant="outline"
              onClick={() => setIsHD(!isHD)}
              className="bg-white/90 hover:bg-white"
            >
              {isHD ? 'Standard' : 'HD'}
            </Button>
            <Button 
              className="shadow-lg"
              onClick={handleDownload}
              disabled={!downloadUrl}
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center p-4">
          <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">
            Your processed image will appear here
          </p>
          <Button disabled variant="secondary">
            <Download className="h-4 w-4 mr-2" />
            Download Result
          </Button>
        </div>
      )}
    </div>
  );
}