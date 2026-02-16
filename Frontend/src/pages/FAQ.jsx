import React, { useState } from 'react'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'How do I place an order?',
      answer: 'Browse our products, add items to your cart, and proceed to checkout. Fill in your shipping details and payment information to complete your order.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, digital wallets, and online banking options.'
    },
    {
      question: 'How long does delivery take?',
      answer: 'Standard delivery takes 5-7 business days. Express delivery is available and takes 2-3 business days.'
    },
    {
      question: 'What are the shipping charges?',
      answer: 'Shipping is free for orders above $50. For orders below $50, standard shipping costs $5 and express shipping costs $10.'
    },
    {
      question: 'Can I return a product?',
      answer: 'Yes, we offer hassle-free returns within 30 days of purchase. The product should be in original condition with all packaging and tags intact.'
    },
    {
      question: 'How do I track my order?',
      answer: 'Once your order ships, you will receive a tracking link via email. You can also track it from your account dashboard.'
    },
    {
      question: 'What if my product is defective?',
      answer: 'Contact our support team immediately with photos of the defective product. We will replace it or provide a full refund.'
    },
    {
      question: 'Can I modify my order?',
      answer: 'Orders can only be modified within 1 hour of placement. After that, you will need to cancel and place a new order.'
    },
    {
      question: 'How do I use a discount code?',
      answer: 'During checkout, paste your discount code in the "Promo Code" field and click Apply. The discount will be applied to your order.'
    },
    {
      question: 'Is my data safe?',
      answer: 'Yes, we use SSL encryption and follow industry best practices to protect your personal and payment information.'
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen w-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">Find answers to common questions about shopping with ShopSez</p>
        </div>

       
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white text-black rounded-lg shadow-md">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left font-semibold text-white bg-gray-800 hover:bg-gray-700 transition"

              >
                <span className="flex items-center gap-3">
                  <span className="text-lg">{openIndex === index ? '−' : '+'}</span>
                  {faq.question}
                </span>
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-700 border-t border-gray-200">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center bg-blue-600 text-white rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="mb-6">Can't find the answer you're looking for? Our support team is here to help.</p>
          <a href="/contactUs" className="inline-block bg-white text-blue-600 px-8 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  )
}

export default FAQ
