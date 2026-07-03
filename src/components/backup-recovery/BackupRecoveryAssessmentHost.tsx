import { useBackupRecoveryAssessmentStore } from "@/lib/backup-recovery-assessment-store";
import { BackupRecoveryAssessmentModal } from "./BackupRecoveryAssessmentModal";

export function BackupRecoveryAssessmentHost() {
  const { isOpen, closeAssessment } = useBackupRecoveryAssessmentStore();

  return (
    <BackupRecoveryAssessmentModal
      open={isOpen}
      onOpenChange={closeAssessment}
    />
  );
}
