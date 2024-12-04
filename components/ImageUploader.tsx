"use client";

import { useState } from "react";
import { Upload, Image as ImageIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  onImageSelect: (file: File, preview: string) => void;
  preview: string | null;
  isProcessing: boolean;
}

export default function ImageUploader({ onImageSelect, preview, isProcessing }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type.startsWith("image/")) {
      processFile(droppedFile);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      onImageSelect(file, reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-xl h-[400px] flex flex-col items-center justify-center p-8 transition-colors",
        isDragging ? "border-blue-500 bg-blue-50" : "border-gray-200",
        preview ? "border-none p-0" : ""
      )}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      {preview ? (
        <div className="relative w-full h-full">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-contain rounded-xl"
          />
          {!isProcessing && (
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-4 right-4"
              onClick={() => onImageSelect(null as any, null as any)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      ) : (
        <>
          <ImageIcon className="h-16 w-16 text-gray-400 mb-4" />
          <p className="text-gray-600 text-center mb-4">
            Drag and drop your image here, or click to select
          </p>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="file-input"
            onChange={handleFileInput}
          />
          <Button asChild>
            <label htmlFor="file-input" className="cursor-pointer">
              <Upload className="h-4 w-4 mr-2" />
              Upload Image
            </label>
          </Button>
        </>
      )}
    </div>
  );
}