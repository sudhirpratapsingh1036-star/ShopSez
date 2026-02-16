import React from "react"

const AboutUs = () => {
  return (
    <div className="min-h-screen w-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">About ShopSez</h1>
          <p className="text-xl text-gray-600">Your trusted online shopping destination</p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            ShopSez is a unique e-commerce platform created by a passionate entrepreneur dedicated to making online shopping 
            easy, affordable, and enjoyable for everyone. What started as a small vision has grown into a trusted marketplace 
            serving thousands of satisfied customers.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            With a commitment to quality, customer service, and innovation, ShopSez continues to grow and evolve to meet the 
            needs of modern shoppers. Every product is carefully curated, and every customer interaction is handled with care.
          </p>
        </div>

        {/* Owner Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Meet the Founder</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="text-6xl">👨‍💼</div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Sudhir - Founder & CEO</h3>
              <p className="text-gray-700 mb-4">
                As the founder of ShopSez, I'm passionate about creating a seamless shopping experience. 
                I oversee all aspects of the business, from product selection to customer satisfaction, 
                ensuring that every customer receives the best service possible.
              </p>
              <p className="text-gray-700">
                My mission is simple: to provide high-quality products at competitive prices with exceptional customer support.
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">🎯 Our Mission</h3>
            <p className="text-gray-700">
              To revolutionize online shopping by providing customers with high-quality products, 
              competitive prices, and exceptional customer service.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">🌟 Our Vision</h3>
            <p className="text-gray-700">
              To become the most trusted and customer-centric e-commerce platform, known for quality, 
              reliability, and innovation.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Core Values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <span className="text-3xl">⭐</span>
              <div>
                <h4 className="font-bold text-gray-800">Quality</h4>
                <p className="text-gray-600">We source only the highest quality products</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-3xl">🚚</span>
              <div>
                <h4 className="font-bold text-gray-800">Fast Delivery</h4>
                <p className="text-gray-600">Quick and reliable shipping for all orders</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-3xl">💰</span>
              <div>
                <h4 className="font-bold text-gray-800">Best Prices</h4>
                <p className="text-gray-600">Competitive pricing without compromising quality</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-3xl">🤝</span>
              <div>
                <h4 className="font-bold text-gray-800">Customer First</h4>
                <p className="text-gray-600">Your satisfaction is our top priority</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-blue-600 text-white rounded-lg shadow-md p-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <p className="text-blue-100">Products Available</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <p className="text-blue-100">Happy Customers</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <p className="text-blue-100">Customer Support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
