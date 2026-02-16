import React from 'react'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen w-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Privacy Policy</h1>
        <p className="text-gray-600 mb-6">Last updated: January 2026</p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
          <p className="text-gray-700">This Privacy Policy explains how ShopSez collects, uses, and discloses your personal information when you use our website and services.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Personal details (name, email, phone, shipping address)</li>
            <li>Payment information (handled by our payment processors)</li>
            <li>Account credentials and profile information</li>
            <li>Device, browser, and usage data (logs, IP, pages visited)</li>
            <li>Cookies and tracking information</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">How We Use Your Information</h2>
          <p className="text-gray-700">We use information to process orders, provide customer support, improve our services, send transactional messages, and for marketing where you have consented.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Cookies & Tracking</h2>
          <p className="text-gray-700">We use cookies and similar technologies to operate the site, analyze usage, and personalize content. You can control cookies through your browser settings.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Data Sharing</h2>
          <p className="text-gray-700">We share data with service providers (payment processors, couriers, analytics) and when required by law. We do not sell your personal data.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Data Retention</h2>
          <p className="text-gray-700">We retain personal data as long as necessary to provide services, comply with legal obligations, and for legitimate business purposes.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Your Rights</h2>
          <p className="text-gray-700">Depending on your jurisdiction, you may have rights to access, correct, delete, or restrict processing of your personal data. Contact us to exercise these rights.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Security</h2>
          <p className="text-gray-700">We implement reasonable technical and organizational measures to protect your data, but cannot guarantee absolute security.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Children</h2>
          <p className="text-gray-700">Our services are not intended for children under 16. We do not knowingly collect personal data from children.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Changes to this Policy</h2>
          <p className="text-gray-700">We may update this policy—changes will be posted with a revised effective date.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Contact</h2>
          <p className="text-gray-700">Questions about this policy? Email us at <a href="mailto:support@shopsez.com" className="text-blue-600">support@shopsez.com</a>.</p>
        </section>

        <div className="mt-8 text-gray-600 text-sm">&copy; 2026 ShopSez</div>
      </div>
    </div>
  )
}
