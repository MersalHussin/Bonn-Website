import type { Metadata } from 'next';
import LeVisageHeader from '../../components/leVisage/LeVisageHeader';
import LeVisageFooter from '../../components/leVisage/LeVisageFooter';

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

export default function LeVisageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <LeVisageHeader />
      <div className="flex-grow">
        {children}
      </div>
      <LeVisageFooter />
    </div>
  );
}
