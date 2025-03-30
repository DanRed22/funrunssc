import { Jersey_10 } from 'next/font/google';
import './globals.css';
import 'nes.css/css/nes.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'GADJA 2025',
  description: 'GADJA 2025 is a celebration of Carolinian talent and culture.',
};

const jersey10 = Jersey_10({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-jersey-10',
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={` ${jersey10.className} font-sans`}>
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
