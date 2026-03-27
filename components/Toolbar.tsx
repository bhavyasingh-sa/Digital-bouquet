'use client'

import { useBouquetStore, FlowerType } from '@/store/useBouquetStore'
import { Rose, Tulip, Sunflower } from './FlowerSVGs'

const tools: { type: FlowerType; icon: React.FC<any>; label: string; color: string }[] = [
  { type: 'rose', icon: Rose, label: 'Rose', color: '#ff9eb5' },
  { type: 'tulip', icon: Tulip, label: 'Tulip', color: '#ffb3c6' },
  { type: 'sunflower', icon: Sunflower, label: 'Sunflower', color: '#fff3b0' },
]

export default function Toolbar() {
  const { addFlower } = useBouquetStore()

  return (
    <div className="
      fixed bottom-6 left-1/2 -translate-x-1/2 md:relative md:bottom-auto md:left-auto md:-translate-x-0
      w-[90%] md:w-36 max-w-sm md:max-w-none
      bg-white/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] md:shadow-[4px_0_24px_rgba(0,0,0,0.03)]
      flex md:flex-col items-center justify-around md:justify-center gap-2 md:gap-8 
      p-3 md:py-10 z-50 overflow-visible border border-white md:border-r md:border-white/50
      rounded-full md:rounded-none md:rounded-r-3xl transition-all duration-300
    ">
      <h2 className="hidden md:block text-[11px] uppercase font-bold tracking-[0.25em] text-gray-400 pb-6 border-b border-gray-100/60 w-full text-center">
        Blooms
      </h2>
      <div className="flex flex-row md:flex-col gap-2 md:gap-6 w-full justify-around items-center px-2">
        {tools.map((tool) => (
          <button
            key={tool.type}
            onClick={() => addFlower(tool.type)}
            className="flex flex-col items-center gap-2 md:gap-3 group px-4 py-2 md:p-5 hover:bg-gray-50/50 rounded-[2rem] transition-all duration-300 shadow-sm border border-transparent hover:border-pink-50 hover:shadow-md active:scale-95"
          >
            <div className="transform group-hover:scale-110 group-active:scale-95 transition-transform duration-300 drop-shadow-sm group-hover:drop-shadow-md">
              <tool.icon size={48} color={tool.color} className="md:w-[64px] md:h-[64px]" />
            </div>
            <span className="hidden md:block text-xs text-gray-500 font-bold tracking-wide group-hover:text-pink-400 transition-colors">{tool.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
