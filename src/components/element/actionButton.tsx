import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export const ActionButton = ({
  children,
  onClick,
  disabled,
  className,
  type = "button",
}: Props) => {
  const isSubmitButton = type === "submit";

  const baseClasses = "bg-orange-500 hover:bg-orange-600 text-white";
  const mergedClassName = className ? cn(baseClasses, className) : baseClasses;

  return (
    <Button
      size={isSubmitButton ? "default" : "sm"}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={mergedClassName}
    >
      {children}
    </Button>
  );
};
