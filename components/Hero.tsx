"use client";

import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const scrollToTools = () => {
    const toolsSection = document.querySelector('#tools');
    toolsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="text-center py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
        <span className="block">Free Background Removal</span>
        <span className="block text-blue-600">In Seconds</span>
      </h1>
      <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
        Remove backgrounds from images instantly with our AI-powered tool. 
        No signup required. 100% free for basic use.
      </p>
      <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
        <Button
          size="lg"
          className="w-full sm:w-auto animate-pulse"
          onClick={scrollToTools}
        >
          Start Removing Background
          <ArrowDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      {/* Trust Indicators */}
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">1M+</div>
          <div className="text-sm text-gray-600">Images Processed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">4.9/5</div>
          <div className="text-sm text-gray-600">User Rating</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">100%</div>
          <div className="text-sm text-gray-600">Free to Try</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">5s</div>
          <div className="text-sm text-gray-600">Average Process Time</div>
        </div>
      </div>
    </div>
  );
}