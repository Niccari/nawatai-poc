import {
  Avatar as AvaterChakra,
  AvatarRootProps,
  AvatarGroup,
} from "@chakra-ui/react";

export type AvatarProps = AvatarRootProps &
  Partial<{
    src?: string;
    name?: string;
    height: string;
    width: string;
    background: string;
  }>;

export const Avatar = (props: AvatarProps) => {
  const { src, width, name, height, background } = props;

  return (
    <AvatarGroup>
      <AvaterChakra.Root>
        <AvaterChakra.Fallback name={name} />
        <AvaterChakra.Image
          src={src}
          alt={name ?? "your avatar image"}
          width={parseInt(width?.toString() ?? "40", 10)}
          height={parseInt(height?.toString() ?? "40", 10)}
          w="100%"
          h="100%"
          borderRadius="50%"
          background={background}
        />
      </AvaterChakra.Root>
    </AvatarGroup>
  );
};
//
