import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Work from './pages/Work'
import MoreWork from './pages/MoreWork'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import ComingSoon from './pages/ComingSoon'

/**
 * Routing is scaffolded for the full six-page site. Home and Services are
 * built; the remaining routes resolve to a quiet placeholder so links never
 * dead-end. The shared Nav is rendered once here, above the router, so it stays
 * mounted (persistent) and sticky across every page.
 */
export default function App() {
  return (
    <>
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/more" element={<MoreWork />} />
        <Route path="/work/:slug" element={<ComingSoon label="Project" />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<ComingSoon label="Not found" />} />
      </Routes>
    </>
  )
}
