"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import VideoProcessor from './VideoProcessor';
import ImageProcessor from './ImageProcessor';

export default function ToolSelector() {
  const [activeTab, setActiveTab] = useState<'video' | 'image'>('video');

  return (
    <div className="mt-10">
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="px-2 bg-white text-sm text-gray-500">
            Choose your tool
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div 
          className={`bg-white overflow-hidden shadow rounded-lg cursor-pointer transition-all ${activeTab === 'video' ? 'ring-2 ring-blue-500' : ''}`}
          onClick={() => setActiveTab('video')}
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Remove Video Background
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      AI-powered video processing
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div 
          className={`bg-white overflow-hidden shadow rounded-lg cursor-pointer transition-all ${activeTab === 'image' ? 'ring-2 ring-blue-500' : ''}`}
          onClick={() => setActiveTab('image')}
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Remove Image Background
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      Instant background removal
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        {activeTab === 'video' ? (
          <VideoProcessor />
        ) : (
          <ImageProcessor />
        )}
      </div>
    </div>
  );
}