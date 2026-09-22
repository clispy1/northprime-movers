import type {Metadata} from 'next';
import {Inter, Fraunces} from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: 'NorthPrime Movers | Reliable Moving Services in Vancouver',
  description: 'Reliable and professional moving services in Vancouver, Surrey, Burnaby, and beyond. Get a free quote today.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body suppressHydrationWarning className="font-sans text-gray-900">{children}</body>
    </html>
  );
}
