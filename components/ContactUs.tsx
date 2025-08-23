import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock,FaPaperPlane } from "react-icons/fa";


export default function ContactUs() {
  return (
    <section id="contact-us" className="bg-[#f3fbfa] py-16 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">

        {/* Section Heading */}
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">Get in Touch</h2>
            <p className="text-gray-600 mt-2">
            Have questions about our healthcare booking platform? We're here to help you get the care you need.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center">

        {/* Contact Information */}
        <div className="max-w-xl bg-white p-8 rounded-xl shadow-md ">
        <h3 className="text-xl font-semibold text-gray-800">Contact Information</h3>
           
            {/* Phone Support */}
            <div className="flex items-center gap-4 p-6">
                <div className="bg-green-500 text-white p-3 rounded-xl flex items-center ml-[-10px]">
                    <FaPhoneAlt className="text-xl" />
                </div>
                <div>
                    <p className="font-semibold">Phone Support</p>
                    <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500">Available 24/7 for urgent inquiries</p>
                </div>
            </div>

            {/* Email Support */}
            <div className="flex items-center gap-4 p-6">
                <div className="bg-green-500 text-white p-3 rounded-xl flex items-center ml-[-10px]">
                    <FaEnvelope className="text-xl"  />
                </div>
                <div>
                    <p className="font-semibold">Email Support</p>
                    <p className="text-sm text-gray-600">support@carepoint.com</p>
                    <p className="text-sm text-gray-500">Response within 2-4 hours</p>
                </div>
            </div>
    
            {/* Office Location */}
            <div className="flex items-center gap-4 p-6">
                <div className="bg-green-500 text-white p-3 rounded-xl flex items-center ml-[-10px]">
                    <FaMapMarkerAlt className="text-xl"  />
                </div>
                <div>
                    <p className="font-semibold">Office Location</p>
                    <p className="text-sm text-gray-600">
                    123 Healthcare Ave, Suite 100<br />
                    Medical District, NY 10001
                    </p>
                </div>
            </div>

            {/* Business Hours */}
            <div className="flex items-center gap-4 p-6">
                <div className="bg-green-500 text-white p-3 rounded-xl flex items-center ml-[-10px]">
                    <FaClock className="text-xl"  />
                </div>
                <div>
                    <p className="font-semibold">Business Hours</p>
                    <p className="text-sm text-gray-600">
                    Monday - Friday: 8:00 AM - 8:00 PM<br />
                    Weekend: 9:00 AM-5:00 PM
                    </p>
                </div>
            </div>
        </div>
        
        {/* Send us a Message */}
        <div className="bg-white p-8 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-gray-800">Send us a Message</h3>
            <div className="h-4"></div>
            <form className="space-y-4">
                {/* fist name and last name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border-2 border-gray-300 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border-2 border-gray-300 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                  </div>
                </div>

                {/* email address and Phone number */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Email Address</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border-2 border-gray-300 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <input
                      type="tel"
                     className="w-full px-4 py-2 border-2 border-gray-300 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                 </div>
                </div>

                {/*Subject*/}
                <div>
                    <label className="block text-sm font-medium mb-1">Subject</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border-2 border-gray-300 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

               <div>
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us how we can help you..."
                    className="w-full px-4 py-2 border-2 border-gray-300 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  ></textarea>
              </div>

              <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-xl flex items-center justify-center gap-2"
                  >
                  Send Message
                      <FaPaperPlane className="#" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
