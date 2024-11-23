import React, { useEffect } from "react";

import chroma from "chroma-js";

import ColorPicker from "@site/src/components/ColorPicker";
import { getTextColor } from "@site/src/utils";

export const ColorShades = ({
  inputColor,
  name = "",
  colorShades = {},
  transparentShades = {},
  onColorChange,
}: {
  inputColor?: string;
  name: string;
  colorShades?: object;
  transparentShades?: object;
  onColorChange?: (colorName: string, colorValue: string, data: object) => void;
}) => {
  useEffect(() => {
    inputColor &&
      onColorChange?.(name, inputColor, {
        ...colorShades,
        ...transparentShades,
      });
  }, []);

  useEffect(() => {
    onColorChange?.(name, inputColor, {
      ...colorShades,
      ...transparentShades,
    });
  }, [JSON.stringify(colorShades)]);

  const ColorBox = ({ color, index }: { color: string; index: number }) => {
    return (
      <div
        className="center"
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
    );
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
        onChange={(value) => {
          onColorChange?.(name, value, {
            ...colorShades,
            ...transparentShades,
          });
        }}
      />

      {Object.entries(colorShades).map(
        ([key, color]: [string, string], index) => (
          <ColorBox key={key} color={color} index={index} />
        )
      )}
      {Object.keys(transparentShades).length ? (
        <p
          style={{
            fontWeight: "bold",
            marginTop: 8,
            marginBottom: 8,
          }}
        >
          {"transparent"}
        </p>
      ) : null}
      {Object.entries(transparentShades).map(
        ([key, color]: [string, string], index) => (
          <ColorBox key={key} color={color} index={index} />
        )
      )}
    </div>
  );
};
