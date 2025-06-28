import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import React from "react"

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Marketing Manager",
    content: "CarePoint made booking my appointment so easy! I found a great doctor near me and got an appointment the same day. Highly recommended!",
    avatar: "/SarahJohnson.png?height=48&width=48"
  },
  {
    name: "Michael Chen",
    role: "Software Engineer", 
    content: "The app is incredibly user-friendly. I love how I can see real-time availability and book appointments without calling multiple hospitals.",
    avatar: "/MichaelChen.png?height=48&width=48"
  },
  {
    name: "Emily Rodriguez",
    role: "Teacher",
    content: "As a busy mom, CarePoint saves me so much time. The reminder notifications ensure I never miss appointments for my family.",
    avatar: "/EmilyRodriguez.png?height=48&width=48"
  }
];

export default function TestimonialsSection(): React.JSX.Element {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section 
      ref={ref}
      id="testimonials" 
      className="py-16 bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: isInView ? 1 : 0, 
            y: isInView ? 0 : 30 
          }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied patients who trust CarePoint for their healthcare needs
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ 
                opacity: isInView ? 1 : 0, 
                y: isInView ? 0 : 50,
                scale: isInView ? 1 : 0.95
              }}
              transition={{ 
                duration: 0.7, 
                delay: 0.2 + (index * 0.2)
              }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
            >
              <Card className="border-0 shadow-sm hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden bg-white/80 backdrop-blur-sm h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <motion.div 
                    className="flex items-center mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isInView ? 1 : 0 }}
                    transition={{ delay: 0.4 + (index * 0.2) }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: isInView ? 1 : 0 }}
                        transition={{ 
                          delay: 0.5 + (index * 0.2) + (i * 0.1),
                          duration: 0.3
                        }}
                      >
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  <motion.p 
                    className="text-gray-700 mb-6 leading-relaxed flex-grow"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isInView ? 1 : 0 }}
                    transition={{ delay: 0.6 + (index * 0.2), duration: 0.6 }}
                  >
                    "{testimonial.content}"
                  </motion.p>
                  
                  <motion.div 
                    className="flex items-center mt-auto"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: isInView ? 1 : 0, 
                      x: isInView ? 0 : -20 
                    }}
                    transition={{ delay: 0.8 + (index * 0.2), duration: 0.5 }}
                  >
                    <div className="relative">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="rounded-full mr-4 ring-2 ring-gray-100"
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                          scale: isInView ? 1 : 0, 
                          opacity: isInView ? 1 : 0 
                        }}
                        transition={{ delay: 1.0 + (index * 0.2), duration: 0.4 }}
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}