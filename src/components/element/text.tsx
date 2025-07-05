import { Text } from "@/components/ui/typography";
import { ComponentProps } from "react";

type TextProps = ComponentProps<typeof Text>;

export const PrimaryText = (props: TextProps) => {
  return <Text color="primary" {...props} />;
};

export const SecondaryText = (props: TextProps) => {
  return <Text color="secondary" {...props} />;
};

export const PlaceholderText = (props: TextProps) => {
  return <Text color="muted" {...props} />;
};
