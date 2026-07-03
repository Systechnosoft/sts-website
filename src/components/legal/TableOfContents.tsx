import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { scrollToId } from "@/lib/scrollUtils";

interface TocSection {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  sections: TocSection[];
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -66%",
        threshold: 0,
      }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleClick = (id: string) => {
    scrollToId(id, 120);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(id);
    }
  };

  return (
    <>
      {/* Desktop: Sticky TOC */}
      <aside
        className="hidden lg:block sticky top-24 h-fit"
        aria-label="Table of contents"
      >
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold text-[#1C1C1C] mb-4 font-montserrat">
              Table of Contents
            </h2>
            <nav>
              <ul className="space-y-2">
                {sections.map(({ id, title }) => (
                  <li key={id}>
                    <button
                      onClick={() => handleClick(id)}
                      onKeyDown={(e) => handleKeyDown(e, id)}
                      className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:outline-none ${
                        activeSection === id
                          ? "bg-[#E52629] text-white font-semibold"
                          : "text-[#3C3C3C] hover:bg-[#E52629]/10 hover:text-[#E52629]"
                      }`}
                      aria-current={activeSection === id ? "location" : undefined}
                    >
                      {title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </CardContent>
        </Card>
      </aside>
    </>
  );
}
