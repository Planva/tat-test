import React from 'react';
import { SEO } from '../components/SEO';

export default function Terms() {
  const termsSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'TAT Test Online Terms & Disclaimer',
    description:
      'Terms of use for the TAT Test Online educational platform, including user responsibilities and health disclaimers.',
    inLanguage: 'en',
    url: 'https://www.tat-test.com/terms'
  };

  return (
    <div className="max-w-4xl mx-auto prose prose-indigo">
      <SEO
        title="Terms & Disclaimer"
        description="Review the legal terms, permitted use, and disclaimer for the TAT Test Online platform before starting your assessment."
        type="article"
        structuredData={[termsSchema]}
      />

      <h1>Terms &amp; Disclaimer</h1>
      <p>
        TAT Test Online provides educational content and an online experience based on the
        Thematic Apperception Test (TAT). The service is not a medical device and is not intended
        to diagnose, treat, or prevent any disease or mental condition.
      </p>
      <h2>Definitions</h2>
      <p><strong>“Platform”</strong> refers to the website, downloadable reports, and supporting services provided at tat-test.com.</p>
      <p><strong>“User”</strong> refers to any person accessing or using the Platform, whether or not they submit a story.</p>

      <h2>Use of Service</h2>
      <ul>
        <li>The Platform is offered for self-reflection, education, and research. It is not a substitute for clinical assessment.</li>
        <li>You agree not to upload personal data, confidential case notes, or stories containing identifiable individuals.</li>
        <li>You may share your generated PDF with counsellors or educators, provided the file remains unaltered and attributed to TAT Test Online.</li>
        <li>We may modify, suspend, or discontinue any feature without prior notice. Continued use after changes constitutes acceptance.</li>
      </ul>

      <h2>User Responsibilities</h2>
      <ul>
        <li>Ensure your internet connection and device security. We are not responsible for loss caused by malware on your device.</li>
        <li>Use respectful language. Stories containing hate speech, threats, or explicit personal data may be removed.</li>
        <li>Comply with all applicable laws in your jurisdiction when using psychological self-help tools.</li>
      </ul>

      <h2>Intellectual Property</h2>
      <p>Unless otherwise noted, all original text, UI components, and documentation on this site are © TAT Test Online. The original TAT cards remain the intellectual property of their respective rights holders. Low-resolution previews hosted here are for educational commentary under fair-use guidelines.</p>
      <p className="text-sm text-gray-500">
        Historical information about the TAT draws on published sources, including the work of Henry A. Murray and Christiana D. Morgan.
      </p>

      <h2>Third-Party Links</h2>
      <p>We provide references to academic journals, professional associations, and partner resources. These sites operate independently. We are not responsible for their content, privacy practices, or availability.</p>

      <h2>Limitation of Liability</h2>
      <p>
        TAT Test Online delivers educational information inspired by the work of Henry A. Murray and Christiana D. Morgan, the inventors of the Thematic Apperception Test.
        All results produced by the Platform are automated and for personal reflection only. We do not provide clinical diagnoses, treatment, or crisis support.
      </p>
      <p>
        By using the Platform you acknowledge that any reliance on the narratives or interpretations is at your own discretion. TAT Test Online and its contributors disclaim
        liability for indirect, incidental, or consequential damages arising from the use of the Platform.
      </p>

      <h2>Health & Safety Disclaimer</h2>
      <p>
        Projective storytelling can surface strong emotions. If you experience distress or suspect a mental health condition, stop using the Platform and seek assistance from a licensed mental health professional or emergency services in your area.
      </p>

      <h2>Changes to These Terms</h2>
      <p>We review this document annually and when launching significant updates. Updates will be announced on the homepage banner. The “Last updated” date below reflects the most recent revision.</p>

      <h2>Contact</h2>
      <p>For questions about these terms, email <a href="mailto:legal@tat-test.com">legal@tat-test.com</a> or visit our <a href="/contact">contact page</a> for mailing details.</p>

      <p className="text-sm text-gray-500 mt-8">Last updated: {new Date().toLocaleDateString()}</p>
    </div>
  );
}
