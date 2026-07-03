import { useState, useEffect } from "react";
import { X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useConsultationStore } from "@/lib/consultation-store";

const CALENDLY_URL = "https://calendly.com/systechnosoft-info/30min";

export function CalendlyDialogHost() {
  const { isOpen, closeCalendly } = useConsultationStore();
  const [isLoading, setIsLoading] = useState(true);

  // Reset loading state when dialog opens
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={closeCalendly}>
      <DialogContent className="max-w-5xl w-full p-0 gap-0 rounded-2xl shadow-2xl" hideDefaultClose>
        <DialogHeader className="p-4 pb-3 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-montserrat font-bold text-foreground">
              Book a 30-min consultation
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeCalendly}
              aria-label="Close booking dialog"
              className="h-9 w-9 rounded-full text-neutral-700 hover:text-[#E52629] hover:bg-[#E52629]/10 focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:outline-none"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="relative w-full h-[80vh] md:h-[80vh] bg-background">
          {/* Loading skeleton */}
          {isLoading && (
            <div className="absolute inset-0 p-4 space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          )}

          {/* Calendly iframe */}
          {isOpen && (
            <iframe
              src={CALENDLY_URL}
              className="w-full h-full border-0"
              onLoad={() => setIsLoading(false)}
              title="Schedule a consultation with Systechnosoft"
              loading="lazy"
            />
          )}
        </div>

        <div className="p-4 pt-2 border-t bg-muted/30">
          <p className="text-sm text-muted-foreground text-center">
            Having trouble?{" "}
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E52629] hover:underline inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E52629] rounded"
            >
              Open in Calendly
              <ExternalLink className="h-3 w-3" />
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
