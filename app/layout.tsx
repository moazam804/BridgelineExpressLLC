import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BridgeLine Xpress LLC - Professional Vehicle Transportation',
  description: 'Professional vehicle transportation services across America. Fast, reliable, and secure transport for cars, motorcycles, and heavy equipment.',
  keywords: 'vehicle transport, car shipping, motorcycle transport, heavy equipment, auto transport, nationwide shipping',
  authors: [{ name: 'BridgeLine Xpress LLC' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'BridgeLine Xpress LLC - Professional Vehicle Transportation',
    description: 'Professional vehicle transportation services across America',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📦</text></svg>" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}