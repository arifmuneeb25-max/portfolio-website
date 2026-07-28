import Hero from '../sections/Hero'
import Thesis from '../sections/Thesis'
import FeaturedWork from '../sections/FeaturedWork'
import Director from '../sections/Director'
import ClosingCTA from '../sections/ClosingCTA'
import Footer from '../components/Footer'

/**
 * Home — the opening page of the exhibition. Five editorial beats, deliberately
 * varied in rhythm so scrolling feels like moving through a magazine.
 */
export default function Home() {
  return (
    <main className="bg-ink">
      <Hero />
      <Thesis />
      <FeaturedWork />
      <Director />
      <ClosingCTA />
      <Footer />
    </main>
  )
}
