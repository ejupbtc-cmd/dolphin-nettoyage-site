import Header from './components/Header'
import FloatingWhatsApp from './components/FloatingWhatsApp'
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
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <OfferBanner />
        <ZoneIntervention />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}

export default App
