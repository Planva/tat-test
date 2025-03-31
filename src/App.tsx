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

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tat-test-online" element={<Test />} />
          <Route path="/tat-test-results" element={<Results />} />
          <Route path="/tat-test-privacy" element={<Privacy />} />
          <Route path="/tat-test-about" element={<About />} />
          <Route path="/tat-test-cards" element={<Cards />} />
          <Route path="/tat-test-research" element={<Research />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;