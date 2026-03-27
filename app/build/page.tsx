'use client'

import { useState } from 'react'
import Toolbar from '@/components/Toolbar'
import dynamic from 'next/dynamic'
import { useBouquetStore } from '@/store/useBouquetStore'

const Canvas = dynamic(() => import('@/components/Canvas'), { ssr: false })

import { Check, Link as LinkIcon, Loader2, Share2, CornerUpLeft } from 'lucide-react'
import Link from 'next/link'

export default function BuildPage() {
  const { flowers } = useBouquetStore()
  const [isSaving, setIsSaving] = useState(false)
  const [shareUrl, setShareUrl] = useState<string | null>(null)
  const [title, setTitle] = useState('')

  const handleSave = async () => {
    if (flowers.length === 0) return alert('Please add at least one flower.')
    if (!title.trim()) return alert('Please enter a title for your bouquet.')
    setIsSaving(true)
    
    try {
      // Simulate artificial delay for premium UX perception
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const payload = {
        t: title.trim(),
        f: flowers
      }
      
      const jsonString = JSON.stringify(payload)
      const encoded = encodeURIComponent(jsonString)
      
      const url = `${window.location.origin}/view?data=${encoded}`
      setShareUrl(url)
    } catch (e) {
      console.error(e)
      alert("Failed to wrap bouquet into a URL.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-[100dvh] bg-gradient-to-br from-[#fdfbf7] to-[#f8f0fc] overflow-hidden relative">
      <Toolbar />
      <div className="flex-1 flex flex-col relative z-10 w-full overflow-hidden">
        <header className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-4 sm:py-6 bg-transparent z-10 gap-4 transition-all">
          <Link href="/" className="font-bold text-gray-800 tracking-tight text-xl sm:text-2xl hover:opacity-80 transition-opacity">
            Bouquet<span className="text-pink-400">Builder</span>
          </Link>
          
          <div className="flex w-full sm:w-auto items-center gap-3">
            <input 
              type="text" 
              placeholder="Name your bouquet..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 sm:flex-none bg-white/90 border border-pink-100 placeholder:text-gray-400 text-gray-700 font-semibold px-4 sm:px-5 py-3 sm:py-2.5 rounded-full outline-none focus:ring-4 focus:ring-pink-100 transition-all shadow-sm sm:w-64 text-sm"
            />
            <button
              onClick={handleSave}
              disabled={isSaving || flowers.length === 0 || !title.trim()}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-400 to-[#d8bbff] text-white px-5 sm:px-6 py-3 sm:py-2.5 rounded-full font-bold text-sm transition-all hover:scale-105 hover:shadow-[0_8px_30px_rgba(255,192,203,0.4)] active:scale-95 disabled:opacity-40 disabled:hover:scale-100 disabled:hover:shadow-none shadow-md focus:outline-none focus:ring-4 focus:ring-pink-200 shrink-0"
            >
              {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Share2 size={18} />}
              <span className="hidden sm:inline">{isSaving ? 'Wrapping...' : 'Generate Link'}</span>
            </button>
          </div>
        </header>

        <Canvas />
        
        {/* Success Modal mapped beautifully */}
        {shareUrl && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-md p-4 transition-all animate-in fade-in duration-300">
            <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 sm:p-12 max-w-md w-full text-center space-y-8 animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-2 relative shadow-inner">
                <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
                <Check size={48} strokeWidth={3} />
              </div>
              <div className="space-y-3">
                <h3 className="text-3xl font-extrabold text-gray-800 tracking-tight">Ready to Share!</h3>
                <p className="text-gray-500 font-medium">
                  Your beautiful bouquet <span className="text-pink-500 font-bold">"{title}"</span> is wrapped and ready. Copy the link below to send it.
                </p>
              </div>
              
              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-200 focus-within:ring-2 ring-pink-200 transition-all shadow-inner">
                <LinkIcon size={20} className="text-gray-400 shrink-0" />
                <input 
                  type="text" 
                  readOnly 
                  value={shareUrl}
                  className="bg-transparent text-gray-700 w-full outline-none font-semibold truncate cursor-copy" 
                  onClick={(e) => {
                    e.currentTarget.select()
                    navigator.clipboard.writeText(e.currentTarget.value)
                  }}
                />
              </div>

              <div className="flex flex-col gap-4">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(shareUrl)
                    alert('Link copied to clipboard!')
                  }}
                  className="w-full bg-gray-900 text-white rounded-full py-4 font-bold text-lg hover:bg-gray-800 hover:shadow-xl transition-all shadow-[0_10px_40px_rgba(0,0,0,0.15)] active:scale-95"
                >
                  Copy Link
                </button>
                <div className="flex items-center justify-between px-2 pt-2">
                  <Link
                    href={shareUrl.replace(window.location.origin, '')}
                    className="text-sm font-bold text-pink-500 hover:text-pink-600 transition-colors flex items-center gap-1 group"
                  >
                    Open Preview
                    <CornerUpLeft size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <button 
                    onClick={() => {
                      setShareUrl(null)
                      setTitle('')
                      useBouquetStore.getState().setFlowers([])
                    }}
                    className="text-sm font-bold text-gray-400 hover:text-gray-800 transition-colors"
                  >
                    Close & Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
