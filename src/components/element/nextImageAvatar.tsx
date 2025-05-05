import { Box } from "@chakra-ui/react";
import { Avatar } from "./compat/avatar";

export type Props = {
  src?: string;
  name?: string;
  height: string;
  width: string;
};

export const NextImageAvatar = (props: Props) => {
  const { src, name, width, height } = props;
  return (
    <Box
      position="relative"
      width={width || "40px"}
      height={height || "40px"}
      borderRadius="50%"
      background="#DDD"
    >
      {src && (
        <Box
          position="absolute"
          left="1px"
          top="1px"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
        >
          <Avatar
            src={src}
            name={name}
            width={width}
            height={height}
            background={src ? "white" : "transparent"}
          />
        </Box>
      )}
    </Box>
  );
};
