import { Avatar, AvatarProps, Box, chakra } from "@chakra-ui/react";
import Image from "next/image";

const ChakraNextImage = chakra(Image, {
  shouldForwardProp: (prop) =>
    ["width", "height", "left", "top", "position", "src", "alt"].includes(prop),
});
export const NextImageAvatar = (props: AvatarProps) => {
  const { src, name, width, padding, height } = props;
  return (
    <Box
      position="relative"
      width={width || "40px"}
      height={height || "40px"}
      borderRadius="50%"
      background="#DDD"
    >
      <Avatar
        left="1px"
        top="1px"
        width="calc(100% - 2px)"
        height="calc(100% - 2px)"
        position="absolute"
      />
      {src && (
        <Box
          position="absolute"
          left="1px"
          top="1px"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
        >
          <ChakraNextImage
            src={src}
            alt={name ?? "your avatar image"}
            width={80}
            height={80}
            h="auto"
            borderRadius="50%"
            background={src ? "white" : "transparent"}
          />
        </Box>
      )}
    </Box>
  );
};
