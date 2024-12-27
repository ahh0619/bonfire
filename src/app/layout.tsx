import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import Footer from '@/components/layout/Footer';
import Providers from '@/providers/providers';
import Header from '@/components/layout/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BonFire',
  description: 'BonFire에 오신걸 환영합니다!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon.webp" sizes="any" />
      </head>
      <body className={inter.className}>
        <Header />
        <Providers>
          <main className="mt-24">{children}</main>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
