import React, { useEffect, useState } from "react";
import {
  BlossomThemeProvider,
  Children,
  ComponentManager,
} from "@react-native-blossom-ui/components";
import { useColorMode } from "@docusaurus/theme-common";
import { ColorModeProvider } from "@docusaurus/theme-common/internal";

import { default as LightTheme } from "./lightTheme.json";
import { default as DarkTheme } from "./darkTheme.json";

// https://github.com/oblador/react-native-vector-icons/issues/1425#issuecomment-1223534931
// @ts-ignore
import Ionicons from "react-native-vector-icons/Fonts/Ionicons.ttf";
// @ts-ignore
import MaterialCommunityIcons from "react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf";

const setupIonicons = () => {
  const IoniconsStyles = `@font-face {
  src: url(${Ionicons});
  font-family: Ionicons;
}`;

  const style = document.createElement("style");
  style.type = "text/css";

  // @ts-ignore
  if (style.styleSheet) {
    // @ts-ignore
    style.styleSheet.cssText = IoniconsStyles;
  } else {
    style.appendChild(document.createTextNode(IoniconsStyles));
  }
  document.head.appendChild(style);
};

const setupMaterialCommunityIcons = () => {
  const MaterialCommunityIconsStyles = `@font-face {
    src: url(${MaterialCommunityIcons});
    font-family: MaterialCommunityIcons;
  }`;

  const style = document.createElement("style");
  style.type = "text/css";

  // @ts-ignore
  if (style.styleSheet) {
    // @ts-ignore
    style.styleSheet.cssText = MaterialCommunityIconsStyles;
  } else {
    style.appendChild(document.createTextNode(MaterialCommunityIconsStyles));
  }
  document.head.appendChild(style);
};

if (typeof document !== "undefined") {
  setupIonicons();
  setupMaterialCommunityIcons();
}

ComponentManager.setDefaultProps({
  Chip() {
    return {
      withCheckIcon: true,
    };
  },
});

const Root = ({ children }: Children) => {
  const [isDark, setIsDark] = useState(false);

  return (
    <BlossomThemeProvider
      theme={isDark ? DarkTheme : LightTheme}
      isDark={isDark}
    >
      <ColorModeProvider>
        {children}
        <ThemeChangeListener
          onChange={(value) => setIsDark(value === "dark" ? true : false)}
        />
      </ColorModeProvider>
    </BlossomThemeProvider>
  );
};

const ThemeChangeListener = ({
  onChange,
}: {
  onChange: (mode: string) => void;
}) => {
  const { colorMode } = useColorMode();

  useEffect(() => {
    onChange(colorMode);
  }, [colorMode]);

  return null;
};

export default Root;
