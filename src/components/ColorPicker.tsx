import React, { useState } from "react";

import { useBlossomTheme } from "@react-native-blossom-ui/components";
import { Sketch } from "@uiw/react-color";

const ColorPicker = ({
  inputColor,
  onChange,
}: {
  inputColor?: string;
  onChange: (color: string) => void;
}) => {
  const { colors, isDark } = useBlossomTheme();

  const [showColorPicker, setShowColorPicker] = useState(false);

  return (
    <div>
      <button
        type="button"
        style={{
          background: inputColor || colors.background100,
          width: 30,
          height: 30,
          margin: 8,
          borderWidth: 1,
          borderRadius: 20,
          borderColor: inputColor ? "gray" : undefined,
        }}
        onClick={() => {
          inputColor ? setShowColorPicker((prev) => !prev) : undefined;
        }}
      />
      {inputColor && showColorPicker ? (
        <Sketch
          style={{
            position: "absolute",
          }}
          color={inputColor}
          onChange={(value) => {
            onChange(value.hexa);
          }}
        />
      ) : null}
    </div>
  );
};

export default ColorPicker;
