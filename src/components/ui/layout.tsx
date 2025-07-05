import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements;
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ className, as: Component = "div", ...props }, ref) => {
    const Comp = Component as any;
    return <Comp ref={ref} className={cn(className)} {...props} />;
  },
);
Box.displayName = "Box";

interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
  align?: "start" | "end" | "center" | "baseline" | "stretch";
  wrap?: "wrap" | "nowrap" | "wrap-reverse";
  gap?: string;
}

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  (
    { className, direction = "row", justify, align, wrap, gap, ...props },
    ref,
  ) => {
    const directionClasses = {
      row: "flex-row",
      column: "flex-col",
      "row-reverse": "flex-row-reverse",
      "column-reverse": "flex-col-reverse",
    };

    const justifyClasses = {
      start: "justify-start",
      end: "justify-end",
      center: "justify-center",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    };

    const alignClasses = {
      start: "items-start",
      end: "items-end",
      center: "items-center",
      baseline: "items-baseline",
      stretch: "items-stretch",
    };

    const wrapClasses = {
      wrap: "flex-wrap",
      nowrap: "flex-nowrap",
      "wrap-reverse": "flex-wrap-reverse",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          directionClasses[direction],
          justify && justifyClasses[justify],
          align && alignClasses[align],
          wrap && wrapClasses[wrap],
          gap && `gap-${gap}`,
          className,
        )}
        {...props}
      />
    );
  },
);
Flex.displayName = "Flex";

interface StackProps extends HTMLAttributes<HTMLDivElement> {
  spacing?: string;
}

export const VStack = forwardRef<HTMLDivElement, StackProps>(
  ({ className, spacing = "4", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col", `gap-${spacing}`, className)}
        {...props}
      />
    );
  },
);
VStack.displayName = "VStack";

export const HStack = forwardRef<HTMLDivElement, StackProps>(
  ({ className, spacing = "4", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-row", `gap-${spacing}`, className)}
        {...props}
      />
    );
  },
);
HStack.displayName = "HStack";

interface GridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: number | { [key: string]: number };
  spacing?: string;
}

export const SimpleGrid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, columns = 1, spacing = "4", ...props }, ref) => {
    let gridClasses = "grid";

    if (typeof columns === "number") {
      gridClasses += ` grid-cols-${columns}`;
    } else {
      const responsiveColumns = Object.entries(columns)
        .map(([breakpoint, cols]) =>
          breakpoint === "base"
            ? `grid-cols-${cols}`
            : `${breakpoint}:grid-cols-${cols}`,
        )
        .join(" ");
      gridClasses += ` ${responsiveColumns}`;
    }

    return (
      <div
        ref={ref}
        className={cn(gridClasses, `gap-${spacing}`, className)}
        {...props}
      />
    );
  },
);
SimpleGrid.displayName = "SimpleGrid";

export const Container = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("container mx-auto px-4", className)}
      {...props}
    />
  );
});
Container.displayName = "Container";
