import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PixelCrush.ai - AI Companions',
  description: 'Connect with AI companions through chat, voice calls, and visual memories',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  themeColor: '#131313',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
        <link 
          href="https://fonts.cdnfonts.com/css/tiktok-sans" 
          rel="stylesheet" 
        />
      </head>
      <body>{children}</body>
    </html>
  );
}