'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-24 relative overflow-hidden bg-[#fdfbf7]">
      {/* Animated Breathing Atmosphere */}
      <motion.div 
        className="absolute top-20 left-10 w-72 h-72 bg-pink-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
        animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-40 right-10 w-72 h-72 bg-teal-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
        animate={{ scale: [1, 1.3, 1], x: [0, -40, 0], y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div 
        className="absolute -bottom-8 left-40 w-80 h-80 bg-purple-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
        animate={{ scale: [1, 1.5, 1], x: [0, 30, 0], y: [0, -50, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
      
      {/* Central Glassmorphic Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="z-10 w-full max-w-3xl text-center space-y-10 bg-white/40 p-10 sm:p-16 rounded-[3rem] backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.04)] border border-white/80"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
          className="mx-auto w-20 h-20 bg-gradient-to-tr from-pink-300 to-violet-300 rounded-[2rem] flex items-center justify-center shadow-lg shadow-pink-200"
        >
          <Sparkles className="text-white fill-white" size={36} />
        </motion.div>

        <div className="space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl sm:text-7xl font-bold tracking-tight text-gray-800 font-serif"
          >
            Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 italic">Bouquet</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg sm:text-2xl text-gray-500 max-w-xl mx-auto font-medium leading-relaxed"
          >
            Craft beautiful, personalized digital flower arrangements to share. A timeless gesture, exquisitely boxed in pixels.
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="pt-6"
        >
          <Link href="/build">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-gray-900 text-white px-10 py-5 text-lg font-bold tracking-wide transition-colors hover:bg-gray-800 shadow-[0_20px_40px_rgba(0,0,0,0.2)] focus:outline-none focus:ring-4 focus:ring-pink-200"
            >
              Start Creating
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  )
}
