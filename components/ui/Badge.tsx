import { cn } from "@/lib/utils";

type BadgeVariant = "sale" | "new" | "hot" | "limited" | "default";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  sale: "bg-halloween-orange text-warm-white",
  new: "bg-magic-gold text-castle-black",
  hot: "bg-dark-red text-warm-white",
  limited: "bg-ancient-wood border border-magic-gold text-bright-gold",
  default: "bg-parchment-brown/30 text-ivory border border-parchment-brown/40",
};

export function Badge({ variant = "default", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-[10px] font-inter font-bold uppercase tracking-widest rounded-sm",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export function ProductBadge({ badge }: { badge: string | null }) {
  if (!badge) return null;
  const map: Record<string, BadgeVariant> = {
    SALE: "sale",
    NEW: "new",
    HOT: "hot",
    LIMITED: "limited",
  };
  return <Badge variant={map[badge] ?? "default"}>{badge}</Badge>;
}
