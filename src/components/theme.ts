import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  ...config,
  textStyles: {
    h1: {
      fontSize: ["20px", "24px"],
      fontWeight: "bold",
      lineHeight: "110%",
    },
    h2: {
      fontSize: ["18px", "20px"],
      fontWeight: "bold",
      lineHeight: "110%",
    },
    h3: {
      fontSize: ["16px", "18px"],
      fontWeight: "bold",
      lineHeight: "110%",
    },
  },
});

export default theme;
