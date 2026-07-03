"use client";

import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConsent } from "@/components/consent/ConsentProvider";

export function CookieControls() {
  const consent = useConsent();

  const handleOpenSettings = () => {
    consent.open();
  };

  const handleAllowAll = () => {
    consent.setAll(true);
  };

  const handleRejectNonEssential = () => {
    consent.setAll(false);
  };

  return (
    <div className="rounded-2xl ring-1 ring-neutral-200 bg-white p-6 md:p-8 border-l-4 border-[#E52629]">
      <div className="space-y-4">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold font-montserrat text-[#1C1C1C] mb-2">
            Manage Your Cookie Preferences
          </h2>
          <p className="text-base md:text-lg leading-8 text-neutral-800 font-inter">
            You can change your choice anytime. Your preferences apply to this website only.
          </p>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleOpenSettings}
            className="bg-[#E52629] text-white hover:bg-[#E52629]/90 focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:ring-offset-2 transition-colors"
            size="lg"
          >
            <Settings className="h-4 w-4" />
            Open Cookie Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
