"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { removeBackground } from "@imgly/background-removal";
import { Download, Link, Loader2 } from "lucide-react";
import Image from "next/image";

export default function ImageLinkProcessor() {
  const [imageUrl, setImageUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processedImage, setProcessedImage] = useState<string | null>(null);

  const processImageUrl = async () => {
    if (!imageUrl) {
      toast.error("Please enter an image URL");
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      if (!blob.type.startsWith('image/')) {
        throw new Error('Invalid image URL');
      }

      toast.info("Processing image from URL...");
      
      const processedBlob = await removeBackground(blob, {
        progress: (p) => {
          setProgress(Math.round(p * 100));
        },
      });
      
      const url = URL.createObjectURL(processedBlob);
      setProcessedImage(url);
      toast.success("Background removed successfully!");
    } catch (error) {
      console.error("Error processing image:", error);
      toast.error("Failed to process image. Please check the URL and try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (processedImage) {
      const link = document.createElement('a');
      link.href = processedImage;
      link.download = 'removed-background.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Process Image from URL</h3>
        <div className="flex gap-2">
          <Input
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            disabled={isProcessing}
          />
          <Button onClick={processImageUrl} disabled={isProcessing}>
            {isProcessing ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Link className="h-4 w-4 mr-2" />
            )}
            Process
          </Button>
        </div>
      </Card>

      {(isProcessing || processedImage) && (
        <Card className="p-6">
          <div className="relative h-[300px]">
            {isProcessing ? (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <Progress value={progress} className="w-[60%]" />
                <p className="text-sm text-gray-600">Processing image... {progress}%</p>
              </div>
            ) : processedImage && (
              <>
                <Image
                  src={processedImage}
                  alt="Processed"
                  fill
                  className="object-contain rounded-lg"
                />
                <Button
                  className="absolute bottom-4 right-4"
                  onClick={handleDownload}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Result
                </Button>
              </>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}