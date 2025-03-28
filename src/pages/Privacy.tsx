import React from 'react';

export function Privacy() {
  return (
    <div className="max-w-4xl mx-auto prose prose-indigo">
      <h1>Privacy Policy</h1>
      
      <h2>Data Collection</h2>
      <p>
        The TAT Test website collects story responses anonymously. We do not collect
        or store any personal information that could identify individual users.
      </p>

      <h2>Data Usage</h2>
      <p>
        The stories submitted through our platform are used exclusively for:
      </p>
      <ul>
        <li>Providing immediate test results to users</li>
        <li>Anonymous research purposes to improve the test</li>
        <li>Generating aggregated statistics</li>
      </ul>

      <h2>Data Storage</h2>
      <p>
        All stories are stored securely in our database without any connection to
        personal identifiers. We use industry-standard security measures to protect
        the data.
      </p>

      <h2>Your Rights</h2>
      <p>
        Since all data is collected anonymously, we cannot provide individual data
        access or deletion services. However, you can download your results
        immediately after completing the test.
      </p>

      <h2>Contact</h2>
      <p>
        If you have any questions about this privacy policy, please contact us at:
        privacy@tattest.example.com
      </p>

      <h2>Updates</h2>
      <p>
        This privacy policy may be updated from time to time. Any changes will be
        reflected on this page.
      </p>

      <p className="text-sm text-gray-500 mt-8">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
}