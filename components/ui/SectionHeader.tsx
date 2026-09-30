import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}

export function SectionHeader({
  title,
  subtitle,
  align = "center",
  className,
  titleClassName,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        align === "left" && "items-start text-left",
        className
      )}
    >
      <h2
        className={cn(
          "font-cinzel font-bold text-ivory uppercase tracking-widest text-2xl md:text-3xl lg:text-4xl",
          titleClassName
        )}
      >
        {title}
      </h2>
      {/* Gold separator */}
      <div
        className={cn(
          "flex items-center gap-3",
          align === "center" && "justify-center"
        )}
      >
        <div className="h-px flex-1 max-w-12 bg-gradient-to-r from-transparent to-magic-gold" />
        <div className="w-1.5 h-1.5 rotate-45 bg-magic-gold" />
        <div className="h-px flex-1 max-w-12 bg-gradient-to-l from-transparent to-magic-gold" />
      </div>
      {subtitle && (
        <p className="font-inter text-parchment-brown text-sm md:text-base max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
