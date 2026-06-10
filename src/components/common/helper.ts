import { default as JsonSchema } from "../../../output/props-schema.json";
import { PropsInfo } from "@site/src/components/showcase/types";

export const getComponentCode = (codeblock: string, componentName: string) => {
  const code = codeblock
    .split("export function ")
    .find((value) => value.startsWith(componentName + "()"))
    ?.trim();

  return code ? "function " + code : "";
};

export const getLinkedPropPath = (
  sourceProp?: string,
  packageName: "components" | "dates" | "overlays" = "components",
) => {
  if (!sourceProp) return null;

  const targetProps: PropsInfo = (JsonSchema as any)?.[packageName]?.[
    `${sourceProp}`
  ];

  const componentName = sourceProp?.replace(/Props$/, "");

  let doesComponentExist = false;
  try {
    doesComponentExist = !!getComponentCode(
      require(
        `!!raw-loader!@react-native-blossom-ui/showcase/src/${componentName}Showcase`,
      ).default,
      componentName + "Usage",
    );
  } catch (error) {
    doesComponentExist = false;
  }

  // If component exists, link to its props page of the component; otherwise, link to generic type definition page
  return doesComponentExist
    ? `/docs/${packageName}/` + componentName + "#props"
    : targetProps
      ? `/docs/${packageName}/TypesDefinition#` + sourceProp.toLowerCase()
      : null;
};

export const getJSONSchema = () => JsonSchema;

export const getComponentPropsSchema = ({
  componentName,
  tsPropName,
  packageName = "components",
}: {
  componentName?: string;
  tsPropName?: string;
  packageName: "components" | "dates" | "overlays";
}) => {
  const tsName = tsPropName || `${componentName}Props`;

  const data: PropsInfo = (JsonSchema as any)?.[packageName]?.[tsName] || {};

  return data;
};

export const findPropSchema = ({
  componentName,
  tsPropName,
}: {
  componentName?: string;
  tsPropName?: string;
}) => {
  const tsName = tsPropName || `${componentName}Props`;

  const data1: PropsInfo = (JsonSchema as any)?.components?.[tsName] || null;
  const data2: PropsInfo = (JsonSchema as any)?.dates?.[tsName] || null;
  const data3: PropsInfo = (JsonSchema as any)?.overlays?.[tsName] || null;

  return data1 || data2 || data3 || {};
};
