"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import VideoProcessor from '@/components/VideoProcessor';
import ImageUploader from '@/components/ImageUploader';
import ProcessedImage from '@/components/ProcessedImage';
import { removeBackground } from '@imgly/background-removal';
import { toast } from 'sonner';

export default function LandingPageClient() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<'video' | 'image'>('video');

  const handleImageSelect = async (file: File, preview: string) => {
    setFile(file);
    setPreview(preview);
    setProcessedImage(null);
    setProgress(0);

    if (file) {
      try {
        setIsProcessing(true);
        toast.info("Starting background removal...");
        
        const blob = await removeBackground(file, {
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
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-blue-600">BackgroundBegone</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Home</a>
                <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Tools</a>
                <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Pricing</a>
                <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Blog</a>
              </div>
            </div>
            <div className="hidden md:block">
              <Button variant="outline" className="mr-2">Log in</Button>
              <Button>Sign up</Button>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Remove Background from</span>
                <span className="block text-blue-600">Video and Images</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Effortlessly remove backgrounds from your videos and images with our AI-powered tool. Fast, accurate, and easy to use.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <Button size="lg" className="w-full">Get Started</Button>
                </div>
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                  <Button variant="outline" size="lg" className="w-full">Learn More</Button>
                </div>
              </div>
            </div>

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
                      />
                    </Card>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-20">
              <h2 className="text-3xl font-extrabold text-gray-900 text-center">Pricing Plans</h2>
              <p className="mt-4 max-w-2xl mx-auto text-center text-xl text-gray-500">
                Choose the perfect plan for your needs
              </p>
              <div className="mt-12 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
                {[
                  { name: 'Hobby', price: '$0', features: ['5 images per month', 'Basic editing tools', 'Email support'] },
                  { name: 'Pro', price: '$19', features: ['100 images per month', 'Advanced editing tools', 'Priority support', 'API access'] },
                  { name: 'Enterprise', price: 'Custom', features: ['Unlimited images', 'Custom integration', '24/7 dedicated support', 'On-premise deployment option'] },
                ].map((tier) => (
                  <div key={tier.name} className="relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900">{tier.name}</h3>
                      {tier.name === 'Enterprise' ? (
                        <p className="mt-4 flex items-baseline text-gray-900">
                          <span className="text-5xl font-extrabold tracking-tight">{tier.price}</span>
                        </p>
                      ) : (
                        <p className="mt-4 flex items-baseline text-gray-900">
                          <span className="text-5xl font-extrabold tracking-tight">{tier.price}</span>
                          <span className="ml-1 text-xl font-semibold">/month</span>
                        </p>
                      )}
                      <ul className="mt-6 space-y-6">
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex">
                            <CheckCircle className="flex-shrink-0 w-6 h-6 text-green-500" />
                            <span className="ml-3 text-gray-500">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button className="mt-8" variant={tier.name === 'Pro' ? 'default' : 'outline'}>
                      {tier.name === 'Enterprise' ? 'Contact sales' : 'Get started'}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-20">
              <h2 className="text-3xl font-extrabold text-gray-900 text-center">Why Choose BackgroundBegone?</h2>
              <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { title: 'AI-Powered Accuracy', description: 'Our advanced AI ensures precise background removal for any image or video.' },
                  { title: 'Lightning Fast', description: 'Get results in seconds, not minutes. Perfect for high-volume processing.' },
                  { title: 'Easy Integration', description: 'Seamlessly integrate with your existing workflow using our robust API.' },
                  { title: 'Secure & Private', description: 'Your data is encrypted and never shared. We prioritize your privacy.' },
                  { title: '24/7 Support', description: 'Our expert team is always available to assist you with any questions.' },
                  { title: 'Continuous Improvement', description: 'We regularly update our AI models to provide even better results.' },
                ].map((feature) => (
                  <div key={feature.title} className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-6">
                      <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                      <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-20 bg-blue-700 rounded-lg shadow-xl overflow-hidden">
              <div className="px-6 py-12 max-w-xl mx-auto sm:px-10 sm:py-16 lg:max-w-full lg:px-20 lg:py-20">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">Ready to get started?</span>
                  <span className="block text-blue-200">Try BackgroundBegone today.</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-blue-200">
                  Join thousands of satisfied customers who have transformed their images and videos with our AI-powered background removal tool.
                </p>
                <Button className="mt-8 bg-white text-blue-600 hover:bg-blue-50" size="lg">
                  Start your free trial
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              &copy; 2023 BackgroundBegone, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}