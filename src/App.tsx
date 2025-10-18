import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Test } from './pages/Test';
import { Results } from './pages/Results';
import { Privacy } from './pages/Privacy';
import { About } from './pages/About';
import { Cards } from './pages/Cards';
import { Research } from './pages/Research';
import { Layout } from './components/Layout';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import Editorial from './pages/Editorial';
function App() {
  // English-only experience
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Default English routes */}
          <Route path="/" element={<Home />} />
          <Route path="/tat-test-online" element={<Test />} />
          <Route path="/tat-test-results" element={<Results />} />
          <Route path="/tat-test-privacy" element={<Privacy />} />
          <Route path="/tat-test-about" element={<About />} />
          <Route path="/tat-test-cards" element={<Cards />} />
          <Route path="/tat-test-research" element={<Research />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/editorial-standards" element={<Editorial />} />
        </Routes>
      </Layout>
    </Router>
    
  );
}

export default App;
