"use client";

import React, { useRef, useState } from "react";

import chroma from "chroma-js";

import {
  shadesArrayToObject,
  getColorShadesWithName,
  getBgColors,
  getTextColor,
  textColorShade,
} from "../utils";
import ColorPicker from "./ColorPicker";

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
    bgDark: "#000",
  });

  const themeObjRef = useRef({});

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const renderColorShades = (
    inputColor?: string,
    name = "",
    data: object = {}
  ) => {
    if (!inputColor && !Object.keys(data).length) return null;
    let colorsData = data;
    if (!Object.keys(data).length) {
      colorsData = getColorShadesWithName(inputColor, name);
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showColorPicker, setShowColorPicker] = useState(false);

    themeObjRef.current = {
      ...themeObjRef.current,
      ...colorsData,
    };

    return (
      <div
        style={{
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
          margin: 8,
        }}
      >
        <b>{name}</b>

        <ColorPicker
          inputColor={inputColor}
          // @ts-ignore
          background={colors[name]}
          onChange={(value) => {
            setColors((prev) => ({ ...prev, [name]: value }));
          }}
        />

        {Object.entries(colorsData).map(
          ([key, color]: [string, string], index) => (
            <div
              key={key}
              // className="center"
              style={{
                width: index == 4 ? 100 : 90,
                padding: index === 4 ? 4 : 0,
                fontWeight: index === 4 ? "bold" : "normal",
                backgroundColor: color,
                justifyContent: "center",
                display: "flex",
              }}
            >
              <div>
                <p
                  style={{
                    color: chroma(getTextColor(color)).alpha(0.8).hex(),
                    marginBottom: 0,
                  }}
                >
                  {(index + 1) * 100}
                </p>
                <p
                  style={{
                    color: getTextColor(color),
                    marginBottom: 0,
                  }}
                >
                  {color}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        // display: "flex",
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
          justifyContent: "space-evenly",
        }}
      >
        <div>
          <label>Choose Light Theme Surface Color</label>

          <ColorPicker
            inputColor={colors["bgLight"]}
            background={colors["bgLight"]}
            onChange={(value) => {
              setColors((prev) => ({ ...prev, bgLight: value }));
            }}
          />
        </div>
        <div>
          <label>Choose Dark Theme Surface Color</label>

          <ColorPicker
            inputColor={colors["bgDark"]}
            background={colors["bgDark"]}
            onChange={(value) => {
              setColors((prev) => ({ ...prev, bgDark: value }));
            }}
          />
        </div>
      </div>
      <div style={{ flexDirection: "row", display: "flex" }}>
        {renderColorShades(colors.primary, "primary")}
        {renderColorShades(colors.accent, "accent")}

        {renderColorShades(colors.success, "success")}
        {renderColorShades(colors.info, "info")}
        {renderColorShades(colors.warning, "warning")}
        {renderColorShades(colors.error, "error")}

        {renderColorShades(
          undefined,
          "background",
          shadesArrayToObject(
            isDark
              ? textColorShade(colors.bgLight, colors.bgDark).reverse()
              : textColorShade(colors.bgLight, colors.bgDark),
            "background"
          )
        )}
        {renderColorShades(
          undefined,
          "text",
          shadesArrayToObject(
            !isDark
              ? textColorShade(colors.bgLight, colors.bgDark).reverse()
              : textColorShade(colors.bgLight, colors.bgDark),
            "text"
          )
        )}

        {renderColorShades(
          undefined,
          "bgLight",
          shadesArrayToObject(getBgColors("light"), "bgLight")
        )}
        {renderColorShades(
          undefined,
          "bgDark",
          shadesArrayToObject(getBgColors("dark"), "bgDark")
        )}
      </div>
      <div
        style={{
          justifyContent: "center",
        }}
      >
        <pre>
          <div
            style={{
              justifyContent: "flex-end",
              display: "flex",
            }}
          >
            <button
              type="button"
              onClick={async () => {
                await navigator.clipboard.writeText(
                  JSON.stringify(themeObjRef.current, null, 4)
                );
              }}
            >
              Copy
            </button>
          </div>

          <div>{JSON.stringify(themeObjRef.current, null, 4)}</div>
        </pre>
      </div>
    </div>
  );
}

export default ThemeGenerator;
