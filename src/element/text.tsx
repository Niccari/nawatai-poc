import { useColorModeValue, Text, TextProps } from "@chakra-ui/react";

export const PrimaryText = (props: TextProps) => {
  const fontColor = useColorModeValue("#212121", "#DEDEDE");
  return <Text color={fontColor} {...props} />;
};

export const SecondaryText = (props: TextProps) => {
  const fontColor = useColorModeValue("#666666", "#999999");
  return <Text color={fontColor} {...props} />;
};

export const PlaceholderText = (props: TextProps) => {
  const fontColor = useColorModeValue("#A1A1A1", "#5E5E5E");
  return <Text color={fontColor} {...props} />;
};
