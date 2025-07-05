import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  weight?: "normal" | "medium" | "semibold" | "bold";
  color?: "primary" | "secondary" | "muted" | "accent" | "destructive";
}

export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      className,
      as: Component = "p",
      size = "md",
      weight = "normal",
      color = "primary",
      ...props
    },
    ref,
  ) => {
    const sizeClasses = {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
    };

    const weightClasses = {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    };

    const colorClasses = {
      primary: "text-foreground",
      secondary: "text-muted-foreground",
      muted: "text-muted-foreground",
      accent: "text-accent-foreground",
      destructive: "text-destructive",
    };

    const Comp = Component as any;
    return (
      <Comp
        ref={ref}
        className={cn(
          sizeClasses[size],
          weightClasses[weight],
          colorClasses[color],
          className,
        )}
        {...props}
      />
    );
  },
);
Text.displayName = "Text";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, as: Component = "h2", size = "lg", ...props }, ref) => {
    const sizeClasses = {
      sm: "text-sm font-semibold",
      md: "text-base font-semibold",
      lg: "text-lg font-bold",
      xl: "text-xl font-bold",
      "2xl": "text-2xl font-bold",
      "3xl": "text-3xl font-bold",
    };

    const Comp = Component as any;
    return (
      <Comp
        ref={ref}
        className={cn(sizeClasses[size], "text-foreground", className)}
        {...props}
      />
    );
  },
);
Heading.displayName = "Heading";
