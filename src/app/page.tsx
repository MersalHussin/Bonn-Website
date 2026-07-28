import HeroSlider from './components/pages/Landing';
// import Products from './components/Sections/Services';
import About from "./components/Sections/About"
import StatsSection from "./components/Sections/StatsSection"
import ContactUs from './components/Sections/Contact';
import StatsCarousel from './components/Sections/StatCards';
import ClientsSection from './components/Sections/ClientsSection';
import ArtVid from './components/Sections/ArtVid';
import CTAButton from './components/Sections/CTAButton';
import OurMap from './components/Sections/OurMap2';
import Image from 'next/image';


export default function Home() {
  return (
    <>
      <CTAButton />
      <HeroSlider />
      {/* <StatsCarousel/> */}
      <About />
      <StatsSection />
      {/* <Products /> */}
      <ArtVid />
      <OurMap />
      <ClientsSection />
      <ContactUs />
    </>
  );
}