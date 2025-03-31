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
  // Define supported languages
  const languages = ['hi', 'id', 'it', 'ur', 'fr'];

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

          {/* Language-specific routes */}
          {languages.map(lang => (
            <React.Fragment key={lang}>
              <Route path={`/${lang}`} element={<Home />} />
              <Route path={`/${lang}/tat-test-online`} element={<Test />} />
              <Route path={`/${lang}/tat-test-results`} element={<Results />} />
              <Route path={`/${lang}/tat-test-privacy`} element={<Privacy />} />
              <Route path={`/${lang}/tat-test-about`} element={<About />} />
              <Route path={`/${lang}/tat-test-cards`} element={<Cards />} />
              <Route path={`/${lang}/tat-test-research`} element={<Research />} />
            </React.Fragment>
          ))}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;