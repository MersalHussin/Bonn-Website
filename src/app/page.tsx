import HeroSlider from './components/Landing';
import Products from './components/Services';
import About from "./components/About"
import StatsSection from "./components/StatsSection"
import ContactUs from './components/Contact';
import StatsCarousel from './components/StatCards';
import ClientsSection from './components/ClientsSection';
import ArtVid from './components/ArtVid';
import CTAButton from './components/CTAButton';
import OurMap from './components/OurMap2';


export default function Home() {
  return (
    <>
      <CTAButton />
      <HeroSlider />
      {/* <StatsCarousel/> */}
      <About />
      <StatsSection />
      <Products />
      <ArtVid />
      <OurMap />
      <ClientsSection />
      <ContactUs />
    </>
  );
}