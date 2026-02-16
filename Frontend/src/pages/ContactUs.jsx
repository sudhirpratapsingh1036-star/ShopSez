import React, { useState } from "react"

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thank you for contacting us!')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="min-h-screen w-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Contact Us</h1>
          <p className="text-gray-600 mb-8">We'd love to hear from you. Send us a message!</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl mb-2">📞</div>
              <h3 className="font-bold text-gray-800">Phone</h3>
              <p className="text-gray-600">+91 8218541730</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">📧</div>
              <h3 className="font-bold text-gray-800">Email</h3>
              <p className="text-gray-600">sudhir@gmail.com</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">📍</div>
              <h3 className="font-bold text-gray-800">Address</h3>
              <p className="text-gray-600">IET Lucknow</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
