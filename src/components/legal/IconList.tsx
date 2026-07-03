import { Check, Shield, Cookie, Globe, Lock, Users, FileText, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconListProps {
  items: string[];
  icon?: "check" | "shield" | "cookie" | "globe" | "lock" | "users" | "file" | "alert";
  className?: string;
}

const iconMap = {
  check: Check,
  shield: Shield,
  cookie: Cookie,
  globe: Globe,
  lock: Lock,
  users: Users,
  file: FileText,
  alert: AlertCircle,
};

export function IconList({ items, icon = "check", className }: IconListProps) {
  const Icon = iconMap[icon];

  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((item, idx) => (
        <li key={idx} className="flex gap-3 items-start">
          <Icon className="w-5 h-5 text-[#E52629] shrink-0 mt-0.5" aria-hidden="true" />
          <span className="text-base md:text-lg leading-8 text-neutral-800 font-inter">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
