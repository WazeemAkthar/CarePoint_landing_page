import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star, Users, Calendar, CheckCircle } from "lucide-react"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="py-12 md:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <Badge className="bg-[#00A733]/10 text-[#00A733] hover:bg-[#00A733]/20 animate-bounce-subtle">
                🏥 Trusted by 50+ Hospitals
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight animate-fade-in-up animation-delay-200">
                Your Gateway to Quick and <span className="text-[#00A733]">Reliable Healthcare</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed animate-fade-in-up animation-delay-400">
                Book doctor appointments from multiple hospitals, all in one app. Skip the queues and get the care you
                need, when you need it.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-600">
              <Button
                size="lg"
                className="bg-[#00A733] hover:bg-[#008A2B] text-white px-8 transform hover:scale-105 transition-all duration-200 hover:shadow-lg"
              >
                Download the App
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 transform hover:scale-105 transition-all duration-200"
              >
                Watch Demo
              </Button>
            </div>
            <div className="flex items-center space-x-8 text-sm text-gray-600 animate-fade-in-up animation-delay-800">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-semibold">4.8/5</span>
                <span>App Store Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-[#00A733]" />
                <span className="font-semibold">100K+</span>
                <span>Happy Users</span>
              </div>
            </div>
          </div>
          <div className="relative animate-fade-in-right">
            <div className="relative mx-auto w-80 h-96 bg-gradient-to-br from-[#00A733]/20 to-[#00A733]/5 rounded-3xl p-8 flex items-center justify-center animate-float">
              <Image
                src="/placeholder.svg?height=400&width=200"
                alt="CarePoint Mobile App Mockup"
                width={200}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-3 border border-gray-100 animate-slide-in-left animation-delay-1000">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-[#00A733]" />
                <span className="text-sm font-medium">Next Available</span>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-3 border border-gray-100 animate-slide-in-right animation-delay-1200">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-[#00A733]" />
                <span className="text-sm font-medium">Booked Successfully</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}