import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";

type NextImageAvatarProps = {
  src?: string;
  name?: string;
  width?: string;
  height?: string;
  className?: string;
};

export const NextImageAvatar = ({
  src,
  name,
  width = "40px",
  height = "40px",
  className,
}: NextImageAvatarProps) => {
  return (
    <div
      className={cn(
        "relative bg-gray-300 rounded-full flex items-center justify-center",
        className,
      )}
      style={{ width, height }}
    >
      <Avatar className="w-[calc(100%-2px)] h-[calc(100%-2px)]">
        {src && (
          <AvatarImage
            src={src}
            alt={name ?? "your avatar image"}
            className="w-full h-full rounded-full bg-white"
          />
        )}
        <AvatarFallback className="w-full h-full rounded-full" />
      </Avatar>
    </div>
  );
};
