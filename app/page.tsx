'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Car, Bike, Package, Star, Shield, Clock, Phone } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Truck className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">BridgeLine Xpress LLC</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-900 hover:text-blue-600 transition-colors">Home</Link>
              <Link href="/quote" className="text-gray-900 hover:text-blue-600 transition-colors">Get Quote</Link>
              <Link href="/admin" className="text-gray-900 hover:text-blue-600 transition-colors">Admin</Link>
              <Button asChild>
                <Link href="/quote">Get Started</Link>
              </Button>
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-900">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" className="block px-3 py-2 text-gray-900 hover:text-blue-600">Home</Link>
              <Link href="/quote" className="block px-3 py-2 text-gray-900 hover:text-blue-600">Get Quote</Link>
              <Link href="/admin" className="block px-3 py-2 text-gray-900 hover:text-blue-600">Admin</Link>
            </div>
          </div>
        )}
      </nav>

  {/* Hero Section */}
<section
  className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: "url('/images/hero-bg.png')" }}
>
  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/40"></div>

  {/* Content over the image */}
  <div className="relative z-10 max-w-7xl mx-auto">
    <div className="text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
        Professional Vehicle Transportation
        <span className="block text-blue-400">Across America</span>
      </h1>
      <p className="text-xl text-gray-100 mb-8 max-w-3xl mx-auto">
        Fast, reliable, and secure transportation services for cars, motorcycles, and heavy equipment. 
        Get your instant quote today and experience the BridgeLine difference.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" asChild className="bg-white text-black-600 hover:bg-white-100 animate-bounce-slow">
          <Link href="/quote">Get Instant Quote</Link>
        </Button>
      </div>
    </div>
  </div>
</section>


      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Transportation Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We specialize in safe and efficient transportation of various vehicle types across the United States
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="text-center">
                <Car className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Car Transportation</CardTitle>
                <CardDescription>Secure enclosed and open carrier services for all car models</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Door-to-door service</li>
                  <li>• Fully insured transport</li>
                  <li>• Real-time tracking</li>
                  <li>• Competitive pricing</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="text-center">
                <Bike className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <CardTitle>Motorcycle Shipping</CardTitle>
                <CardDescription>Specialized handling for motorcycles and recreational vehicles</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Custom crating available</li>
                  <li>• Soft-tie securing system</li>
                  <li>• Climate-controlled options</li>
                  <li>• Expedited delivery</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="text-center">
                <Package className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Heavy Equipment</CardTitle>
                <CardDescription>Professional transport for construction and industrial equipment</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Specialized trailers</li>
                  <li>• Permit handling</li>
                  <li>• Route planning</li>
                  <li>• Equipment securing</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose BridgeLine Xpress?</h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              We're committed to providing exceptional transportation services with unmatched reliability
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="h-16 w-16 mx-auto mb-4 text-orange-400" />
              <h3 className="text-xl font-semibold mb-2">Fully Insured</h3>
              <p className="text-blue-100">Complete insurance coverage for peace of mind during transport</p>
            </div>
            <div className="text-center">
              <Clock className="h-16 w-16 mx-auto mb-4 text-orange-400" />
              <h3 className="text-xl font-semibold mb-2">On-Time Delivery</h3>
              <p className="text-blue-100">Guaranteed delivery windows with real-time tracking updates</p>
            </div>
            <div className="text-center">
              <Star className="h-16 w-16 mx-auto mb-4 text-orange-400" />
              <h3 className="text-xl font-semibold mb-2">5-Star Service</h3>
              <p className="text-blue-100">Rated highest by customers for quality and reliability</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Ship Your Vehicle?</h2>
          <p className="text-lg text-orange-100 mb-8 max-w-2xl mx-auto">
            Get your free quote in minutes and see why thousands trust BridgeLine Xpress for their transportation needs
          </p>
          <Button size="lg" className="bg-white text-orange-500 hover:bg-gray-100">
            <Link href="/quote">Get Your Free Quote Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Truck className="h-8 w-8 text-blue-400 mr-2" />
                <span className="text-xl font-bold">BridgeLine Xpress LLC</span>
              </div>
              <p className="text-gray-400">Professional vehicle transportation services across the United States.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Car Transportation</li>
                <li>Motorcycle Shipping</li>
                <li>Heavy Equipment</li>
                <li>Expedited Delivery</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Contact</li>
                <li>Careers</li>
                <li>Insurance</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Phone:(555) 123-4567</li>
                <li>Email:bridgelinexpress188@gmail.com</li>
                <li>Address: 1601-1 N MAIN ST #3159 JACKSONVILLE, FL US 33206</li>
                <li>24/7 Customer Support</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 BridgeLine Xpress LLC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}