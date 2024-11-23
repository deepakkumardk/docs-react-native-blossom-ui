import {
  getAlphaColorShades,
  getShadeColors,
  getTintColors,
} from "@site/src/utils/shadeUtil";
import chroma from "chroma-js";

const FILTER_INDEX = [0, 2, 4, 7];
const BG_SHADES_COUNT = 9;

/**
 * Generate the colors shade array in hex format
 */
const generateColorShades = (
  inputColor: string,
  filterIndex = FILTER_INDEX
) => {
  const lowerShades = getTintColors(inputColor)
    .filter((_, i) => (filterIndex?.length ? filterIndex?.includes(i) : true))
    .reverse();

  const higherShades = getShadeColors(inputColor).filter((_, i) =>
    filterIndex?.length ? filterIndex?.includes(i) : true
  );

  return [...lowerShades, inputColor.toLowerCase(), ...higherShades];
};

export function getColorShadesWithName(color?: string, name?: string) {
  if (!color) return {};

  return shadesArrayToObject(generateColorShades(color), name ?? "");
}

export function getAlphaColorShadesWithName(color?: string, name?: string) {
  if (!color) return {};

  return shadesArrayToObject(getAlphaColorShades(color), name ?? "");
}

export function getTextColorShadesWithName(
  name: string,
  startColor: string,
  endColor: string
) {
  return shadesArrayToObject(
    getTextColorShade(startColor, endColor),
    name ?? ""
  );
}

/**
 *
 * @returns object with name from 100-900 from the given array
 */
export function shadesArrayToObject(array: string[], name: string) {
  let obj = {};

  array
    .map((value, i) => ({
      [`${name}${(i + 1) * 100}`]: value,
    }))
    .forEach((item) => {
      obj = {
        ...obj,
        ...item,
      };
    });

  return obj;
}

export function getBgColorShade(mode: "light" | "dark", surfaceColor?: string) {
  const firstColor = mode === "light" ? surfaceColor || "white" : "gray";
  const lastColor = mode === "light" ? "gray" : surfaceColor || "black";

  const shades = chroma
    .bezier([firstColor, lastColor])
    .scale()
    .mode("lab")
    .colors(BG_SHADES_COUNT);

  return shades;
}

export function getTextColorShade(startColor: string, endColor: string) {
  return chroma
    .scale([startColor, endColor])
    .mode("lab")
    .colors(BG_SHADES_COUNT);
}

/**
 *
 * @returns the text color based on the luminance of the input bgColor
 */
export const getTextColor = (bgColor?: string) => {
  if (!bgColor) return "black";
  const lum = chroma(bgColor).luminance();
  const alpha = chroma(bgColor).rgba()[3];
  if (!alpha || alpha > 0.5) {
    return lum < 0.4 ? "white" : "black";
  }
  return "gray";
};
