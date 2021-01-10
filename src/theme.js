import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

// Chakra-UI theme configs

const fonts = {
  body: "DM Sans, serif",
  heading: "Playfair Display, serif",
  mono: "DM Sans, sans-serif",
};

const breakpoints = createBreakpoints({
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
});

const theme = extendTheme({
  colors: {
    primary: {
      50: "#d5ddd2",
      100: "#bbc5b9",
      200: "#a1ae9e",
      300: "#879683",
      400: "#6e7d6a",
      500: "#556151",
      600: "#3c4539",
      700: "#222b21",
      800: "#051005",
      900: "#051005",
    },
  },
  fonts,
  breakpoints,
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});

export default theme;
