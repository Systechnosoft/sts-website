import { useState, useMemo } from "react";
import { Search, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import cookieData from "../../../content/legal/cookies.registry.json";

interface CookieItem {
  name: string;
  provider: string;
  purpose: string;
  retention: string;
  policyUrl: string;
}

interface CookieCategory {
  key: string;
  label: string;
  description: string;
  items: CookieItem[];
}

export function CookieRegistry() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) {
      return cookieData.categories as CookieCategory[];
    }

    const term = searchTerm.toLowerCase();
    return cookieData.categories
      .map((category) => ({
        ...category,
        items: category.items.filter(
          (item: CookieItem) =>
            item.name.toLowerCase().includes(term) ||
            item.provider.toLowerCase().includes(term) ||
            item.purpose.toLowerCase().includes(term)
        ),
      }))
      .filter((category) => category.items.length > 0) as CookieCategory[];
  }, [searchTerm]);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-semibold font-montserrat text-[#1C1C1C]">
          Cookie Registry
        </h2>
        <p className="text-base md:text-lg leading-8 text-neutral-800 font-inter max-w-3xl">
          Below is a comprehensive list of cookies and similar technologies we use on our website. 
          This registry is regularly updated to reflect current practices.
        </p>
        
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input
            type="search"
            placeholder="Search cookies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:outline-none"
          />
        </div>
      </div>

      {/* Registry Table */}
      <div className="rounded-2xl ring-1 ring-neutral-200 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Provider</TableHead>
                <TableHead className="font-semibold">Category</TableHead>
                <TableHead className="font-semibold">Purpose</TableHead>
                <TableHead className="font-semibold">Retention</TableHead>
                <TableHead className="font-semibold">Policy</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-neutral-500">
                    No cookies found matching "{searchTerm}"
                  </TableCell>
                </TableRow>
              ) : (
                filteredCategories.map((category) => (
                  <>
                    {/* Category header row */}
                    <TableRow key={`header-${category.key}`} className="bg-neutral-50">
                      <TableCell colSpan={6} className="font-semibold text-[#E52629]">
                        {category.label}
                      </TableCell>
                    </TableRow>
                    {/* Cookie items */}
                    {category.items.map((item: CookieItem, idx: number) => (
                      <TableRow key={`${category.key}-${idx}`}>
                        <TableCell className="font-mono text-sm">{item.name}</TableCell>
                        <TableCell>{item.provider}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-700">
                            {category.label}
                          </span>
                        </TableCell>
                        <TableCell className="max-w-xs">{item.purpose}</TableCell>
                        <TableCell className="whitespace-nowrap">{item.retention}</TableCell>
                        <TableCell>
                          <a
                            href={item.policyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[#E52629] hover:underline focus-visible:ring-2 focus-visible:ring-[#E52629] focus-visible:outline-none rounded"
                          >
                            View
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <p className="text-sm text-neutral-600 font-inter">
        <strong>Last updated:</strong> {cookieData.generatedAt}
      </p>
    </div>
  );
}
