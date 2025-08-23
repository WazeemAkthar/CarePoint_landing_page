import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Star,
  Users,
  Calendar,
  CheckCircle,
  Sparkles,
  Shield,
  Clock,
  LucideIcon,
} from "lucide-react";
import Image from "next/image";
import HeroMockupCarousel from './HeroMockupCarousel'
import Link from "next/link";

// TypeScript interfaces
interface ButtonProps {
  children: React.ReactNode;
  size?: "lg" | "sm";
  variant?: "primary" | "outline";
  className?: string;
  onClick?: () => void;
}

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

interface IconProps {
  className?: string;
}

// Button Component with TypeScript
const Button: React.FC<ButtonProps> = ({
  children,
  size = "sm",
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseClasses =
    "font-medium rounded-lg transition-all duration-300 flex items-center justify-center";

  const sizeClasses = size === "lg" ? "px-8 py-4 text-lg" : "px-4 py-2 text-sm";

  const variantClasses =
    variant === "outline"
      ? "border-2 border-[#00A733] text-[#00A733] hover:bg-[#E5F2E5] hover:border-[#4C9F4D]"
      : "bg-[#00A733] text-white hover:bg-[#4C9F4D]";

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Badge Component with TypeScript
const Badge: React.FC<BadgeProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Animation variants with proper typing
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      damping: 12,
      stiffness: 100,
    },
  },
};

const slideInLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      damping: 12,
      stiffness: 100,
      duration: 0.8,
    },
  },
};

const slideInRight = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      damping: 12,
      stiffness: 100,
      duration: 0.8,
    },
  },
};

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

const pulseVariants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

