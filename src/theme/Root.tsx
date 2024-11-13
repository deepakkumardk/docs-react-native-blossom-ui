import React from "react";
import {
  BlossomThemeProvider,
  Children,
} from "@react-native-blossom-ui/components";
import { default as DarkTheme } from "./darkTheme.json";

const Root = ({ children }: Children) => {
  return (
    <BlossomThemeProvider theme={DarkTheme} isDark>
      {children}
    </BlossomThemeProvider>
  );
};

export default Root;
