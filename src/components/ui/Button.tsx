import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import { motion, HTMLMotionProps } from "motion/react";

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    const variants = {
      primary: "bg-pink-600 text-white hover:bg-pink-700 shadow-sm shadow-pink-200",
      secondary: "bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm",
      outline: "border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300",
      ghost: "bg-transparent text-neutral-600 hover:bg-neutral-100",
      danger: "bg-red-500 text-white hover:bg-red-600 shadow-sm shadow-red-100",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
      icon: "h-10 w-10 flex items-center justify-center",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-pink-500/50 disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children as React.ReactNode}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
