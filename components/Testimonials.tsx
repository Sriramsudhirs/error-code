"use client";

import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Digital Artist",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    content: "This tool has saved me countless hours of work. The AI is incredibly accurate and the results are professional-grade.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "E-commerce Owner",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    content: "Perfect for my product photos. Fast, easy to use, and the bulk processing feature is a game-changer.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Social Media Manager",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    content: "The best free background remover I've found. Great results every time, and it's so simple to use.",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            What Our Users Say
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Join thousands of satisfied users who trust our background remover
          </p>
        </div>

        <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}