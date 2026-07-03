import { create } from 'zustand';

interface LetsTalkStore {
  isOpen: boolean;
  openLetsTalk: () => void;
  closeLetsTalk: () => void;
}

export const useLetsTalkStore = create<LetsTalkStore>((set) => ({
  isOpen: false,
  openLetsTalk: () => set({ isOpen: true }),
  closeLetsTalk: () => set({ isOpen: false }),
}));
