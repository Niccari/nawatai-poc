import { Box } from "@/components/ui/layout";
import { Separator } from "@/components/ui/separator";
import AppBar from "./appBar";
import ServiceProviderFooter from "./serviceProviderFooter";
import Sitemap from "./sitemap";

type Props = {
  children: React.ReactNode;
  growContent?: boolean;
};

const MainFrame = ({ children }: Props) => {
  return (
    <Box>
      <AppBar />
      <Box className="p-2">{children}</Box>
      <Separator className="mt-2" orientation="horizontal" />
      <Box className="mt-2 p-2">
        <Sitemap />
      </Box>
      <ServiceProviderFooter />
    </Box>
  );
};

export default MainFrame;
