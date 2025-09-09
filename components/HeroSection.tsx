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
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        {/* Replace '/path/to/your/background-image.jpg' with your actual image path */}
        <Image
          src="/background-image.jpg"
          alt="Healthcare Background"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Background overlay with more transparency */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/40 via-white/30 to-emerald-50/25"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,167,51,0.04),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.03),transparent_70%)]"></div>
      </div>

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
          className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Centered Content */}
          <motion.div
            className="space-y-6 md:space-y-8 lg:space-y-10 max-w-4xl"
            variants={slideInLeft}
          >
            {/* Premium Badge */}
            <motion.div
              className="flex justify-center"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge className="bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 text-emerald-700 hover:from-emerald-500/20 hover:to-emerald-600/20 border border-emerald-200/50 px-4 md:px-6 py-1.5 md:py-2 rounded-full backdrop-blur-sm shadow-lg text-xs md:text-sm">
                  <motion.div>
                    <Sparkles className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" />
                  </motion.div>
                  Trusted by 50+ Premium Hospitals
                </Badge>
              </motion.div>
            </motion.div>

            {/* Hero Headline - Centered */}
            <motion.div
              className="space-y-4 md:space-y-6"
              variants={itemVariants}
            >
              <motion.h1
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-[1.1]"
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
                  className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-slate-700 font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                >
                  Experience
                </motion.span>
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl lg:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
              >
                Book doctor appointments from multiple hospitals, all in one
                elegant app. Skip the queues and get the care you need.
              </motion.p>
            </motion.div>

            {/* Premium CTA Buttons - Centered */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center"
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
                  className="bg-gradient-to-r from-[#00A733] to-[#4C9F4D] hover:from-[#4C9F4D] hover:to-[#00A733] text-white px-8 md:px-10 lg:px-12 py-4 md:py-5 rounded-xl hover:shadow-2xl hover:shadow-[#E5F2E5]/50 group w-full sm:w-auto"
                >
                  <span className="text-lg md:text-xl font-semibold">
                    Book a Doctor
                  </span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="ml-3 md:ml-4 w-6 h-6 md:w-7 md:h-7" />
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
                  className="border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 px-8 md:px-10 lg:px-12 py-4 md:py-5 rounded-xl backdrop-blur-sm w-full sm:w-auto"
                >
                  <span className="text-lg md:text-xl font-medium">
                    Watch Demo
                  </span>
                </Button>
              </motion.div>
            </motion.div>

            {/* Premium Social Proof - Centered */}
            <motion.div
              className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 pt-8 md:pt-12"
              variants={itemVariants}
            >
              <motion.div
                className="flex items-center space-x-3 md:space-x-4 bg-white/60 backdrop-blur-sm rounded-xl md:rounded-2xl px-6 md:px-8 py-4 md:py-5 border border-white/30 shadow-lg"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
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
                      <Star className="w-4 h-4 md:w-5 md:h-5 text-amber-400 fill-current" />
                    </motion.div>
                  ))}
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-lg md:text-xl">
                    4.9
                  </span>
                  <p className="text-sm md:text-base text-slate-600">Store Rating</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-3 md:space-x-4 bg-white/60 backdrop-blur-sm rounded-xl md:rounded-2xl px-6 md:px-8 py-4 md:py-5 border border-white/30 shadow-lg"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Users className="w-6 h-6 md:w-7 md:h-7 text-emerald-600" />
                <div>
                  <span className="font-bold text-slate-900 text-lg md:text-xl">
                    250K+
                  </span>
                  <p className="text-sm md:text-base text-slate-600">Active Users</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-3 md:space-x-4 bg-white/60 backdrop-blur-sm rounded-xl md:rounded-2xl px-6 md:px-8 py-4 md:py-5 border border-white/30 shadow-lg"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Shield className="w-6 h-6 md:w-7 md:h-7 text-blue-600" />
                <div>
                  <span className="font-bold text-slate-900 text-lg md:text-xl">
                    100%
                  </span>
                  <p className="text-sm md:text-base text-slate-700">Secure Platform</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;