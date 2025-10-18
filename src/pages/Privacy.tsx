import React from 'react';
import { SEO } from '../components/SEO';

export function Privacy() {
  const privacySchema = {
    '@context': 'https://schema.org',
    '@type': 'PrivacyPolicy',
    name: 'TAT Test Online Privacy Policy',
    description:
      'Details how TAT Test Online handles anonymised story submissions, cookies, analytics, and user rights.',
    inLanguage: 'en',
    url: 'https://www.tat-test.com/tat-test-privacy'
  };

  return (
    <div className="max-w-4xl mx-auto prose prose-indigo">
      <SEO
        title="Privacy Policy"
        description="Understand how TAT Test Online collects, stores, and uses anonymized story submissions, along with your rights and data safeguards."
        type="article"
        structuredData={[privacySchema]}
      />
      <h1>Privacy Policy</h1>
      
      <h2>Data Collection</h2>
      <p>
        We collect anonymised narrative responses that you type into the story field. Optional demographic fields
        (age and gender) are stored only when provided and are decoupled from IP addresses or identifiers. We do not
        require account creation, so no passwords or payment details are collected.
      </p>

      <h2>Cookies & Analytics</h2>
      <p>
        Essential cookies keep language preferences and accessibility settings consistent across visits. We also use
        Google Analytics 4 to understand aggregate usage trends. IP addresses are anonymised, and we disable ad personalisation
        until your AdSense approval is confirmed. You can opt out by using your browser’s “Do Not Track” setting or installing
        the Google Analytics opt-out browser add-on.
      </p>

      <h2>How We Use Your Story Data</h2>
      <ul>
        <li>Generating instant feedback and downloadable PDFs for your personal use.</li>
        <li>Improving our language model by looking at aggregate metrics (e.g., average story length, common themes).</li>
        <li>Supporting academic collaborations. Any shared dataset is stripped of metadata and reviewed for sensitive content.</li>
      </ul>

      <h2>Data Storage & Retention</h2>
      <p>
        Stories are processed in memory to generate your instant results. We do not retain the text on our servers once the
        PDF download is generated. Aggregated metrics such as the number of tests completed per day may be stored without any
        story content attached.
      </p>

      <h2>Security Measures</h2>
      <p>
        All traffic is encrypted via HTTPS. Access to the administrative dashboard requires multi-factor authentication, and
        only two authorised team members can review raw stories. We run quarterly vulnerability scans and patch third-party
        dependencies as part of our continuous deployment workflow.
      </p>

      <h2>Your Rights</h2>
      <p>
        You may request removal of your anonymised story by emailing <a href="mailto:support@tat-test.com">support@tat-test.com</a>.
        Include the approximate submission date, language selection, and a summary of your story. We will confirm deletion within
        two business days. Because we do not collect personally identifiable information, we cannot otherwise verify or export
        individual submissions.
      </p>

      <h2>Children&apos;s Privacy</h2>
      <p>
        TAT Test Online is designed for users aged 16 and above. If you believe a minor under 16 has submitted a story, please
        contact us immediately so we can delete the entry.
      </p>

      <h2>Third-Party Links</h2>
      <p>
        Some pages contain links to research articles or professional organisations. These sites operate under their own privacy
        policies. We encourage you to review the terms of any external website you visit.
      </p>

      <h2>Contact</h2>
      <p>
        For privacy-related questions, email <a href="mailto:support@tat-test.com">support@tat-test.com</a> or see our{' '}
        <a href="/contact">contact page</a> for operational hours and mailing details.
      </p>

      <h2>Updates</h2>
      <p>
        This privacy policy may be updated when we add new features or adjust analytics practices. Material changes will be
        announced via a banner on the homepage, and the “Last updated” date below will reflect the revision.
      </p>

      <p className="text-sm text-gray-500 mt-8">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
}
