"use client";

import React from "react";
import { Stethoscope, Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

export default function Footer(): React.JSX.Element {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const logoVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -50,
      rotate: -10,
    },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const socialIconVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      rotate: -180,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: "backOut",
      },
    },
  };

  const linkVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.footer
      className="bg-gray-900 text-white py-12 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="grid md:grid-cols-4 gap-8"
          variants={containerVariants}
        >
          {/* Brand Section */}
          <motion.div
            className="space-y-4 p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 backdrop-blur-sm"
            variants={itemVariants}
            whileHover={{
              scale: 1.02,
              backgroundColor: "rgba(31, 41, 55, 0.8)",
              transition: { duration: 0.3 },
            }}
          >
            <motion.div
              className="flex items-center space-x-2"
              variants={logoVariants}
            >
              <motion.div
                className="w-8 h-8 bg-[#00A733] rounded-full flex items-center justify-center shadow-lg"
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  boxShadow: "0 0 20px rgba(0, 167, 51, 0.4)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                {/* <Stethoscope className="w-5 h-5 text-white" /> */}
                <Image
                  alt="CarePoint Logo"
                  width={24}
                  height={24}
                  className="w-5 h-5 lg:w-6 lg:h-6 text-white"
                  src="/logo.png"
                />
              </motion.div>
              <span className="text-xl font-bold">CarePoint</span>
            </motion.div>
            <motion.p className="text-gray-400" variants={linkVariants}>
              Your trusted partner for quick and reliable healthcare booking
              across multiple hospitals.
            </motion.p>
            <motion.div className="flex space-x-4" variants={containerVariants}>
              {[Facebook, Instagram, Twitter].map((Icon, index) => (
                <motion.div key={index} variants={socialIconVariants}>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-[#00A733] transition-colors"
                  >
                    <motion.div
                      whileHover={{
                        scale: 1.2,
                        rotate: 10,
                        color: "#00A733",
                      }}
                      whileTap={{ scale: 0.9 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Product Section */}
          <motion.div
            className="p-6 bg-gray-800/30 rounded-xl border border-gray-700/30 backdrop-blur-sm"
            variants={itemVariants}
            whileHover={{
              scale: 1.02,
              backgroundColor: "rgba(31, 41, 55, 0.6)",
              borderColor: "rgba(0, 167, 51, 0.3)",
              transition: { duration: 0.3 },
            }}
          >
            <motion.h3
              className="font-semibold mb-4 text-white"
              variants={linkVariants}
            >
              Product
            </motion.h3>
            <motion.ul
              className="space-y-2 text-gray-400"
              variants={containerVariants}
            >
              {["Features", "How It Works", "Pricing", "Download"].map(
                (item, index) => (
                  <motion.li key={index} variants={linkVariants}>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors block"
                    >
                      <motion.div
                        whileHover={{
                          x: 5,
                          color: "#ffffff",
                          transition: { duration: 0.2 },
                        }}
                      >
                        {item}
                      </motion.div>
                    </Link>
                  </motion.li>
                )
              )}
            </motion.ul>
          </motion.div>

          {/* Company Section */}
          <motion.div
            className="p-6 bg-gray-800/30 rounded-xl border border-gray-700/30 backdrop-blur-sm"
            variants={itemVariants}
            whileHover={{
              scale: 1.02,
              backgroundColor: "rgba(31, 41, 55, 0.6)",
              borderColor: "rgba(0, 167, 51, 0.3)",
              transition: { duration: 0.3 },
            }}
          >
            <motion.h3
              className="font-semibold mb-4 text-white"
              variants={linkVariants}
            >
              Company
            </motion.h3>
            <motion.ul
              className="space-y-2 text-gray-400"
              variants={containerVariants}
            >
              {["About Us", "Careers", "Press", "Contact"].map(
                (item, index) => (
                  <motion.li key={index} variants={linkVariants}>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors block"
                    >
                      <motion.div
                        whileHover={{
                          x: 5,
                          color: "#ffffff",
                          transition: { duration: 0.2 },
                        }}
                      >
                        {item}
                      </motion.div>
                    </Link>
                  </motion.li>
                )
              )}
            </motion.ul>
          </motion.div>

          {/* Legal Section */}
          <motion.div
            className="p-6 bg-gray-800/30 rounded-xl border border-gray-700/30 backdrop-blur-sm"
            variants={itemVariants}
            whileHover={{
              scale: 1.02,
              backgroundColor: "rgba(31, 41, 55, 0.6)",
              borderColor: "rgba(0, 167, 51, 0.3)",
              transition: { duration: 0.3 },
            }}
          >
            <motion.h3
              className="font-semibold mb-4 text-white"
              variants={linkVariants}
            >
              Legal
            </motion.h3>
            <motion.ul
              className="space-y-2 text-gray-400"
              variants={containerVariants}
            >
              {[
                "Terms of Service",
                "Privacy Policy",
                "Cookie Policy",
                "Support",
              ].map((item, index) => (
                <motion.li key={index} variants={linkVariants}>
                  <Link
                    href="#"
                    className="hover:text-white transition-colors block"
                  >
                    <motion.div
                      whileHover={{
                        x: 5,
                        color: "#ffffff",
                        transition: { duration: 0.2 },
                      }}
                    >
                      {item}
                    </motion.div>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.6,
              delay: 0.8,
              ease: "easeOut",
            },
          }}
          viewport={{ once: true }}
        >
          <motion.p
            whileHover={{
              scale: 1.05,
              color: "#ffffff",
              transition: { duration: 0.2 },
            }}
          >
            &copy; {new Date().getFullYear()} CarePoint. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
