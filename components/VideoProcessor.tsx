"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, Video, Download, X } from "lucide-react";
import { toast } from "sonner";

export default function VideoProcessor() {
  const [video, setVideo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [processedVideo, setProcessedVideo] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("video/")) {
        toast.error("Please select a valid video file");
        return;
      }
      setVideo(file);
      const url = URL.createObjectURL(file);
      setPreview(url);
      setProcessedVideo(null);
    }
  };

  const processVideo = async () => {
    if (!video) return;

    setIsProcessing(true);
    setProgress(0);
    toast.info("Starting video processing...");

    try {
      // Simulate video processing with progress updates
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProgress(i);
      }

      // For demonstration, we'll just use the original video
      // In a real implementation, you would process the video here
      setProcessedVideo(preview);
      toast.success("Video processing completed!");
    } catch (error) {
      console.error("Error processing video:", error);
      toast.error("Failed to process video. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (processedVideo) {
      const link = document.createElement('a');
      link.href = processedVideo;
      link.download = 'processed-video.mp4';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-8">
          <input
            type="file"
            accept="video/*"
            className="hidden"
            id="video-input"
            onChange={handleVideoSelect}
            disabled={isProcessing}
          />
          <Video className="h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600 text-center mb-4">
            Upload your video to remove the background
          </p>
          <Button asChild disabled={isProcessing}>
            <label htmlFor="video-input">Select Video</label>
          </Button>
        </div>
      </Card>

      {(preview || isProcessing || processedVideo) && (
        <Card className="p-6">
          <div className="relative">
            {!isProcessing && (
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 z-10"
                onClick={() => {
                  setVideo(null);
                  setPreview(null);
                  setProcessedVideo(null);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            <video
              src={processedVideo || preview || undefined}
              className="w-full rounded-lg"
              controls
              style={{ maxHeight: "400px" }}
            />
          </div>

          {isProcessing ? (
            <div className="mt-4">
              <Progress value={progress} className="mb-2" />
              <p className="text-sm text-gray-600 text-center">
                Processing video... {progress}%
              </p>
            </div>
          ) : (
            <div className="mt-4 flex justify-end space-x-4">
              {!processedVideo && (
                <Button onClick={processVideo} disabled={!video}>
                  Process Video
                </Button>
              )}
              {processedVideo && (
                <Button onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Result
                </Button>
              )}
            </div>
          )}
        </Card>
      )}
    </div>
  );
}