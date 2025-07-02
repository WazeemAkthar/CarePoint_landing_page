'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import Image from 'next/image'

// Mock data for your three screens
const mockupScreens = [
  {
    id: 1,
    src: "/heroimage.png", // Your first screen
    alt: "Hospital Search - CarePoint App"
  },
  {
    id: 2,
    src: "/heroimage2.png", // Your second screen
    alt: "Appointment Booking - CarePoint App"
  },
  {
    id: 3,
    src: "/heroimage3.png", // Your third screen
    alt: "Doctor Profile - CarePoint App"
  }
]

const HeroMockupCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Auto-rotate carousel
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % mockupScreens.length)
      }, 3000) // Change every 3 seconds

      return () => clearInterval(interval)
    }
  }, [isHovered])

  // Smooth transition variants - properly typed
  const mockupVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 30 : -30,
      opacity: 0,
      scale: 0.9,
      rotateY: direction > 0 ? 15 : -15,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 30 : -30,
      opacity: 0,
      scale: 0.9,
      rotateY: direction < 0 ? 15 : -15,
    })
  }

  // Properly typed container variants
  const containerVariants: Variants = {
    hover: {
      scale: 1.02,
    }
  }

  // Background phones for depth effect
  const backgroundPhones = [
    { delay: 0.2, x: -20, y: 10, rotation: -5, opacity: 0.3 },
    { delay: 0.4, x: 20, y: 15, rotation: 8, opacity: 0.25 },
  ]

  const [[page, direction], setPage] = useState([0, 0])

  const paginate = (newDirection: number) => {
    const newIndex = (currentIndex + newDirection + mockupScreens.length) % mockupScreens.length
    setCurrentIndex(newIndex)
    setPage([newIndex, newDirection])
  }

  return (
    <div className="relative">
      {/* Background decorative phones */}
      {backgroundPhones.map((phone, index) => (
        <motion.div
          key={`bg-${index}`}
          className="absolute inset-0 md:w-[200px] md:h-[400px] lg:w-[220px] lg:h-[450px] w-40 h-80 bg-gradient-to-br from-slate-300 to-slate-400 rounded-xl md:rounded-[2rem] shadow-lg opacity-20"
          initial={{ 
            opacity: 0, 
            scale: 0.8,
            x: phone.x,
            y: phone.y,
            rotate: phone.rotation
          }}
          animate={{ 
            opacity: phone.opacity, 
            scale: 0.95,
            x: phone.x,
            y: phone.y,
            rotate: phone.rotation
          }}
          transition={{ 
            delay: 1.2 + phone.delay, 
            duration: 0.8,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Main carousel container */}
      <motion.div
        className="relative md:w-[200px] md:h-[400px] lg:w-[220px] lg:h-[450px] w-40 h-80 perspective-1000"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        variants={containerVariants}
        whileHover="hover"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          delay: 1.5, 
          duration: 0.8,
          scale: {
            duration: 0.3,
            ease: "easeOut"
          }
        }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={mockupVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
              scale: { duration: 0.4 },
              rotateY: { duration: 0.4 }
            }}
            className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl md:rounded-[2rem] shadow-xl md:shadow-2xl shadow-slate-900/20 cursor-pointer"
            onClick={() => paginate(1)}
          >
            <Image
              src={mockupScreens[currentIndex].src}
              alt={mockupScreens[currentIndex].alt}
              width={160}
              height={320}
              className="md:w-[200px] md:h-[400px] lg:w-[220px] lg:h-[450px] w-40 h-80 rounded-xl md:rounded-[2rem] shadow-xl md:shadow-2xl shadow-slate-900/20 object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Subtle navigation dots */}
        {/* <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {mockupScreens.map((_, index) => (
            <motion.button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-green-500 shadow-lg shadow-green-500/50' 
                  : 'bg-slate-300 hover:bg-slate-400'
              }`}
              onClick={() => {
                const direction = index > currentIndex ? 1 : -1
                setCurrentIndex(index)
                setPage([index, direction])
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 + index * 0.1 }}
            />
          ))}
        </div> */}

        {/* Optional: Swipe indicators */}
        <motion.div
          className="absolute top-1/2 -right-8 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
          onClick={() => paginate(1)}
          whileHover={{ scale: 1.1, x: 2 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.2 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9,18 15,12 9,6"></polyline>
          </svg>
        </motion.div>

        <motion.div
          className="absolute top-1/2 -left-8 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
          onClick={() => paginate(-1)}
          whileHover={{ scale: 1.1, x: -2 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.2 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15,18 9,12 15,6"></polyline>
          </svg>
        </motion.div>
      </motion.div>

      {/* Floating elements for extra polish */}
      <motion.div
        className="absolute -top-4 -right-4 w-3 h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/50"
        animate={{
          y: [0, -10, 0],
          opacity: [0.7, 1, 0.7],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        initial={{ opacity: 0 }}
        style={{ 
          animationDelay: '2.5s',
          opacity: 1
        }}
      />
    </div>
  )
}

export default HeroMockupCarousel