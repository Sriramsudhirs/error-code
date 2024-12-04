"use client";

import { Card } from '@/components/ui/card';
import { 
  Zap, 
  Image, 
  Upload, 
  Link2, 
  Download, 
  Layers,
  Smartphone,
  Cloud
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Get results in seconds with our optimized AI processing'
  },
  {
    icon: Image,
    title: 'High Quality Results',
    description: 'Precise edge detection for professional-looking images'
  },
  {
    icon: Upload,
    title: 'Bulk Processing',
    description: 'Process multiple images at once to save time'
  },
  {
    icon: Link2,
    title: 'URL Support',
    description: 'Remove backgrounds from online images directly'
  },
  {
    icon: Download,
    title: 'Free Downloads',
    description: 'Download processed images in high quality PNG format'
  },
  {
    icon: Layers,
    title: 'Background Options',
    description: 'Choose transparent, solid color, or custom backgrounds'
  },
  {
    icon: Smartphone,
    title: 'Mobile Friendly',
    description: 'Works perfectly on all devices and screen sizes'
  },
  {
    icon: Cloud,
    title: 'No Installation',
    description: 'Use directly in your browser, no software needed'
  }
];

export default function Features() {
  return (
    <section id="features" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Why Choose Our Background Remover?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Professional-grade features, completely free to use
          </p>
        </div>

        <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-blue-500 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-300"></div>
                <feature.icon className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}