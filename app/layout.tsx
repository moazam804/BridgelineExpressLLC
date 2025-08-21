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
}){
  return (
    <html lang="en">
      <head>
        {/* Favicon logo */}
        <link rel="icon" href="/images/favicon.png" type="/images/favicon.png" />
        {/* You can also provide multiple sizes for better support */}
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
