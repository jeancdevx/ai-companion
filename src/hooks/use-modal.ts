import { create } from 'zustand'

interface useModalState {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

export const useModal = create<useModalState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false })
}))
