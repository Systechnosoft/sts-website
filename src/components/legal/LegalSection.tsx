import { cn } from "@/lib/utils";

interface LegalSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function LegalSection({ id, title, children, className }: LegalSectionProps) {
  return (
    <section 
      id={id}
      className={cn(
        "rounded-2xl ring-1 ring-neutral-200 bg-white p-6 md:p-8 border-l-4 border-[#E52629] scroll-mt-24",
        "transition-all duration-300 ease-out",
        "hover:shadow-lg hover:-translate-y-1 hover:ring-2 hover:ring-[#E52629]/20",
        className
      )}
    >
      <h2 className="text-2xl md:text-3xl font-semibold font-montserrat text-[#1C1C1C] mb-6">
        {title}
      </h2>
      <div className="space-y-4 text-base md:text-lg leading-8 text-neutral-800 font-inter">
        {children}
      </div>
    </section>
  );
}
