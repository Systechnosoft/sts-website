import { create } from 'zustand';

interface BackupRecoveryAssessmentStore {
  isOpen: boolean;
  openAssessment: () => void;
  closeAssessment: () => void;
}

export const useBackupRecoveryAssessmentStore = create<BackupRecoveryAssessmentStore>((set) => ({
  isOpen: false,
  openAssessment: () => set({ isOpen: true }),
  closeAssessment: () => set({ isOpen: false }),
}));
