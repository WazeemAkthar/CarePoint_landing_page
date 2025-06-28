import { Card, CardContent } from "@/components/ui/card"
import { Hospital, Clock, Bell, Star } from "lucide-react"
import { motion, useInView, Variants } from "framer-motion"
import { JSX, useRef } from "react"

export default function FeaturesSection(): JSX.Element {
  const ref = useRef<HTMLDivElement>(null)
  const isInView: boolean = useInView(ref, { once: true })

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15
      }
    }
  }

  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1],
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  }

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.25, 0, 1]
      }
    }
  }

  const subtitleVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: [0.25, 0.25, 0, 1]
      }
    }
  }

  return (
    <section id="features" className="py-16 bg-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[#E5F2E5]/30"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#00A733]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#00A733]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[#00A733]/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <div className="text-center mb-16">
          <motion.h2 
            variants={titleVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Why Choose CarePoint?
          </motion.h2>
          <motion.p 
            variants={subtitleVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Experience healthcare booking like never before with our comprehensive features
          </motion.p>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <motion.div variants={cardVariants}>
            <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 bg-white rounded-2xl overflow-hidden group">
              <CardContent className="p-6 text-center relative">
                <div className="absolute inset-0 bg-[#00A733]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-[#00A733]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Hospital className="w-8 h-8 text-[#00A733]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#00A733] transition-colors duration-300">Multi-Hospital Access</h3>
                  <p className="text-gray-600">
                    Connect with 50+ hospitals and clinics in your area through one platform
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 bg-white rounded-2xl overflow-hidden group">
              <CardContent className="p-6 text-center relative">
                <div className="absolute inset-0 bg-[#00A733]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-[#00A733]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-8 h-8 text-[#00A733]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#00A733] transition-colors duration-300">Real-Time Slot Booking</h3>
                  <p className="text-gray-600">See available slots in real-time and book instantly without waiting</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 bg-white rounded-2xl overflow-hidden group">
              <CardContent className="p-6 text-center relative">
                <div className="absolute inset-0 bg-[#00A733]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-[#00A733]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Bell className="w-8 h-8 text-[#00A733]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#00A733] transition-colors duration-300">Appointment Reminders</h3>
                  <p className="text-gray-600">Never miss an appointment with smart notifications and reminders</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 bg-white rounded-2xl overflow-hidden group">
              <CardContent className="p-6 text-center relative">
                <div className="absolute inset-0 bg-[#00A733]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-[#00A733]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Star className="w-8 h-8 text-[#00A733]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#00A733] transition-colors duration-300">Doctor Reviews</h3>
                  <p className="text-gray-600">Read verified reviews and ratings to choose the best doctor for you</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}