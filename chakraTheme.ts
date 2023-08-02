// theme.ts

// 1. import `extendTheme` function
import { extendTheme, ThemeConfig } from "@chakra-ui/react";

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({
  config,
  colors: {
    brand: "#f36100",
  },
  styles: {
    global: () => ({
      body: {
        bg: "#0f0f0f",
      },
    }),
  },
});

export default theme;
