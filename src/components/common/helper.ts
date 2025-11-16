import { default as JsonSchema } from "../../../output/props-schema.json";
import { PropsInfo } from "@site/src/components/showcase/types";

export const getComponentCode = (codeblock: string, componentName: string) => {
  const code = codeblock
    .split("export function ")
    .find((value) => value.startsWith(componentName + "()"))
    ?.trim();

  return code ? "function " + code : "";
};

export const getLinkedPropPath = (sourceProp: string) => {
  const targetProps: PropsInfo = JsonSchema?.[`${sourceProp}`];

  const componentName = sourceProp?.replace(/Props$/, "");

  let doesComponentExist = false;
  try {
    doesComponentExist = !!getComponentCode(
      require(
        `!!raw-loader!@react-native-blossom-ui/showcase/src/${componentName}Showcase`
      ).default,
      componentName + "Usage"
    );
  } catch (error) {
    doesComponentExist = false;
  }

  // If component exists, link to its props page of the component; otherwise, link to generic type definition page
  return doesComponentExist
    ? "/docs/components/" + componentName + "#props"
    : targetProps
      ? "/docs/components/TypesDefinition#" + sourceProp.toLowerCase()
      : null;
};
