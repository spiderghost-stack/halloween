import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";

interface PriceProps {
  price: number;
  originalPrice?: number | null;
  discount?: number | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Price({
  price,
  originalPrice,
  discount,
  size = "md",
  className,
}: PriceProps) {
  const sizeClasses = {
    sm: { current: "text-base", original: "text-xs", badge: "text-[10px]" },
    md: { current: "text-xl", original: "text-sm", badge: "text-xs" },
    lg: { current: "text-3xl", original: "text-base", badge: "text-sm" },
  };

  const s = sizeClasses[size];

  return (
    <div className={cn("flex items-baseline gap-2 flex-wrap", className)}>
      <span
        className={cn("font-cinzel font-semibold text-bright-gold", s.current)}
      >
        {formatPrice(price)}
      </span>
      {originalPrice && (
        <span
          className={cn(
            "font-inter text-parchment-brown line-through",
            s.original
          )}
        >
          {formatPrice(originalPrice)}
        </span>
      )}
      {discount && (
        <span
          className={cn(
            "font-inter font-bold text-halloween-orange",
            s.badge
          )}
        >
          Save {discount}%
        </span>
      )}
    </div>
  );
}
