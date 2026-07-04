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
        <WaveDivider from="#F4F9FD" to="#EEF4FA" />
        <Services />
        <WaveDivider from="#EEF4FA" to="#FFFFFF" flip />
        <WhyUs />
        <WaveDivider from="#FFFFFF" to="#071525" height={72} />
        <OfferBanner />
        <WaveDivider from="#071525" to="#EEF4FA" flip height={72} />
        <ZoneIntervention />
        <WaveDivider from="#EEF4FA" to="#FFFFFF" />
        <Testimonials />
        <WaveDivider from="#FFFFFF" to="#EEF4FA" flip />
        <Contact />
        <WaveDivider from="#EEF4FA" to="#050F1E" height={72} />
        <Footer />
      </main>
      <FloatingWhatsApp />
    </>
  )
}

export default App
