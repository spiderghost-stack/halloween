import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center gap-1.5 text-xs font-inter", className)}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={index} className="flex items-center gap-1.5">
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-parchment-brown hover:text-bright-gold transition-colors duration-150 uppercase tracking-wider"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(
                  "uppercase tracking-wider",
                  isLast ? "text-ivory" : "text-parchment-brown"
                )}
              >
                {item.label}
              </span>
            )}
            {!isLast && (
              <ChevronRight
                size={12}
                className="text-parchment-brown/50 flex-shrink-0"
              />
            )}
          </span>
        );
      })}
    </nav>
  );
}
