import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLetsTalkStore } from "@/lib/lets-talk-store";
import { ContactFormFields } from "./ContactFormFields";

export function LetsTalkDialog() {
  const { isOpen, closeLetsTalk } = useLetsTalkStore();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeLetsTalk()}>
      <DialogContent 
        className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl border-0 p-0"
        aria-labelledby="lets-talk-dialog-title"
      >
        <div className="p-6 sm:p-8">
          <DialogHeader className="mb-6">
            <DialogTitle 
              id="lets-talk-dialog-title" 
              className="text-2xl sm:text-3xl font-montserrat font-bold text-foreground"
            >
              Let's talk
            </DialogTitle>
            <p className="text-muted-foreground font-inter text-sm sm:text-base mt-2">
              Tell us about your project and we'll get back to you within 24 hours
            </p>
          </DialogHeader>
          
          <ContactFormFields onSuccess={closeLetsTalk} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
