import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import './globals.css';
import LeVisageHeader from './components/leVisage/LeVisageHeader';
import LeVisageFooter from './components/leVisage/LeVisageFooter';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Le Visage Plus',
  description: 'Le Visage Plus - Premium Skincare & Cosmetics',
  icons: {
    icon: '/images/Visage.png?v=2',
    apple: '/images/Visage.png?v=2',
  },
  openGraph: {
    title: 'Le Visage Plus',
    description: 'Le Visage Plus - Premium Skincare & Cosmetics',
    images: [{ url: '/images/Visage.png?v=2' }],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const langCookie = cookieStore.get("i18nextLng");
  const lang = langCookie ? langCookie.value : "ar";
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <html lang={lang} dir={dir} className="scroll-smooth">
      <body className="font-sans antialiased overflow-x-hidden flex flex-col min-h-screen">
        <LeVisageHeader />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <LeVisageFooter />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
