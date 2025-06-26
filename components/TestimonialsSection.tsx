import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied patients who trust CarePoint for their healthcare needs
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "CarePoint made booking my appointment so easy! I found a great doctor near me and got an appointment
                the same day. Highly recommended!"
              </p>
              <div className="flex items-center">
                <Image
                  src="/placeholder.svg?height=48&width=48"
                  alt="Sarah Johnson"
                  width={48}
                  height={48}
                  className="rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah Johnson</h4>
                  <p className="text-gray-600 text-sm">Marketing Manager</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "The app is incredibly user-friendly. I love how I can see real-time availability and book
                appointments without calling multiple hospitals."
              </p>
              <div className="flex items-center">
                <Image
                  src="/placeholder.svg?height=48&width=48"
                  alt="Michael Chen"
                  width={48}
                  height={48}
                  className="rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Michael Chen</h4>
                  <p className="text-gray-600 text-sm">Software Engineer</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6">
                "As a busy mom, CarePoint saves me so much time. The reminder notifications ensure I never miss
                appointments for my family."
              </p>
              <div className="flex items-center">
                <Image
                  src="/placeholder.svg?height=48&width=48"
                  alt="Emily Rodriguez"
                  width={48}
                  height={48}
                  className="rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Emily Rodriguez</h4>
                  <p className="text-gray-600 text-sm">Teacher</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}