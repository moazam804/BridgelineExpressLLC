'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ArrowRight, Truck, MapPin, Calendar, User, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { zipCodes } from '@/lib/zipCodes';
import { vehicleMakes } from '@/lib/vehicleData';

interface QuoteData {
  pickupZip: string;
  pickupCity: string;
  pickupState: string;
  deliveryZip: string;
  deliveryCity: string;
  deliveryState: string;
  pickupDate: string;
  deliveryDate: string;
  vehicleType: string;
  make: string;
  model: string;
  year: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes: string;
  quoteId: string;
  submittedAt: string;
}

export default function QuotePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [quoteData, setQuoteData] = useState<QuoteData>({
    pickupZip: '',
    pickupCity: '',
    pickupState: '',
    deliveryZip: '',
    deliveryCity: '',
    deliveryState: '',
    pickupDate: '',
    deliveryDate: '',
    vehicleType: '',
    make: '',
    model: '',
    year: '',
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    notes: '',
    quoteId: '',
    submittedAt: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle zip code changes
  const handleZipChange = (field: 'pickupZip' | 'deliveryZip', value: string) => {
    const zipData = zipCodes.find(zip => zip.zip === value);
    if (zipData) {
      if (field === 'pickupZip') {
        setQuoteData(prev => ({
          ...prev,
          pickupZip: value,
          pickupCity: zipData.city,
          pickupState: zipData.state
        }));
      } else {
        setQuoteData(prev => ({
          ...prev,
          deliveryZip: value,
          deliveryCity: zipData.city,
          deliveryState: zipData.state
        }));
      }
    } else {
      setQuoteData(prev => ({
        ...prev,
        [field]: value,
        [field === 'pickupZip' ? 'pickupCity' : 'deliveryCity']: '',
        [field === 'pickupZip' ? 'pickupState' : 'deliveryState']: ''
      }));
    }
  };

  // Handle vehicle make change
  const handleMakeChange = (make: string) => {
    setQuoteData(prev => ({
      ...prev,
      make,
      model: '' // Reset model when make changes
    }));
  };

  // Get models for selected make
  const getModelsForMake = () => {
    const makeData = vehicleMakes.find(m => m.make === quoteData.make);
    return makeData?.models || [];
  };

  // Save quote to localStorage (simulating file operations)
  const saveQuote = () => {
    const quoteId = `BX-${Date.now()}`;
    const submittedAt = new Date().toISOString();
    
    const finalQuoteData = {
      ...quoteData,
      quoteId,
      submittedAt
    };

    // Get existing quotes
    const existingQuotes = JSON.parse(localStorage.getItem('bridgeline_quotes') || '[]');
    
    // Add new quote
    existingQuotes.push(finalQuoteData);
    
    // Save back to localStorage
    localStorage.setItem('bridgeline_quotes', JSON.stringify(existingQuotes));
    
    setQuoteData(finalQuoteData);
    setIsSubmitted(true);
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      saveQuote();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return quoteData.pickupZip && quoteData.deliveryZip && quoteData.pickupDate;
      case 2:
        return quoteData.vehicleType;
      case 3:
        if (quoteData.vehicleType === 'car') {
          return quoteData.make && quoteData.model && quoteData.year;
        }
        return true; // For motorcycle and heavy equipment, no make/model required
      case 4:
        return quoteData.customerName && quoteData.customerPhone && quoteData.customerEmail;
      default:
        return false;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <CardTitle className="text-2xl text-green-600">Quote Submitted Successfully!</CardTitle>
              <CardDescription>Your transportation quote has been received and saved.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>Quote ID:</strong> {quoteData.quoteId}</p>
                <p><strong>Submitted:</strong> {new Date(quoteData.submittedAt).toLocaleDateString()}</p>
                <p><strong>Route:</strong> {quoteData.pickupCity}, {quoteData.pickupState} → {quoteData.deliveryCity}, {quoteData.deliveryState}</p>
                <p><strong>Vehicle:</strong> {quoteData.vehicleType === 'car' ? `${quoteData.year} ${quoteData.make} ${quoteData.model}` : quoteData.vehicleType}</p>
              </div>
              <div className="flex gap-4">
                <Button onClick={() => {
                  setCurrentStep(1);
                  setIsSubmitted(false);
                  setQuoteData({
                    pickupZip: '',
                    pickupCity: '',
                    pickupState: '',
                    deliveryZip: '',
                    deliveryCity: '',
                    deliveryState: '',
                    pickupDate: '',
                    deliveryDate: '',
                    vehicleType: '',
                    make: '',
                    model: '',
                    year: '',
                    customerName: '',
                    customerPhone: '',
                    customerEmail: '',
                    notes: '',
                    quoteId: '',
                    submittedAt: ''
                  });
                }}>
                  Submit Another Quote
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Navigation */}
      <div className="max-w-4xl mx-auto mb-8">
        <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className={`flex items-center ${step < 4 ? 'flex-1' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`flex-1 h-1 mx-4 ${
                    step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Location & Date</span>
            <span>Vehicle Type</span>
            <span>Vehicle Details</span>
            <span>Contact Info</span>
          </div>
        </div>

        {/* Step Content */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              {currentStep === 1 && <><MapPin className="h-5 w-5 mr-2" />Pickup & Delivery Information</>}
              {currentStep === 2 && <><Truck className="h-5 w-5 mr-2" />Vehicle Type</>}
              {currentStep === 3 && <><Truck className="h-5 w-5 mr-2" />Vehicle Details</>}
              {currentStep === 4 && <><User className="h-5 w-5 mr-2" />Contact Information</>}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && 'Enter pickup and delivery locations with dates'}
              {currentStep === 2 && 'Select the type of vehicle you need to transport'}
              {currentStep === 3 && 'Provide specific vehicle information'}
              {currentStep === 4 && 'Your contact details for quote delivery'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Location & Date */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Pickup Location</h3>
                    <div>
                      <Label htmlFor="pickupZip">Zip Code</Label>
                      <Input
                        id="pickupZip"
                        value={quoteData.pickupZip}
                        onChange={(e) => handleZipChange('pickupZip', e.target.value)}
                        placeholder="Enter pickup zip code"
                      />
                    </div>
                    {quoteData.pickupCity && quoteData.pickupState && (
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-800">
                          📍 {quoteData.pickupCity}, {quoteData.pickupState}
                        </p>
                      </div>
                    )}
                    <div>
                      <Label htmlFor="pickupDate">Pickup Date</Label>
                      <Input
                        id="pickupDate"
                        type="date"
                        value={quoteData.pickupDate}
                        onChange={(e) => setQuoteData(prev => ({ ...prev, pickupDate: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Delivery Location</h3>
                    <div>
                      <Label htmlFor="deliveryZip">Zip Code</Label>
                      <Input
                        id="deliveryZip"
                        value={quoteData.deliveryZip}
                        onChange={(e) => handleZipChange('deliveryZip', e.target.value)}
                        placeholder="Enter delivery zip code"
                      />
                    </div>
                    {quoteData.deliveryCity && quoteData.deliveryState && (
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-800">
                          📍 {quoteData.deliveryCity}, {quoteData.deliveryState}
                        </p>
                      </div>
                    )}
                    <div>
                      <Label htmlFor="deliveryDate">Preferred Delivery Date</Label>
                      <Input
                        id="deliveryDate"
                        type="date"
                        value={quoteData.deliveryDate}
                        onChange={(e) => setQuoteData(prev => ({ ...prev, deliveryDate: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Vehicle Type */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { value: 'car', label: 'Car', icon: '🚗', description: 'Sedans, SUVs, Trucks' },
                    { value: 'motorcycle', label: 'Motorcycle', icon: '🏍️', description: 'Bikes, Scooters, ATVs' },
                    { value: 'heavy-equipment', label: 'Heavy Equipment', icon: '🚛', description: 'Construction, Industrial' }
                  ].map((vehicle) => (
                    <Card 
                      key={vehicle.value}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        quoteData.vehicleType === vehicle.value ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                      }`}
                      onClick={() => setQuoteData(prev => ({ ...prev, vehicleType: vehicle.value }))}
                    >
                      <CardContent className="p-6 text-center">
                        <div className="text-4xl mb-2">{vehicle.icon}</div>
                        <h3 className="font-semibold mb-1">{vehicle.label}</h3>
                        <p className="text-sm text-gray-600">{vehicle.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Vehicle Details */}
            {currentStep === 3 && (
              <div className="space-y-6">
                {quoteData.vehicleType === 'car' ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="year">Year</Label>
                      <Input
                        id="year"
                        value={quoteData.year}
                        onChange={(e) => setQuoteData(prev => ({ ...prev, year: e.target.value }))}
                        placeholder="e.g., 2020"
                      />
                    </div>
                    <div>
                      <Label htmlFor="make">Make</Label>
                      <Select value={quoteData.make} onValueChange={handleMakeChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select make" />
                        </SelectTrigger>
                        <SelectContent>
                          {vehicleMakes.map((make) => (
                            <SelectItem key={make.make} value={make.make}>
                              {make.make}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {quoteData.make && (
                      <div className="md:col-span-2">
                        <Label htmlFor="model">Model</Label>
                        <Select value={quoteData.model} onValueChange={(value) => setQuoteData(prev => ({ ...prev, model: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select model" />
                          </SelectTrigger>
                          <SelectContent>
                            {getModelsForMake().map((model) => (
                              <SelectItem key={model} value={model}>
                                {model}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center p-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">
                      {quoteData.vehicleType === 'motorcycle' 
                        ? 'Great! We\'ll handle your motorcycle with specialized equipment and care.'
                        : 'Perfect! Our heavy equipment specialists will coordinate the best transport solution for your equipment.'
                      }
                    </p>
                  </div>
                )}
                <div>
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={quoteData.notes}
                    onChange={(e) => setQuoteData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Any special requirements or additional information..."
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* Step 4: Contact Information */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="customerName">Full Name</Label>
                    <Input
                      id="customerName"
                      value={quoteData.customerName}
                      onChange={(e) => setQuoteData(prev => ({ ...prev, customerName: e.target.value }))}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerPhone">Phone Number</Label>
                    <Input
                      id="customerPhone"
                      value={quoteData.customerPhone}
                      onChange={(e) => setQuoteData(prev => ({ ...prev, customerPhone: e.target.value }))}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="customerEmail">Email Address</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={quoteData.customerEmail}
                    onChange={(e) => setQuoteData(prev => ({ ...prev, customerEmail: e.target.value }))}
                    placeholder="your.email@example.com"
                  />
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Quote Summary</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p><strong>Route:</strong> {quoteData.pickupCity}, {quoteData.pickupState} → {quoteData.deliveryCity}, {quoteData.deliveryState}</p>
                    <p><strong>Pickup Date:</strong> {new Date(quoteData.pickupDate).toLocaleDateString()}</p>
                    <p><strong>Vehicle:</strong> {quoteData.vehicleType === 'car' ? `${quoteData.year} ${quoteData.make} ${quoteData.model}` : quoteData.vehicleType}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                className="flex items-center"
              >
                {currentStep === 4 ? 'Submit Quote' : 'Next'}
                {currentStep < 4 && <ArrowRight className="h-4 w-4 ml-2" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}