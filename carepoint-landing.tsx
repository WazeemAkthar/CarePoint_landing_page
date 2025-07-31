"use client"

import Header from "@/components/Header"
import HeroSection from "@/components/HeroSection"
import FeaturesSection from "@/components/FeaturesSection"
import HowItWorksSection from "@/components/HowItWorksSection"
import TestimonialsSection from "@/components/TestimonialsSection"
import ContactUs from '@/components/ContactUs';
import CTASection from "@/components/CTASection"
import Footer from "@/components/Footer"

export default function CarePointLanding() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <ContactUs/>
      <CTASection />
      <Footer />
    </div>
  )
}