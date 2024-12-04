"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Check } from "lucide-react";

interface BackgroundPickerProps {
  onSelect: (background: string) => void;
  selected: string;
}

const PRESET_BACKGROUNDS = [
  { id: "transparent", name: "Transparent", color: "transparent" },
  { id: "white", name: "White", color: "#ffffff" },
  { id: "black", name: "Black", color: "#000000" },
  { id: "gradient1", name: "Blue Gradient", gradient: "linear-gradient(to right, #2193b0, #6dd5ed)" },
  { id: "gradient2", name: "Purple Gradient", gradient: "linear-gradient(to right, #8e2de2, #4a00e0)" },
  { id: "gradient3", name: "Sunset", gradient: "linear-gradient(to right, #f12711, #f5af19)" },
];

const PRESET_IMAGES = [
  { id: "office", name: "Office", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop" },
  { id: "nature", name: "Nature", url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&auto=format&fit=crop" },
  { id: "studio", name: "Studio", url: "https://images.unsplash.com/photo-1621784563330-caee0b138a00?w=800&auto=format&fit=crop" },
];

export default function BackgroundPicker({ onSelect, selected }: BackgroundPickerProps) {
  const [customColor, setCustomColor] = useState("#ffffff");
  const [customImage, setCustomImage] = useState("");

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Solid Colors & Gradients</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {PRESET_BACKGROUNDS.map((bg) => (
            <Button
              key={bg.id}
              variant="outline"
              className="h-24 relative"
              style={{
                background: bg.gradient || bg.color,
                border: bg.id === "transparent" ? "2px dashed #ccc" : undefined,
              }}
              onClick={() => onSelect(bg.id)}
            >
              {selected === bg.id && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                  <Check className="h-6 w-6 text-white" />
                </div>
              )}
            </Button>
          ))}
        </div>

        <div className="mt-6">
          <Label htmlFor="custom-color">Custom Color</Label>
          <div className="flex gap-2 mt-2">
            <Input
              id="custom-color"
              type="color"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
            />
            <Button onClick={() => onSelect(customColor)}>Apply</Button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Background Images</h3>
        <div className="grid grid-cols-2 gap-4">
          {PRESET_IMAGES.map((img) => (
            <Button
              key={img.id}
              variant="outline"
              className="h-32 relative overflow-hidden"
              style={{
                backgroundImage: `url(${img.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              onClick={() => onSelect(img.url)}
            >
              {selected === img.url && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <Check className="h-6 w-6 text-white" />
                </div>
              )}
            </Button>
          ))}
        </div>

        <div className="mt-6">
          <Label htmlFor="custom-image">Custom Image URL</Label>
          <div className="flex gap-2 mt-2">
            <Input
              id="custom-image"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={customImage}
              onChange={(e) => setCustomImage(e.target.value)}
            />
            <Button onClick={() => onSelect(customImage)}>Apply</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}