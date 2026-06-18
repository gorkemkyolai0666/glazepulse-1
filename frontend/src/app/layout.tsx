import type { Metadata } from 'next';
import { EB_Garamond, Libre_Baskerville } from 'next/font/google';
import { AuthProvider } from '@/lib/auth-context';
import { ThemeProvider } from '@/lib/theme-context';
import './globals.css';

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-eb-garamond',
  display: 'swap',
});

const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-libre',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BindPulse — Cilt Atölyesi Operasyon Yönetimi',
  description:
    'Pres envanteri, cilt işleri, bakım kayıtları, bitirme kontrol listeleri, malzeme siparişleri ve hizmet tarifeleri yönetim platformu',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${ebGaramond.variable} ${libreBaskerville.variable} font-sans`}>
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
