import React from "react";
import {
  Button,
  ButtonProps,
  View,
  Icon,
} from "@react-native-blossom-ui/components";

import { SIZE_LIST } from "./constant";

export const ButtonModes = () => {
  return (
    <View row style={{ flex: 1, justifyContent: "space-evenly" }}>
      <Button mode={"filled"} title="filled" />
      <Button mode={"tinted"} title="tinted" />
      <Button mode={"outlined"} title="outlined" />
      <Button mode={"plain"} title="plain" />
    </View>
  );
};

export const ButtonDisabled = () => {
  return (
    <View row style={{ flex: 1, justifyContent: "space-evenly" }}>
      <Button disabled mode={"filled"}>
        filled
      </Button>
      <Button disabled mode={"tinted"}>
        tinted
      </Button>
      <Button disabled mode={"outlined"}>
        outlined
      </Button>
      <Button disabled mode={"plain"}>
        plain
      </Button>
    </View>
  );
};

export const ButtonLoading = () => {
  return (
    <View row style={{ flex: 1, justifyContent: "space-evenly" }}>
      <Button isLoading size="small">
        small
      </Button>
      <Button isLoading size="medium">
        medium
      </Button>
      <Button isLoading size="large">
        large
      </Button>
    </View>
  );
};

export const ButtonSizes = () => {
  return (
    <View row style={{ flex: 1, justifyContent: "space-evenly" }}>
      <Button size={"small"} title="small" />
      <Button size={"medium"} title="medium" />
      <Button size={"large"} title="large" />
    </View>
  );
};

export const ButtonIcons = () => {
  return (
    <View row style={{ flex: 1, justifyContent: "space-evenly" }}>
      <Button
        mode={"filled"}
        left={<Icon name="add" size={24} color="white" />}
      >
        filled
      </Button>
      <Button
        mode={"tinted"}
        left={<Icon name="add" size={24} />}
        right={<Icon name="arrow-forward-outline" size={24} />}
      >
        tinted
      </Button>
      <Button
        mode={"outlined"}
        right={<Icon name="arrow-forward-outline" size={24} status="primary" />}
      >
        outlined
      </Button>
      <Button
        mode={"plain"}
        left={<Icon name="add" size={24} />}
        right={<Icon name="arrow-forward-outline" size={24} />}
      >
        plain
      </Button>
    </View>
  );
};

export const ButtonStatuses = () => {
  return (
    <View row style={{ flex: 1, justifyContent: "space-evenly" }}>
      <Button status={"primary"}>primary</Button>
      <Button status={"accent"}>accent</Button>
      <Button status={"success"}>success</Button>
      <Button status={"info"}>info</Button>
      <Button status={"warning"}>warning</Button>
      <Button status={"error"}>error</Button>
    </View>
  );
};

export const ButtonModesSizes = () => {
  return (
    <View style={{ flex: 1, justifyContent: "space-evenly" }}>
      {MODES.map((mode) => (
        <View
          key={mode}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            marginVertical: 6,
          }}
        >
          {SIZE_LIST.map((size) => (
            <Button key={size} mode={mode} size={size}>
              {mode} {size}
            </Button>
          ))}
        </View>
      ))}
    </View>
  );
};

const MODES: ButtonProps["mode"][] = ["filled", "tinted", "outlined", "plain"];
