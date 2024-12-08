import RainbowKitConfig from '@/app/RainbowKitConfig';
import { Inter, Lato } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import './globals.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

const inter = Inter({
  variable: '--font-inter',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: [
    'latin',
    'latin-ext',
    'cyrillic',
    'cyrillic-ext',
    'greek',
    'greek-ext',
    'vietnamese',
  ],
});
const lato = Lato({
  variable: '--font-lato',
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin', 'latin-ext'],
});

export const metadata = {
  title: 'Graw',
  description: 'description',
  applicationName: 'Graw',
  referrer: 'origin-when-cross-origin',
  keywords: ['Web 3'],
  authors: [{ name: 'Akande Olalekan Toheeb' }],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.icon',
    apple: '/favicon.ico',
    other: {
      rel: '/favicon.ico',
      url: '/favicon.',
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${inter.variable} ${lato.variable} antialiased`}>
        <RainbowKitConfig>
          <div className='w-3/4 xl:w-3/4 2xl:w-3/5  mx-auto space-y-8 xl:space-y-14'>
            <Header />
            <Toaster />
            {children}
            <Footer />
          </div>
        </RainbowKitConfig>
      </body>
    </html>
  );
}
