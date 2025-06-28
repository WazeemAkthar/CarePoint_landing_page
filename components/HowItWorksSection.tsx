import { Search, Calendar, Stethoscope, ArrowRight, ArrowDown } from "lucide-react"
import { motion, Variants } from "framer-motion"
import { useInView } from "framer-motion"
import { JSX, useRef } from "react"

export default function HowItWorksSection(): JSX.Element {
  const ref = useRef<HTMLElement>(null)
  const isInView: boolean = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 120,
        duration: 0.8
      }
    }
  }

  const iconHoverVariants: Variants = {
    hover: {
      rotate: 360,
      scale: 1.1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300
      }
    }
  }

  const arrowVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.6,
        type: "spring",
        damping: 25,
        stiffness: 120
      }
    }
  }

  const steps: Array<{
    icon: typeof Search;
    title: string;
    description: string;
    step: string;
  }> = [
    {
      icon: Search,
      title: "Search",
      description: "Find doctors and hospitals near you based on specialty, location, and availability",
      step: "1."
    },
    {
      icon: Calendar,
      title: "Book", 
      description: "Select your preferred time slot and book your appointment instantly with confirmation",
      step: "2."
    },
    {
      icon: Stethoscope,
      title: "Get Treated",
      description: "Arrive at your appointment on time and receive the quality healthcare you deserve", 
      step: "3."
    }
  ]

  return (
    <motion.section 
      ref={ref}
      id="how-it-works" 
      className="py-16"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            variants={itemVariants}
          >
            How It Works
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Get the healthcare you need in just three simple steps
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-4xl mx-auto relative"
          variants={containerVariants}
        >
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isLastStep: boolean = index === steps.length - 1;
            
            return (
              <div key={index} className="relative">
                <motion.div
                  className="text-center"
                  variants={itemVariants}
                >
                  <motion.div 
                    className="w-20 h-20 bg-[#00A733] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                    variants={iconHoverVariants}
                    whileHover="hover"
                  >
                    <IconComponent className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  <motion.h3 
                    className="text-xl font-semibold text-gray-900 mb-2"
                    variants={itemVariants}
                  >
                    {step.step} {step.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-gray-600 text-sm md:text-base"
                    variants={itemVariants}
                  >
                    {step.description}
                  </motion.p>
                </motion.div>

                {/* Arrow for desktop - horizontal */}
                {!isLastStep && (
                  <motion.div 
                    className="absolute top-10 left-full transform -translate-x-1/2 translate-x-4 md:translate-x-6 lg:translate-x-8 xl:translate-x-12 hidden md:block z-10"
                    variants={arrowVariants}
                  >
                    <motion.div
                      animate={{
                        x: [0, 5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <ArrowRight className="w-6 h-6 text-[#00A733] opacity-60" />
                    </motion.div>
                  </motion.div>
                )}

                {/* Arrow for mobile - vertical */}
                {!isLastStep && (
                  <motion.div 
                    className="flex justify-center mt-8 mb-4 md:hidden"
                    variants={arrowVariants}
                  >
                    <motion.div
                      animate={{
                        y: [0, 5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <ArrowDown className="w-6 h-6 text-[#00A733] opacity-60" />
                    </motion.div>
                  </motion.div>
                )}
              </div>
            )
          })}
        </motion.div>
      </div>
    </motion.section>
  )
}