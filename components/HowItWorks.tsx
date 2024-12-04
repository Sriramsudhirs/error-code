"use client";

import { Card } from '@/components/ui/card';
import { Upload, Wand2, Download } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: 'Upload Your Image',
    description: 'Choose a single image, multiple images, or even an entire folder. Supports all major image formats.'
  },
  {
    icon: Wand2,
    title: 'AI Processing',
    description: 'Our advanced AI technology automatically detects and removes the background with high precision.'
  },
  {
    icon: Download,
    title: 'Download Result',
    description: 'Get your processed image with transparent background in high-quality PNG format, ready to use.'
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Remove backgrounds in three simple steps
          </p>
        </div>

        <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={index} className="relative overflow-hidden">
              <div className="p-6">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-blue-500 rounded-full opacity-10"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                    <step.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
                <div className="absolute bottom-0 right-0 text-9xl font-bold text-gray-100 -mb-6 -mr-6">
                  {index + 1}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}