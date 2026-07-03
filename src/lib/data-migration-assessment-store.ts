import { create } from "zustand";

interface DataMigrationAssessmentState {
  isOpen: boolean;
  openAssessment: () => void;
  closeAssessment: () => void;
}

export const useDataMigrationAssessmentStore = create<DataMigrationAssessmentState>((set) => ({
  isOpen: false,
  openAssessment: () => set({ isOpen: true }),
  closeAssessment: () => set({ isOpen: false }),
}));
