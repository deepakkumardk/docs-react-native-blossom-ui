import React from "react";
import {
  Avatar,
  AvatarProps,
  BlossomSize,
  View,
} from "@react-native-blossom-ui/components";

export const imgSrc = {
  uri: "https://picsum.photos/200/300?random=1",
};

export const AvatarModes = () => {
  return (
    <View row style={{ flex: 1, justifyContent: "space-evenly" }}>
      <Avatar mode={"circle"} url="https://picsum.photos/200/300?random=1" />
      <Avatar mode={"round"} url="https://picsum.photos/200/300?random=1" />
      <Avatar mode={"square"} url="https://picsum.photos/200/300?random=1" />
    </View>
  );
};

export const AvatarSizes = () => {
  return (
    <View row style={{ flex: 1, justifyContent: "space-evenly" }}>
      <Avatar size={"small"} initials="A" />
      <Avatar size={"medium"} initials="A" />
      <Avatar size={"large"} initials="A" />
    </View>
  );
};

export const AvatarStatuses = () => {
  return (
    <View row style={{ flex: 1, justifyContent: "space-evenly" }}>
      <Avatar status={"primary"} initials="AB" />
      <Avatar status={"accent"} initials="AB" />
      <Avatar status={"success"} initials="AB" />
      <Avatar status={"info"} initials="AB" />
      <Avatar status={"warning"} initials="AB" />
      <Avatar status={"error"} initials="AB" />
    </View>
  );
};

export const AvatarModesSizes = () => {
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
          {SIZES.map((size) => (
            <Avatar
              key={size}
              status="accent"
              mode={mode}
              size={size}
              initials="AB"
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const MODES: AvatarProps["mode"][] = ["circle", "round", "square"];

const SIZES: BlossomSize[] = ["small", "medium", "large"];