const rotateVariants = {
  animate: {
    rotate: [0, 360],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear" as const,
    },
  },
};

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center py-8 md:py-12 lg:py-16 overflow-hidden">
      {/* Premium Background with Original Light Theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,167,51,0.08),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.05),transparent_70%)]"></div>

      {/* Animated Floating Orbs */}
      <motion.div
        className="hidden md:block absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-emerald-200/20 to-blue-200/20 rounded-full blur-3xl"
        variants={pulseVariants}
        animate="animate"
      />
      <motion.div
        className="hidden md:block absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"
        variants={floatingVariants}
        animate="animate"
      />

      {/* Rotating background elements */}
      <motion.div
        className="hidden lg:block absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-emerald-200/10 to-blue-200/10 rounded-full blur-2xl"
        variants={rotateVariants}
        animate="animate"
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10 w-full">
        <motion.div
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-8rem)]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Content - Mobile Optimized */}
          <motion.div
            className="space-y-6 md:space-y-8 lg:space-y-10 order-2 lg:order-1"
            variants={slideInLeft}
          >
            {/* Premium Badge */}
            <motion.div
              className="flex justify-center lg:justify-start"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge className="bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 text-emerald-700 hover:from-emerald-500/20 hover:to-emerald-600/20 border border-emerald-200/50 px-4 md:px-6 py-1.5 md:py-2 rounded-full backdrop-blur-sm shadow-lg text-xs md:text-sm">
                  <motion.div
                  // animate={{ rotate: [0, 360] }}
                  // transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" />
                  </motion.div>
                  Trusted by 50+ Premium Hospitals
                </Badge>
              </motion.div>
            </motion.div>

            {/* Hero Headline - Mobile Optimized */}
            <motion.div
              className="space-y-4 md:space-y-6 text-center lg:text-left"
              variants={itemVariants}
            >
              <motion.h1
                className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 leading-[1.1]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Your Gateway to Quick and
                <motion.span
                  className="block bg-gradient-to-r from-[#00A733] via-[#4C9F4D] to-[#E5F2E5] bg-clip-text text-transparent"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  Reliable Healthcare
                </motion.span>
                <motion.span
                  className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-slate-700 font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                >
                  Experience
                </motion.span>
              </motion.h1>
              <motion.p
                className="text-base md:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
              >
                Book doctor appointments from multiple hospitals, all in one
                elegant app. Skip the queues and get the care you need.
              </motion.p>
            </motion.div>

            {/* Premium CTA Buttons - Mobile Optimized */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center lg:justify-start"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link href="/login">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#00A733] to-[#4C9F4D] hover:from-[#4C9F4D] hover:to-[#00A733] text-white px-6 md:px-8 lg:px-10 py-3 md:py-4 rounded-xl hover:shadow-2xl hover:shadow-[#E5F2E5]/50 group w-full sm:w-auto"
                >
                  <span className="text-base md:text-lg font-semibold">
                    {/* Download App */}
                    Book a Doctor
                  </span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="ml-2 md:ml-3 w-5 h-5 md:w-6 md:h-6" />
                  </motion.div>
                </Button>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 px-6 md:px-8 lg:px-10 py-3 md:py-4 rounded-xl backdrop-blur-sm w-full sm:w-auto"
                >
                  <span className="text-base md:text-lg font-medium">
                    Watch Demo
                  </span>
                </Button>
              </motion.div>
            </motion.div>

            {/* Premium Social Proof - Mobile Grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 lg:gap-6 pt-2 md:pt-4 max-w-lg mx-auto lg:max-w-none lg:mx-0"
              variants={itemVariants}
            >
              <motion.div
                className="flex items-center justify-center lg:justify-start space-x-2 md:space-x-3 bg-white/50 backdrop-blur-sm rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 border border-white/20 shadow-lg"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.3 + i * 0.1, duration: 0.3 }}
                    >
                      <Star className="w-3 h-3 md:w-4 md:h-4 text-amber-400 fill-current" />
                    </motion.div>
                  ))}
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-sm md:text-base lg:text-lg">
                    4.9
                  </span>
                  <p className="text-xs md:text-sm text-slate-600">Store</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center justify-center lg:justify-start space-x-2 md:space-x-3 bg-white/50 backdrop-blur-sm rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 border border-white/20 shadow-lg"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Users className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-emerald-600" />
                <div>
                  <span className="font-bold text-slate-900 text-sm md:text-base lg:text-lg">
                    250K+
                  </span>
                  <p className="text-xs md:text-sm text-slate-600">Users</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center justify-center lg:justify-start space-x-2 md:space-x-3 bg-white/50 backdrop-blur-sm rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 border border-white/20 shadow-lg"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Shield className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-blue-600" />
                <div>
                  <span className="font-bold text-slate-900 text-sm md:text-base lg:text-lg">
                    100%
                  </span>
                  <p className="text-xs md:text-sm text-slate-600">Secure</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Side - App Mockup Mobile Optimized */}
          <motion.div
            className="relative order-1 lg:order-2 flex justify-center"
            variants={slideInRight}
          >
            {/* Main Phone Container - Responsive */}
            <motion.div
              className="relative w-64 h-80 md:w-80 md:h-96 lg:w-96 lg:h-[500px] bg-gradient-to-br from-white via-slate-50 to-emerald-50/50 rounded-2xl md:rounded-[3rem] p-4 md:p-6 lg:p-8 flex items-center justify-center shadow-xl md:shadow-2xl shadow-slate-900/10 border border-white/20 backdrop-blur-sm"
              whileHover={{ scale: 1.02, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Phone Screen Glow */}
              <motion.div
                className="absolute inset-2 md:inset-4 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 rounded-xl md:rounded-[2.5rem]"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

             <HeroMockupCarousel />

              {/* Premium Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10 rounded-2xl md:rounded-[3rem] pointer-events-none"></div>
            </motion.div>

            {/* Floating Cards - Responsive and Fewer on Mobile */}
            <motion.div
              className="hidden sm:block absolute -top-4 md:-top-6 -left-2 md:-left-6 bg-white/80 backdrop-blur-xl rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl shadow-emerald-500/10 p-2 md:p-4 border border-white/30"
              variants={floatingVariants}
              animate="animate"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg md:rounded-xl flex items-center justify-center">
                  <Calendar className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs md:text-sm font-semibold text-slate-900">
                    Available
                  </p>
                  <p className="text-xs text-slate-600 hidden md:block">
                    Dr. Sarah
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="hidden sm:block absolute -bottom-4 md:-bottom-6 -right-2 md:-right-6 bg-white/80 backdrop-blur-xl rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl shadow-emerald-500/10 p-2 md:p-4 border border-white/30"
              variants={floatingVariants}
              animate="animate"
              whileHover={{ scale: 1.1, rotate: -5 }}
            >
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg md:rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs md:text-sm font-semibold text-slate-900">
                    Booked
                  </p>
                  <p className="text-xs text-slate-600 hidden md:block">
                    2 mins ago
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Third floating card - Only on larger screens */}
            <motion.div
              className="hidden lg:block absolute top-1/2 -left-8 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl shadow-blue-500/10 p-4 border border-white/30"
              variants={floatingVariants}
              animate="animate"
              whileHover={{ scale: 1.1, rotate: 3 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Quick Booking
                  </p>
                  <p className="text-xs text-slate-600">Under 30s</p>
                </div>
              </div>
            </motion.div>

            {/* Background Decorative Elements - Hidden on mobile */}
            <motion.div
              className="hidden md:block absolute -z-10 top-10 right-10 w-32 h-32 lg:w-64 lg:h-64 bg-gradient-to-br from-emerald-200/20 to-blue-200/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="hidden md:block absolute -z-10 bottom-10 left-10 w-24 h-24 lg:w-48 lg:h-48 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
