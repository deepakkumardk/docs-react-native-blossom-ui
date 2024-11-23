import React, { useState } from "react";

import {
  shadesArrayToObject,
  getColorShadesWithName,
  getTextColorShade,
  getAlphaColorShadesWithName,
  getTextColorShadesWithName,
} from "../utils";
import ColorPicker from "./ColorPicker";
import { ColorShades } from "@site/src/components/ColorShades";
import CodeBlock from "@theme/CodeBlock";

const MAIN_COLORS = [
  "primary",
  "accent",
  "success",
  "info",
  "warning",
  "error",
];

function ThemeGenerator() {
  const [isDark, setIsDark] = useState(false);
  const [enableAdvanceMode, setEnableAdvanceMode] = useState(false);

  const [colors, setColors] = useState({
    primary: "#1A7AF5",
    accent: "#7B2EDA",
    success: "#22bb33",
    info: "#2d9de5",
    warning: "#f9e154",
    error: "#ff3333",
    bgLight: "#fff",
    bgDark: "#1b1b1d",
  });

  const [themeJson, setThemeJson] = useState({});

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const onColorChange = (
    colorName: string,
    colorValue: string,
    data: object
  ) => {
    colorValue && setColors((prev) => ({ ...prev, [colorName]: colorValue }));

    setThemeJson((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const getDarkThemeJson = () => {
    const bgShades = shadesArrayToObject(
      getTextColorShade(colors.bgLight, colors.bgDark).reverse(),
      "background"
    );
    const textShades = shadesArrayToObject(
      getTextColorShade("white", "black"),
      "text"
    );

    return {
      ...bgShades,
      ...textShades,
    };
  };

  return (
    <div
      style={{
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          marginTop: 16,
          marginBottom: 16,
        }}
      >
        <div>
          <label>Dark Theme</label>
          <input type="checkbox" onChange={toggleTheme} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <ColorPicker
            inputColor={colors["bgLight"]}
            onChange={(value) => {
              onColorChange("bgLight", value, {});
            }}
          />
          <label>Choose Light Theme Surface Color</label>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <ColorPicker
            inputColor={colors["bgDark"]}
            onChange={(value) => {
              onColorChange("bgDark", value, {});
            }}
          />
          <label>Choose Dark Theme Surface Color</label>
        </div>
      </div>

      <div style={{ flexDirection: "row", display: "flex" }}>
        {MAIN_COLORS.map((mainColorName) => (
          <ColorShades
            key={mainColorName}
            inputColor={colors[mainColorName]}
            name={mainColorName}
            colorShades={getColorShadesWithName(
              colors[mainColorName],
              mainColorName
            )}
            transparentShades={getAlphaColorShadesWithName(
              colors[mainColorName],
              mainColorName + "Transparent"
            )}
            onColorChange={onColorChange}
          />
        ))}

        <ColorShades
          inputColor={undefined}
          name={"background"}
          colorShades={shadesArrayToObject(
            isDark
              ? getTextColorShade(colors.bgDark, colors.bgLight)
              : getTextColorShade(colors.bgLight, colors.bgDark),
            "background"
          )}
          onColorChange={onColorChange}
        />
        <ColorShades
          inputColor={undefined}
          name={"text"}
          colorShades={shadesArrayToObject(
            isDark
              ? getTextColorShade("white", "black")
              : getTextColorShade("black", "white"),
            "text"
          )}
          onColorChange={onColorChange}
        />

        <ColorShades
          inputColor={undefined}
          name={"bgLight"}
          colorShades={getTextColorShadesWithName("bgLight", "white", "gray")}
        />
        <ColorShades
          inputColor={undefined}
          name={"bgDark"}
          colorShades={getTextColorShadesWithName("bgDark", "gray", "black")}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 16,
        }}
      >
        <CodeBlock
          className={"codeblock"}
          language="json"
          title="lightTheme.json"
        >
          {JSON.stringify(themeJson, null, 4)}
        </CodeBlock>
        <CodeBlock language="json" title="darkTheme.json">
          {JSON.stringify({ ...themeJson, ...getDarkThemeJson() }, null, 4)}
        </CodeBlock>
      </div>
    </div>
  );
}

export default ThemeGenerator;
