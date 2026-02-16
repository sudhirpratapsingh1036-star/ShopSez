import React from 'react'

export default function ReturnRefund() {
  return (
    <div className="w-screen min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Return & Refund Policy</h1>
        <p className="text-gray-600 mb-6">Last updated: January 2026</p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Return Eligibility</h2>
          <p className="text-gray-700">Products can be returned within 30 days of purchase. Items must be unused, in original condition with all packaging, tags, and accessories intact.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">How to Return</h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li>Contact our support team at support@shopsez.com</li>
            <li>Provide your order number and reason for return</li>
            <li>Receive a return shipping label</li>
            <li>Pack the item securely and ship it back</li>
            <li>We'll inspect and process your refund</li>
          </ol>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Non-Returnable Items</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Clearance or final sale items</li>
            <li>Items damaged due to misuse</li>
            <li>Personal hygiene products</li>
            <li>Custom or personalized items</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Refund Processing</h2>
          <p className="text-gray-700">Once we receive and inspect your returned item, we'll process your refund within 7-10 business days. Refunds are issued to the original payment method.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Exchanges</h2>
          <p className="text-gray-700">If you'd like to exchange a product for a different size or color, contact us and we'll arrange a swap. No restocking fee applies for exchanges.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Defective Products</h2>
          <p className="text-gray-700">If your product arrives defective, contact us immediately with photos. We'll arrange a replacement or full refund at no cost to you.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
          <p className="text-gray-700">
            Have questions about returns? Email us at <a href="mailto:support@shopsez.com" className="text-blue-600">support@shopsez.com</a>
          </p>
        </section>

        <div className="mt-8 text-gray-600 text-sm">&copy; 2026 ShopSez</div>
      </div>
    </div>
  )
}
