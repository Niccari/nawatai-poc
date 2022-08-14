import { Divider, Flex, Text } from "@chakra-ui/react";

type Props = {};

const ServiceProviderFooter = ({}: Props): JSX.Element => {
  return (
    <>
      <Divider orientation="horizontal" />
      <Flex h="12" ml="0" mr="0" justifyContent="center" alignItems="center">
        <a
          href="https://niccari.net/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Text color="#212121">2022 Niccari</Text>
        </a>
      </Flex>
    </>
  );
};

export default ServiceProviderFooter;
