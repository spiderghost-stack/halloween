import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef, cloneElement, isValidElement } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  loading?: boolean;
  asChild?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-halloween-orange text-warm-white border border-halloween-orange hover:bg-orange-700 hover:border-orange-700 active:scale-[0.98]",
  secondary:
    "bg-transparent text-ivory border border-magic-gold hover:bg-magic-gold/10 hover:border-bright-gold active:scale-[0.98]",
  ghost:
    "bg-transparent text-ivory border border-transparent hover:text-bright-gold hover:border-magic-gold/40 active:scale-[0.98]",
  danger:
    "bg-transparent text-dark-red border border-dark-red hover:bg-dark-red/10 active:scale-[0.98]",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-xs tracking-widest",
  md: "px-6 py-3 text-sm tracking-widest",
  lg: "px-8 py-4 text-sm tracking-[0.15em]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      loading = false,
      asChild = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const compClasses = cn(
      "inline-flex items-center justify-center gap-2 font-inter font-medium uppercase rounded-sm transition-all duration-150 cursor-pointer select-none",
      variantClasses[variant],
      sizeClasses[size],
      fullWidth && "w-full",
      (disabled || loading) && "opacity-50 cursor-not-allowed pointer-events-none",
      className
    );

    if (asChild && isValidElement(children)) {
      return cloneElement(children, {
        ...props,
        className: cn(compClasses, (children.props as any).className),
      } as any);
    }

    return (
      <button
        ref={ref}
        className={compClasses}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
