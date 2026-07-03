import { useHealthCheckStore } from "@/lib/health-check-store";
import { NetworkHealthCheckModal } from "./NetworkHealthCheckModal";

export function NetworkHealthCheckHost() {
  const { isOpen, closeHealthCheck } = useHealthCheckStore();

  return (
    <NetworkHealthCheckModal
      open={isOpen}
      onOpenChange={closeHealthCheck}
    />
  );
}
