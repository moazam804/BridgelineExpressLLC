'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Lock, Eye, Edit, Trash2, Download, RefreshCw } from 'lucide-react';
import Link from 'next/link';

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

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [quotes, setQuotes] = useState<QuoteData[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<QuoteData | null>(null);
  const [editingQuote, setEditingQuote] = useState<QuoteData | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  // Admin credentials (in production, this should be secure)
  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = 'bridgeline2025';

  useEffect(() => {
    if (isAuthenticated) {
      loadQuotes();
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setUsername('');
      setPassword('');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  const loadQuotes = () => {
    const savedQuotes = JSON.parse(localStorage.getItem('bridgeline_quotes') || '[]');
    setQuotes(savedQuotes.sort((a: QuoteData, b: QuoteData) => 
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    ));
  };

  const deleteQuote = (quoteId: string) => {
    if (confirm('Are you sure you want to delete this quote?')) {
      const updatedQuotes = quotes.filter(q => q.quoteId !== quoteId);
      localStorage.setItem('bridgeline_quotes', JSON.stringify(updatedQuotes));
      setQuotes(updatedQuotes);
    }
  };

  const saveEditedQuote = () => {
    if (editingQuote) {
      const updatedQuotes = quotes.map(q => 
        q.quoteId === editingQuote.quoteId ? editingQuote : q
      );
      localStorage.setItem('bridgeline_quotes', JSON.stringify(updatedQuotes));
      setQuotes(updatedQuotes);
      setEditingQuote(null);
      setShowEditDialog(false);
    }
  };

  const exportQuotes = () => {
    const dataStr = JSON.stringify(quotes, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `bridgeline_quotes_${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const getVehicleTypeLabel = (type: string) => {
    switch (type) {
      case 'car': return 'Car';
      case 'motorcycle': return 'Motorcycle';
      case 'heavy-equipment': return 'Heavy Equipment';
      default: return type;
    }
  };

  const getStatusBadge = (submittedAt: string) => {
    const daysSince = Math.floor((Date.now() - new Date(submittedAt).getTime()) / (1000 * 60 * 60 * 24));
    if (daysSince === 0) return <Badge className="bg-green-500">New</Badge>;
    if (daysSince <= 3) return <Badge className="bg-blue-500">Recent</Badge>;
    return <Badge variant="secondary">Processed</Badge>;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center px-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <Lock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Enter your credentials to access the booking management system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <Button onClick={handleLogin} className="w-full">
              Login
            </Button>
            <div className="text-center pt-4">
              <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm">
                ← Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Management</h1>
            <p className="text-gray-600">Manage transportation quotes and bookings</p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <Button onClick={loadQuotes} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button onClick={exportQuotes} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button onClick={() => setIsAuthenticated(false)} variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Total Quotes</p>
                  <p className="text-2xl font-bold text-gray-900">{quotes.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Car Transport</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {quotes.filter(q => q.vehicleType === 'car').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Motorcycles</p>
                  <p className="text-2xl font-bold text-orange-500">
                    {quotes.filter(q => q.vehicleType === 'motorcycle').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Heavy Equipment</p>
                  <p className="text-2xl font-bold text-green-600">
                    {quotes.filter(q => q.vehicleType === 'heavy-equipment').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quotes Table */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>All Quotes</CardTitle>
            <CardDescription>Manage and review all transportation quotes</CardDescription>
          </CardHeader>
          <CardContent>
            {quotes.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No quotes submitted yet.</p>
                <Link href="/quote">
                  <Button className="mt-4">Create Test Quote</Button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Quote ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Vehicle</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quotes.map((quote) => (
                      <TableRow key={quote.quoteId}>
                        <TableCell className="font-mono text-sm">{quote.quoteId}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{quote.customerName}</p>
                            <p className="text-sm text-gray-500">{quote.customerEmail}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{quote.pickupCity}, {quote.pickupState}</p>
                            <p className="text-gray-500">→ {quote.deliveryCity}, {quote.deliveryState}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{getVehicleTypeLabel(quote.vehicleType)}</p>
                            {quote.vehicleType === 'car' && (
                              <p className="text-gray-500">{quote.year} {quote.make} {quote.model}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">
                          {new Date(quote.submittedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(quote.submittedAt)}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline" onClick={() => setSelectedQuote(quote)}>
                                  <Eye className="h-3 w-3" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Quote Details - {selectedQuote?.quoteId}</DialogTitle>
                                  <DialogDescription>Complete quote information</DialogDescription>
                                </DialogHeader>
                                {selectedQuote && (
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <h4 className="font-semibold mb-2">Customer Information</h4>
                                        <p><strong>Name:</strong> {selectedQuote.customerName}</p>
                                        <p><strong>Phone:</strong> {selectedQuote.customerPhone}</p>
                                        <p><strong>Email:</strong> {selectedQuote.customerEmail}</p>
                                      </div>
                                      <div>
                                        <h4 className="font-semibold mb-2">Vehicle Information</h4>
                                        <p><strong>Type:</strong> {getVehicleTypeLabel(selectedQuote.vehicleType)}</p>
                                        {selectedQuote.vehicleType === 'car' && (
                                          <>
                                            <p><strong>Year:</strong> {selectedQuote.year}</p>
                                            <p><strong>Make:</strong> {selectedQuote.make}</p>
                                            <p><strong>Model:</strong> {selectedQuote.model}</p>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-2">Route Information</h4>
                                      <p><strong>Pickup:</strong> {selectedQuote.pickupCity}, {selectedQuote.pickupState} ({selectedQuote.pickupZip})</p>
                                      <p><strong>Delivery:</strong> {selectedQuote.deliveryCity}, {selectedQuote.deliveryState} ({selectedQuote.deliveryZip})</p>
                                      <p><strong>Pickup Date:</strong> {new Date(selectedQuote.pickupDate).toLocaleDateString()}</p>
                                      {selectedQuote.deliveryDate && (
                                        <p><strong>Delivery Date:</strong> {new Date(selectedQuote.deliveryDate).toLocaleDateString()}</p>
                                      )}
                                    </div>
                                    {selectedQuote.notes && (
                                      <div>
                                        <h4 className="font-semibold mb-2">Notes</h4>
                                        <p className="bg-gray-50 p-3 rounded">{selectedQuote.notes}</p>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => {
                                setEditingQuote(quote);
                                setShowEditDialog(true);
                              }}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => deleteQuote(quote.quoteId)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Quote - {editingQuote?.quoteId}</DialogTitle>
              <DialogDescription>Update quote information</DialogDescription>
            </DialogHeader>
            {editingQuote && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Customer Name</Label>
                    <Input
                      value={editingQuote.customerName}
                      onChange={(e) => setEditingQuote(prev => prev ? { ...prev, customerName: e.target.value } : null)}
                    />
                  </div>
                  <div>
                    <Label>Customer Phone</Label>
                    <Input
                      value={editingQuote.customerPhone}
                      onChange={(e) => setEditingQuote(prev => prev ? { ...prev, customerPhone: e.target.value } : null)}
                    />
                  </div>
                </div>
                <div>
                  <Label>Customer Email</Label>
                  <Input
                    value={editingQuote.customerEmail}
                    onChange={(e) => setEditingQuote(prev => prev ? { ...prev, customerEmail: e.target.value } : null)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Pickup Date</Label>
                    <Input
                      type="date"
                      value={editingQuote.pickupDate}
                      onChange={(e) => setEditingQuote(prev => prev ? { ...prev, pickupDate: e.target.value } : null)}
                    />
                  </div>
                  <div>
                    <Label>Delivery Date</Label>
                    <Input
                      type="date"
                      value={editingQuote.deliveryDate}
                      onChange={(e) => setEditingQuote(prev => prev ? { ...prev, deliveryDate: e.target.value } : null)}
                    />
                  </div>
                </div>
                {editingQuote.vehicleType === 'car' && (
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>Year</Label>
                      <Input
                        value={editingQuote.year}
                        onChange={(e) => setEditingQuote(prev => prev ? { ...prev, year: e.target.value } : null)}
                      />
                    </div>
                    <div>
                      <Label>Make</Label>
                      <Input
                        value={editingQuote.make}
                        onChange={(e) => setEditingQuote(prev => prev ? { ...prev, make: e.target.value } : null)}
                      />
                    </div>
                    <div>
                      <Label>Model</Label>
                      <Input
                        value={editingQuote.model}
                        onChange={(e) => setEditingQuote(prev => prev ? { ...prev, model: e.target.value } : null)}
                      />
                    </div>
                  </div>
                )}
                <div>
                  <Label>Notes</Label>
                  <Textarea
                    value={editingQuote.notes}
                    onChange={(e) => setEditingQuote(prev => prev ? { ...prev, notes: e.target.value } : null)}
                    rows={3}
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={saveEditedQuote}>Save Changes</Button>
                  <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancel</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}