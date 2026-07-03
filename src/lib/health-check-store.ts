import { create } from 'zustand';

interface HealthCheckStore {
  isOpen: boolean;
  openHealthCheck: () => void;
  closeHealthCheck: () => void;
}

export const useHealthCheckStore = create<HealthCheckStore>((set) => ({
  isOpen: false,
  openHealthCheck: () => set({ isOpen: true }),
  closeHealthCheck: () => set({ isOpen: false }),
}));
