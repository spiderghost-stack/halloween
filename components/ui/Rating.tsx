import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number; // 0–5
  count?: number;
  size?: "sm" | "md";
  showCount?: boolean;
  className?: string;
}

export function Rating({
  value,
  count,
  size = "sm",
  showCount = true,
  className,
}: RatingProps) {
  const starSize = size === "sm" ? 12 : 16;
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i + 1 <= Math.floor(value);
    const partial = !filled && i < value;
    return { filled, partial };
  });

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5">
        {stars.map((star, i) => (
          <Star
            key={i}
            size={starSize}
            className={cn(
              star.filled
                ? "fill-bright-gold text-bright-gold"
                : star.partial
                ? "fill-bright-gold/50 text-bright-gold"
                : "fill-parchment-brown/30 text-parchment-brown/40"
            )}
          />
        ))}
      </div>
      {showCount && count !== undefined && (
        <span
          className={cn(
            "text-parchment-brown font-inter",
            size === "sm" ? "text-xs" : "text-sm"
          )}
        >
          ({count})
        </span>
      )}
    </div>
  );
}
