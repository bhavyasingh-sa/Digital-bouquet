'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FlowerState } from '@/store/useBouquetStore'
import { Rose, Tulip, Sunflower } from '@/components/FlowerSVGs'
import Link from 'next/link'
import { Heart, Sparkles, Volume2, VolumeX } from 'lucide-react'

const flowerMap = {
  rose: Rose,
  tulip: Tulip,
  sunflower: Sunflower,
}

export default function BouquetViewerClient({ flowers, title, shareId }: { flowers: FlowerState[], title: string, shareId: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeMessageId, setActiveMessageId] = useState<string | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Public domain ambient piano explicitly for demonstrations
  const ambientAudioUrl = "https://cdn.pixabay.com/download/audio/2022/02/07/audio_c66cb17c76.mp3?filename=ambient-piano-amp-strings-10711.mp3"

  const handleOpenGift = () => {
    setIsOpen(true)
    if (audioRef.current && !isMuted) {
      audioRef.current.volume = 0.3
      audioRef.current.play().catch((e) => console.log("Audio play blocked by browser:", e))
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(console.error)
      } else {
        audioRef.current.pause()
      }
    }
    setIsMuted(!isMuted)
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden relative font-sans" onClick={() => setActiveMessageId(null)}>
      {/* Background Breathing Gradients */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#fdfbf7] via-[#fff5f8] to-[#eaddff]"></div>
      <motion.div 
        className="absolute inset-0 z-0 bg-gradient-to-tr from-[#ffe5ec] via-transparent to-[#d8bbff] opacity-50 mix-blend-multiply pointer-events-none"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <audio ref={audioRef} src={ambientAudioUrl} loop />

      {/* Interstitial State */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-2xl"
          >
            <div className="flex flex-col items-center gap-8 p-12 text-center max-w-lg">
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }} 
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-24 h-24 bg-gradient-to-tr from-pink-300 to-purple-300 rounded-full flex items-center justify-center shadow-2xl shadow-pink-200"
              >
                <Heart className="text-white fill-white" size={40} />
              </motion.div>
              
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-800 font-serif italic">
                  {title}
                </h1>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-[0.3em]">A digital gift</p>
              </div>

              <button 
                onClick={handleOpenGift}
                className="mt-4 px-10 py-4 bg-white/90 border border-pink-100 rounded-full shadow-xl hover:shadow-2xl hover:bg-white hover:scale-105 transition-all duration-300 text-gray-800 font-bold tracking-wide flex items-center gap-2"
              >
                <Sparkles size={18} className="text-pink-400" />
                Open Bouquet
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Utilities */}
      <header className={`h-20 flex items-center justify-between px-6 sm:px-12 z-20 transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0'} pointer-events-none`}>
        <Link href="/" className="font-bold text-gray-800 tracking-tight text-xl shrink-0 opacity-50 hover:opacity-100 transition-opacity pointer-events-auto">
          Bouquet<span className="text-pink-400">Builder</span>
        </Link>
        <button 
          onClick={toggleMute}
          className="p-3 rounded-full bg-white/50 backdrop-blur border border-white/60 text-gray-600 hover:bg-white transition-colors pointer-events-auto"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </header>

      {/* Cinematic Bouquet Centerpiece */}
      <div className={`flex-1 relative flex items-center justify-center p-4 transition-opacity duration-1000 delay-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        <div className="relative w-full max-w-5xl h-full sm:h-[calc(100vh-8rem)]">
          {isOpen && (
            <motion.div 
              className="absolute inset-0"
              initial="hidden"
              animate="show"
              variants={{
                show: {
                  transition: { staggerChildren: 0.15, delayChildren: 0.5 }
                }
              }}
            >
              {flowers.map((flower) => {
                const FlowerComponent = flowerMap[flower.type]
                const isActive = activeMessageId === flower.id

                return (
                  <motion.div
                    key={flower.id}
                    className="absolute cursor-pointer"
                    style={{
                      left: flower.x,
                      top: flower.y,
                      transformOrigin: 'center center', // native framer scale works perfectly off center
                    }}
                    variants={{
                      hidden: { opacity: 0, scale: 0, y: 50, rotate: flower.rotation - 15 },
                      show: { 
                        opacity: 1, 
                        scale: flower.scale, 
                        y: 0, 
                        rotate: flower.rotation,
                        transition: { type: 'spring', stiffness: 40, damping: 10 } 
                      }
                    }}
                    whileHover={{ scale: flower.scale * 1.05 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveMessageId(isActive ? null : flower.id)
                    }}
                  >
                    {/* The negative translation centers the transform origin mapping identically to Editor logic */}
                    <div className="relative group inline-block transform -translate-x-1/2 -translate-y-1/2">
                      <FlowerComponent color={flower.color} size={120} className="drop-shadow-2xl filter saturate-110" />
                      
                      {/* Interactive Bouncing Note Indicator */}
                      {flower.message && !isActive && (
                        <motion.div 
                          className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-tr from-pink-400 to-rose-300 rounded-full border-[3px] border-white shadow-md flex items-center justify-center z-10"
                          initial={{ scale: 0 }}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        />
                      )}

                      {/* Modal Style Note Overlay on Click */}
                      <AnimatePresence>
                        {flower.message && isActive && (
                          <motion.div 
                            initial={{ opacity: 0, y: 15, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.8 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="absolute top-[100%] left-1/2 -translate-x-1/2 mt-4 px-8 py-5 bg-white backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2rem] border border-pink-50 z-50 min-w-[200px] max-w-[280px] text-center"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="text-base font-medium text-gray-800 leading-relaxed block font-serif italic text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-500">
                              "{flower.message}"
                            </span>
                            {/* Speech bubble generic anchor */}
                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white transform rotate-45 rounded-sm border-l border-t border-pink-50"></div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Footer make your own CTA */}
      <motion.div 
        className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-30 transition-opacity duration-1000 delay-[1500ms] ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        initial={{ y: 20 }}
        animate={{ y: isOpen ? 0 : 20 }}
      >
         <Link 
          href="/build"
          className="bg-white/80 backdrop-blur-lg text-gray-700 px-8 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(255,192,203,0.3)] hover:scale-105 active:scale-95 transition-all outline-none border border-pink-100/50"
        >
          Send your own Bouquet
        </Link>
      </motion.div>
    </div>
  )
}
