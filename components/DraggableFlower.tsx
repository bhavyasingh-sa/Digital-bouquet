'use client'

import React, { useRef, useEffect, useState } from 'react'
import { Group, Image as KonvaImage, Transformer, Text, Rect } from 'react-konva'
import useImage from 'use-image'
import { FlowerState, useBouquetStore } from '@/store/useBouquetStore'
import { getFlowerImageSrc } from './FlowerSVGs'

export default function DraggableFlower({
  flower,
  isSelected,
  onSelect,
}: {
  flower: FlowerState
  isSelected: boolean
  onSelect: () => void
}) {
  const shapeRef = useRef<any>(null)
  const trRef = useRef<any>(null)
  const { updateFlower } = useBouquetStore()
  
  const [image] = useImage(getFlowerImageSrc(flower.type, flower.color))

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current])
      trRef.current.getLayer().batchDraw()
    }
  }, [isSelected])

  // snap to grid inside drag logic
  const dragBoundFunc = (pos: any) => {
    const snap = 20
    return {
      x: Math.round(pos.x / snap) * snap,
      y: Math.round(pos.y / snap) * snap,
    }
  }

  return (
    <React.Fragment>
      <Group
        ref={shapeRef}
        x={flower.x}
        y={flower.y}
        scaleX={flower.scale}
        scaleY={flower.scale}
        rotation={flower.rotation}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragStart={(e) => {
          onSelect()
        }}
        onMouseEnter={() => {
          document.body.style.cursor = 'grab'
        }}
        onMouseLeave={() => {
          document.body.style.cursor = 'default'
        }}
        onMouseDown={() => {
          document.body.style.cursor = 'grabbing'
        }}
        onMouseUp={() => {
          document.body.style.cursor = 'grab'
        }}
        onDragEnd={(e) => {
          document.body.style.cursor = 'grab'
          // the coordinates are already snapped due to dragBoundFunc visually, 
          // we save the new final x, y
          updateFlower(flower.id, {
            x: e.target.x(),
            y: e.target.y(),
          })
        }}
        dragBoundFunc={dragBoundFunc}
        onTransformEnd={() => {
          const node = shapeRef.current
          const scaleX = node.scaleX()
          updateFlower(flower.id, {
            x: node.x(),
            y: node.y(),
            rotation: node.rotation(),
            scale: scaleX, // keep scale uniform
          })
        }}
      >
        <KonvaImage
          image={image}
          width={120}
          height={120}
          offsetX={60}
          offsetY={60}
        />
        
        {flower.message && (
          <Group y={70}>
            <Rect 
              x={-60} 
              y={0} 
              width={120} 
              height={30} 
              fill="rgba(255,255,255,0.9)" 
              cornerRadius={15}
              shadowColor="black"
              shadowBlur={6}
              shadowOpacity={0.15}
            />
            <Text
              text={flower.message}
              x={-55}
              y={9}
              width={110}
              align="center"
              fontSize={13}
              fill="#ef476f"
              fontFamily="Inter"
              fontStyle="bold"
            />
          </Group>
        )}
      </Group>
      
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // lock to minimum scale
            if (newBox.width < 50 || newBox.height < 50) {
              return oldBox
            }
            return newBox
          }}
          padding={8}
          anchorSize={10}
          anchorCornerRadius={5}
          borderStroke="#f472b6"
          borderStrokeWidth={2}
          anchorStroke="#ec4899"
          anchorFill="#ffffff"
        />
      )}
    </React.Fragment>
  )
}
