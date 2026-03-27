'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Stage, Layer } from 'react-konva'
import { useBouquetStore } from '@/store/useBouquetStore'
import DraggableFlower from './DraggableFlower'

export default function Canvas() {
  const { flowers, selectedFlowerId, setSelectedFlowerId, updateFlower, removeFlower } = useBouquetStore()
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        })
      }
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const checkDeselect = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage()
    if (clickedOnEmpty) {
      setSelectedFlowerId(null)
    }
  }

  const selectedFlower = flowers.find((f) => f.id === selectedFlowerId)

  return (
    <div 
      className="flex-1 relative bg-white border-2 border-dashed border-pink-200 m-4 rounded-3xl overflow-hidden shadow-inner touch-none"
      ref={containerRef}
      onMouseDown={(e) => {
        // if user clicks the wrapper div directly (not canvas)
        if(e.target === containerRef.current) setSelectedFlowerId(null)
      }}
    >
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40">
        <span className="text-2xl font-light text-pink-300 tracking-wide">
          {flowers.length === 0 ? "Select a flower to plant it here" : ""}
        </span>
      </div>
      
      {dimensions.width > 0 && typeof window !== 'undefined' && (
        <Stage
          width={dimensions.width}
          height={dimensions.height}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
          style={{ cursor: selectedFlowerId ? 'default' : 'crosshair' }}
        >
          <Layer>
            {flowers.map((flower) => (
              <DraggableFlower 
                key={flower.id} 
                flower={flower} 
                isSelected={flower.id === selectedFlowerId}
                onSelect={() => setSelectedFlowerId(flower.id)} 
              />
            ))}
          </Layer>
        </Stage>
      )}

      {/* Floating Properties Modal for Selected Flower */}
      {selectedFlower && (
        <div 
          className="absolute z-40 inset-x-2 bottom-28 md:inset-auto md:top-6 md:right-6 bg-white/95 backdrop-blur-3xl shadow-[0_-15px_40px_rgba(0,0,0,0.08)] md:shadow-2xl p-5 rounded-t-[2.5rem] rounded-b-[1.5rem] md:rounded-[2rem] flex flex-col gap-5 border-t md:border border-pink-100 min-w-0 md:min-w-[260px] animate-in slide-in-from-bottom-12 md:slide-in-from-right-8 duration-300 transition-all"
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center px-1">
            <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wider">Flower Details</h3>
            <button 
              onClick={() => removeFlower(selectedFlower.id)}
              className="p-1.5 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
              title="Delete Flower"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
          </div>

          <div className="space-y-2 px-1">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Petal Color</label>
            <div className="flex flex-wrap gap-2.5">
              {['#ff9eb5', '#ffb3c6', '#ffc2d1', '#fff3b0', '#c1ebd3', '#a0c4ff', '#b9fbc0', '#eaddff', '#ffd6a5'].map((c) => (
                <button
                  key={c}
                  onClick={() => updateFlower(selectedFlower.id, { color: c })}
                  className={`w-7 h-7 rounded-full transition-all duration-200 hover:scale-110 ${selectedFlower.color === c ? 'ring-2 ring-gray-600 ring-offset-2 scale-110' : 'shadow-sm border border-black/5'}`}
                  style={{ backgroundColor: c }}
                  aria-label={`Change color to ${c}`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2 px-1">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Attached Note</label>
            <textarea 
              placeholder="Add a sweet note..."
              maxLength={24}
              value={selectedFlower.message || ''}
              onChange={(e) => updateFlower(selectedFlower.id, { message: e.target.value })}
              className="w-full bg-gray-50/50 border border-gray-200 focus:bg-white outline-none focus:border-pink-300 focus:ring-4 focus:ring-pink-50 rounded-2xl px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 resize-none h-24 transition-all"
            />
            <div className="text-right text-[10px] text-gray-400 font-medium">
              {(selectedFlower.message || '').length}/24 chars
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
