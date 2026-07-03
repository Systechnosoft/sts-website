import { Shield, Sliders, BarChart3, Target } from "lucide-react";
import { motion } from "framer-motion";

interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  examples: string[];
  index: number;
}

function CategoryCard({ icon, title, description, examples, index }: CategoryCardProps) {
  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.26, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl ring-1 ring-neutral-200 bg-white p-6 md:p-8 transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-1 hover:ring-2 hover:ring-[#E52629]/20"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#E52629]/10 flex items-center justify-center">
          <div className="text-[#E52629]">
            {icon}
          </div>
        </div>
        <div className="flex-1 space-y-3">
          <h3 className="text-xl md:text-2xl font-semibold font-montserrat text-[#1C1C1C]">
            {title}
          </h3>
          <p className="text-base md:text-lg leading-8 text-neutral-800 font-inter">
            {description}
          </p>
          <div className="space-y-2">
            <p className="text-sm font-medium text-neutral-700">Examples:</p>
            <ul className="space-y-1">
              {examples.map((example, idx) => (
                <li key={idx} className="text-sm text-neutral-600 leading-relaxed">
                  • {example}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function CookieCategories() {
  const categories = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Essential (Strictly Necessary)",
      description: "These cookies are necessary for the website to function and cannot be switched off. They are usually set in response to actions you take, such as setting privacy preferences or filling in forms.",
      examples: [
        "Site security and authentication",
        "Load balancing and performance",
        "Consent preference storage"
      ]
    },
    {
      icon: <Sliders className="w-6 h-6" />,
      title: "Functional",
      description: "These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings. They may be set by us or by third-party providers.",
      examples: [
        "Language and region preferences",
        "Chat widget session state",
        "Customized interface settings"
      ]
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Analytics/Performance",
      description: "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve how our website works.",
      examples: [
        "Visitor count and traffic sources",
        "Page views and navigation paths",
        "Session duration and bounce rate"
      ]
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Advertising/Marketing",
      description: "These cookies may be set through our site by our advertising partners to build a profile of your interests and show you relevant ads on other sites. We do not sell your personal data.",
      examples: [
        "Remarketing and retargeting",
        "Ad campaign attribution",
        "Cross-site behavioral advertising"
      ]
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {categories.map((category, index) => (
        <CategoryCard key={category.title} {...category} index={index} />
      ))}
    </div>
  );
}
