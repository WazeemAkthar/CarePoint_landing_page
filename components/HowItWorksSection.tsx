import { Search, Calendar, Stethoscope, ArrowRight } from "lucide-react"

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get the healthcare you need in just three simple steps
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center animate-fade-in-up animation-delay-200">
            <div className="relative">
              <div className="w-20 h-20 bg-[#00A733] rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-white" />
              </div>
              <div className="absolute top-10 left-1/2 transform translate-x-8 hidden md:block">
                <ArrowRight className="w-6 h-6 text-gray-300" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Search</h3>
            <p className="text-gray-600">
              Find doctors and hospitals near you based on specialty, location, and availability
            </p>
          </div>
          <div className="text-center animate-fade-in-up animation-delay-400">
            <div className="relative">
              <div className="w-20 h-20 bg-[#00A733] rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-10 h-10 text-white" />
              </div>
              <div className="absolute top-10 left-1/2 transform translate-x-8 hidden md:block">
                <ArrowRight className="w-6 h-6 text-gray-300" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Book</h3>
            <p className="text-gray-600">
              Select your preferred time slot and book your appointment instantly with confirmation
            </p>
          </div>
          <div className="text-center animate-fade-in-up animation-delay-600">
            <div className="w-20 h-20 bg-[#00A733] rounded-full flex items-center justify-center mx-auto mb-6">
              <Stethoscope className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Get Treated</h3>
            <p className="text-gray-600">
              Arrive at your appointment on time and receive the quality healthcare you deserve
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}