"use client";

import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const pricingTiers = [
  { 
    name: 'Hobby', 
    price: '$0', 
    features: ['5 images per month', 'Basic editing tools', 'Email support']
  },
  { 
    name: 'Pro', 
    price: '$19', 
    features: ['100 images per month', 'Advanced editing tools', 'Priority support', 'API access']
  },
  { 
    name: 'Enterprise', 
    price: 'Custom', 
    features: ['Unlimited images', 'Custom integration', '24/7 dedicated support', 'On-premise deployment option']
  }
];

export default function PricingSection() {
  return (
    <div className="mt-20">
      <h2 className="text-3xl font-extrabold text-gray-900 text-center">Pricing Plans</h2>
      <p className="mt-4 max-w-2xl mx-auto text-center text-xl text-gray-500">
        Choose the perfect plan for your needs
      </p>
      <div className="mt-12 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
        {pricingTiers.map((tier) => (
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
  );
}