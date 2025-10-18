import React from 'react';
import { Mail, Clock, ShieldCheck } from 'lucide-react';
import { SEO } from '../components/SEO';

const supportEmail = 'support@tat-test.com';

const officeHours = [
  { day: 'Monday – Friday', hours: 'We aim to reply within 2 business days' },
  { day: 'Saturday – Sunday', hours: 'Emails received are queued for Monday review' }
];

const serviceCommitments = [
  'We respond to enquiries about the TAT Test platform or partnership opportunities within two business days.',
  'Privacy or data removal requests receive written confirmation once deletion is complete.',
  'Feedback about content accuracy is escalated to our editorial reviewers for fact-checking.'
];

export default function Contact() {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact TAT Test Online',
    description: 'Support channel for TAT Test Online with response expectations and privacy request workflow.',
    inLanguage: 'en',
    url: 'https://www.tat-test.com/contact',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Support',
      email: supportEmail,
      availableLanguage: ['en']
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <SEO
        title="Contact Our Team"
        description="Get in touch with the TAT Test Online support team for product questions, data requests, partnerships, or media enquiries."
        type="article"
        structuredData={[contactSchema]}
      />

      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact TAT Test Online</h1>
        <p className="text-lg text-gray-600">
          We value transparent communication. Whether you have questions about the assessment, need support with your account,
          or want to collaborate on research, our team is ready to help.
        </p>
      </header>

      <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Primary Support</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="flex items-start space-x-3">
              <Mail className="h-6 w-6 text-indigo-600 mt-1" aria-hidden="true" />
              <div>
                <p className="text-gray-700 font-medium">Email</p>
                <a
                  href={`mailto:${supportEmail}`}
                  className="text-indigo-600 hover:text-indigo-700 break-all"
                >
                  {supportEmail}
                </a>
                <p className="text-sm text-gray-500 mt-2">
                  Use this address for support requests, feedback about test content, partnership enquiries, or to report suspected misuse.
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-start space-x-3">
              <Clock className="h-6 w-6 text-indigo-600 mt-1" aria-hidden="true" />
              <div>
                <p className="text-gray-700 font-medium">Response Time</p>
                <ul className="mt-2 text-sm text-gray-600 space-y-1">
                  {officeHours.map((entry) => (
                    <li key={entry.day}>
                      <span className="font-medium text-gray-700">{entry.day}:</span> {entry.hours}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Support Commitments</h2>
        <ul className="space-y-3 text-gray-600">
          {serviceCommitments.map((commitment, index) => (
            <li key={index} className="flex items-start space-x-2">
              <ShieldCheck className="h-5 w-5 text-indigo-600 mt-1" aria-hidden="true" />
              <span>{commitment}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Data Requests & Privacy</h2>
        <p className="text-gray-600 mb-3">
          If you would like to request deletion of your anonymised responses, or have concerns about data handling,
          please email <a className="text-indigo-600 hover:text-indigo-700" href={`mailto:${supportEmail}`}>
          {supportEmail}</a> with the subject line “Privacy Request”. Include the date of your test, your language setting,
          and the approximate story you submitted to help us locate and purge your entry.
        </p>
        <p className="text-sm text-gray-500">
          For further details about how we protect your information, review our{' '}
          <a className="text-indigo-600 hover:text-indigo-700" href="/tat-test-privacy">
            Privacy Policy
          </a>{' '}
          and{' '}
          <a className="text-indigo-600 hover:text-indigo-700" href="/terms">
            Terms & Disclaimer
          </a>.
        </p>
      </section>
    </div>
  );
}
