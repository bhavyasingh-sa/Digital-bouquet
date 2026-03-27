import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'

export type FlowerType = 'rose' | 'tulip' | 'sunflower'

export interface FlowerState {
  id: string
  type: FlowerType
  x: number
  y: number
  scale: number
  rotation: number
  color: string
  message: string
}

interface BouquetStore {
  flowers: FlowerState[]
  selectedFlowerId: string | null
  addFlower: (type: FlowerType) => void
  updateFlower: (id: string, updates: Partial<FlowerState>) => void
  removeFlower: (id: string) => void
  setFlowers: (flowers: FlowerState[]) => void
  setSelectedFlowerId: (id: string | null) => void
}

export const useBouquetStore = create<BouquetStore>((set) => ({
  flowers: [],
  selectedFlowerId: null,
  addFlower: (type) =>
    set((state) => {
      const id = uuidv4()
      return {
        flowers: [
          ...state.flowers,
          {
            id,
            type,
            x: 100 + Math.random() * 50,
            y: 100 + Math.random() * 50,
            scale: 1,
            rotation: 0,
            color: type === 'rose' ? '#ff9eb5' : type === 'tulip' ? '#ffb3c6' : '#fff3b0',
            message: '',
          },
        ],
        selectedFlowerId: id,
      }
    }),
  updateFlower: (id, updates) =>
    set((state) => ({
      flowers: state.flowers.map((f) => (f.id === id ? { ...f, ...updates } : f)),
    })),
  removeFlower: (id) =>
    set((state) => ({
      flowers: state.flowers.filter((f) => f.id !== id),
      selectedFlowerId: state.selectedFlowerId === id ? null : state.selectedFlowerId,
    })),
  setFlowers: (flowers) => set({ flowers }),
  setSelectedFlowerId: (id) => set({ selectedFlowerId: id }),
}))
