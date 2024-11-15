import React from "react";
import { Avatar, View } from "@react-native-blossom-ui/components";
import { UIDocRenderer } from "@site/src/components/showcase/UIDocRenderer";

const imgSrc = {
  uri: "https://picsum.photos/200/300?random=1",
};

export const AvatarDocs = () => {
  return (
    <>
      <UIDocRenderer
        title="Status"
        componentName={"AvatarStatuses"}
        children={<AvatarStatuses />}
        fileName={"Avatar"}
      />
      <UIDocRenderer
        title="Sizes"
        componentName={"AvatarSizes"}
        children={<AvatarSizes />}
        fileName={"Avatar"}
      />
      <UIDocRenderer
        title="Modes"
        componentName={"AvatarModes"}
        children={<AvatarModes />}
        fileName={"Avatar"}
      />
    </>
  );
};

const AvatarModes = () => {
  return (
    <>
      <Avatar mode={"circle"} initials="A" />
      <Avatar mode={"round"} initials="A" />
      <Avatar mode={"square"} initials="A" />
    </>
  );
};

const AvatarSizes = () => {
  return (
    <>
      <Avatar size={"small"} initials="A" />
      <Avatar size={"medium"} initials="A" />
      <Avatar size={"large"} initials="A" />
    </>
  );
};

const AvatarStatuses = () => {
  return (
    <>
      <Avatar status={"primary"} initials="AB" />
      <Avatar status={"accent"} initials="AB" />
      <Avatar status={"success"} initials="AB" />
      <Avatar status={"info"} initials="AB" />
      <Avatar status={"warning"} initials="AB" />
      <Avatar status={"error"} initials="AB" />
    </>
  );
};
