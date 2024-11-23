import chroma from "chroma-js";

const SHADES_COUNT = 10;
const BG_SHADES_COUNT = 9;

const ALPHA_ARRAY = [0.1, 0.2, 0.3, 0.4, 0.5];

export const getTintColors = (inputColor: string) => {
  return Array(SHADES_COUNT)
    .fill(0)
    .map((_, i) =>
      chroma(inputColor)
        // @ts-ignore
        .tint((i + 1) / SHADES_COUNT)
        .hex()
    );
};

export const getShadeColors = (inputColor: string) => {
  return Array(SHADES_COUNT)
    .fill(0)
    .map((_, i) =>
      chroma(inputColor)
        // @ts-ignore
        .shade((i + 1) / SHADES_COUNT)
        .hex()
    );
};

export const getAlphaColorShades = (inputColor: string) => {
  return ALPHA_ARRAY.map((alpha) => getAlphaColor(inputColor, alpha));
};

export const getAlphaColor = (inputColor?: string, alpha = 0.5) => {
  if (!inputColor) return "";
  return chroma(inputColor).alpha(alpha).hex();
};

export const getDarkenColor = (inputColor?: string, darken = 0.5) => {
  if (!inputColor) return "";
  return chroma(inputColor).darken(darken).hex();
};
