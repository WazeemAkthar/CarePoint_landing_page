import { Card, CardContent } from "@/components/ui/card"
import { Hospital, Clock, Bell, Star } from "lucide-react"

export default function FeaturesSection() {
  return (
    <section id="features" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose CarePoint?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience healthcare booking like never before with our comprehensive features
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 animate-fade-in-up">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-[#00A733]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Hospital className="w-8 h-8 text-[#00A733]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Multi-Hospital Access</h3>
              <p className="text-gray-600">
                Connect with 50+ hospitals and clinics in your area through one platform
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 animate-fade-in-up">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-[#00A733]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-[#00A733]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-Time Slot Booking</h3>
              <p className="text-gray-600">See available slots in real-time and book instantly without waiting</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 animate-fade-in-up">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-[#00A733]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-[#00A733]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Appointment Reminders</h3>
              <p className="text-gray-600">Never miss an appointment with smart notifications and reminders</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 animate-fade-in-up">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-[#00A733]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-[#00A733]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Doctor Reviews</h3>
              <p className="text-gray-600">Read verified reviews and ratings to choose the best doctor for you</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}