import { Flex } from "@/components/ui/layout";
import { Separator } from "@/components/ui/separator";
import { PlaceholderText } from "../element/text";

type Props = {};

const ServiceProviderFooter = ({}: Props) => {
  return (
    <>
      <Separator />
      <Flex className="h-12 justify-center items-center">
        <a
          href="https://niccari.net/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <PlaceholderText>2022 Niccari</PlaceholderText>
        </a>
      </Flex>
    </>
  );
};

export default ServiceProviderFooter;
