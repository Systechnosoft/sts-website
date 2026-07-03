import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function CookieSettingsButton() {
  const { toast } = useToast();

  const handleOpenSettings = () => {
    // In production, this would open your cookie consent modal
    // For now, showing a toast as placeholder
    toast({
      title: "Cookie Settings",
      description: "Cookie preference center would open here. Integrate with your consent management platform (e.g., OneTrust, Cookiebot).",
    });
  };

  return (
    <Button
      onClick={handleOpenSettings}
      variant="outline"
      className="inline-flex items-center gap-2 border-[#E52629] text-[#E52629] hover:bg-[#E52629] hover:text-white focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:outline-none transition-colors"
    >
      <Settings className="h-4 w-4" />
      Open Cookie Settings
    </Button>
  );
}
