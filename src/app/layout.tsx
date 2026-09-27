import type { Metadata } from 'next';
import { Cinzel, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const cinzel = Cinzel({
  variable: '--font-cinzel',
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MAZARAYAT AL ARABIANS | Royal Arabian Horse Stud Farm',
  description:
    'Experience the world-renowned pedigree, beauty, and untamable spirit of straight Egyptian and pure Arabian champion stallions. Interactive 3D showcase & private treaty viewings.',
  keywords: [
    'Arabian Horse',
    'Royal Arabian Stud',
    'Straight Egyptian Stallion',
    'MAZARAYAT AL ARABIANS',
    'Horse Breeding',
    'Private Treaty',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${jakarta.variable} h-full antialiased dark`}
    >
      <body className="min-h-full h-full bg-[#070709] text-white font-sans overflow-x-hidden selection:bg-amber-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
