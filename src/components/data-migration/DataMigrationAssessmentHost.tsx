import { DataMigrationAssessmentModal } from "./DataMigrationAssessmentModal";
import { useDataMigrationAssessmentStore } from "@/lib/data-migration-assessment-store";

export function DataMigrationAssessmentHost() {
  const { isOpen, closeAssessment } = useDataMigrationAssessmentStore();

  return (
    <DataMigrationAssessmentModal
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) closeAssessment();
      }}
    />
  );
}
