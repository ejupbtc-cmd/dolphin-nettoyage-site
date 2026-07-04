import Header from './components/Header'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import ScrollProgress from './components/ScrollProgress'
import IntroLoader from './components/IntroLoader'
import WaveDivider from './components/WaveDivider'
import Hero from './sections/Hero'
import Services from './sections/Services'
import WhyUs from './sections/WhyUs'
import OfferBanner from './sections/OfferBanner'
import ZoneIntervention from './sections/ZoneIntervention'
import Testimonials from './sections/Testimonials'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

function App() {
  return (
    <>
      <IntroLoader />
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <WaveDivider from="#FFFFFF" to="#EEF4FA" height={80} />
        <Services />
        <WaveDivider from="#EEF4FA" to="#FFFFFF" flip height={80} />
        <WhyUs />
        <WaveDivider from="#FFFFFF" to="#0B1B2E" height={88} />
        <OfferBanner />
        <WaveDivider from="#0B1B2E" to="#EEF4FA" flip height={88} />
        <ZoneIntervention />
        <WaveDivider from="#EEF4FA" to="#FFFFFF" height={80} />
        <Testimonials />
        <WaveDivider from="#FFFFFF" to="#EEF4FA" flip height={80} />
        <Contact />
        <WaveDivider from="#EEF4FA" to="#FFFFFF" height={88} />
        <Footer />
      </main>
      <FloatingWhatsApp />
    </>
  )
}

export default App
