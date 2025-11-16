import CodeBlock from "@theme/CodeBlock";
import React from "react";

export const PlaygroundCodeRenderer = (props: {
  componentName: string;
  componentProps: { [key: string]: any };
  packageName?: string;
}) => {
  const { componentName, componentProps, packageName = "components" } = props;

  const getComponentCode = () => {
    const propsEntries = Object.entries(componentProps)
      .map(([key, value]) => {
        let formattedValue = "";

        if (key === "children") {
          return undefined;
        }
        if (typeof value === "string") {
          formattedValue = `"${value}"`;
        } else {
          formattedValue = `{${JSON.stringify(value)}}`;
        }
        return `  ${key}=${formattedValue}`;
      })
      .filter(Boolean)
      .join("\n    ");

    const closingTag = componentProps.children
      ? `>\n    ${componentProps.children}\n    </${componentName}>`
      : `/>`;

    return `import { ${componentName} } from "@react-native-blossom-ui/${packageName}";

function Usage() {
  return (
    <${componentName}
    ${propsEntries}${closingTag}
  );
}
`;
  };

  return (
    <div>
      <h3>Code Snippet</h3>
      <CodeBlock language="tsx">{getComponentCode()}</CodeBlock>
    </div>
  );
};
