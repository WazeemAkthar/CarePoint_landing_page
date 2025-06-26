import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

export default function CTASection() {
  return (
    <section className="py-16 bg-[#00A733]">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join Thousands of Patients Using CarePoint
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Download the app today and experience the future of healthcare booking
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#00A733] hover:bg-gray-100 px-8 transform hover:scale-105 transition-all duration-200 animate-pulse-subtle"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#00A733]"
            >
              Learn More
            </Button>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-8 text-green-100">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Free to Download</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>No Hidden Fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}