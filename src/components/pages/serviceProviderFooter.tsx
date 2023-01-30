import { Divider, Flex } from "@chakra-ui/react";
import { PlaceholderText } from "../element/text";

type Props = {};

const ServiceProviderFooter = ({}: Props) => {
  return (
    <>
      <Divider orientation="horizontal" />
      <Flex h="12" ml="0" mr="0" justifyContent="center" alignItems="center">
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
