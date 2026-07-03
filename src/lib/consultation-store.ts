import { create } from 'zustand';

interface ConsultationStore {
  isOpen: boolean;
  openCalendly: () => void;
  closeCalendly: () => void;
}

export const useConsultationStore = create<ConsultationStore>((set) => ({
  isOpen: false,
  openCalendly: () => set({ isOpen: true }),
  closeCalendly: () => set({ isOpen: false }),
}));
