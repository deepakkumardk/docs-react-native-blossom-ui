import React, { useEffect, useState } from "react";
import CodeBlock from "@theme/CodeBlock";

// Prettier v3 browser-compatible imports
import prettier from "prettier/standalone.mjs";
import pluginTS from "prettier/plugins/typescript.mjs";
import pluginESTree from "prettier/plugins/estree.mjs";

export const PlaygroundCodeRenderer = (props: {
  componentName: string;
  componentProps: { [key: string]: any };
  packageName?: string;
}) => {
  const { componentName, componentProps, packageName = "components" } = props;

  const getComponentCode = () => {
    const propsEntries = Object.entries(componentProps)
      .map(([key, value]) => {
        if (key === "children") return undefined;

        let formattedValue = "";
        if (typeof value === "string") {
          formattedValue = `"${value}"`;
        } else {
          formattedValue = `{${JSON.stringify(value)}}`;
        }

        return `  ${key}=${formattedValue}`;
      })
      .filter(Boolean)
      .join("\n");

    const closingTag = componentProps.children
      ? `>${componentProps.children}\n</${componentName}>`
      : `/>`;

    return `import { ${componentName} } from "@react-native-blossom-ui/${packageName}";

    function Usage() {
        return (
            <${componentName}${propsEntries}${closingTag}
        );
    }
`;
  };

  const [formattedTSXCode, setFormattedTSXCode] = useState(getComponentCode());

  const formatTSX = async () => {
    try {
      const formattedCode = await prettier.format(getComponentCode(), {
        parser: "typescript",
        plugins: [pluginTS, pluginESTree],
        filepath: "file.tsx", // ensures TSX rules are applied
        singleAttributePerLine: true,
        jsxSingleQuote: false,
        trailingComma: "es5",
      });

      setFormattedTSXCode(formattedCode);
    } catch (err) {
      console.warn("formatTSX -> err:", err);
    }
  };

  useEffect(() => {
    formatTSX();
  }, [componentProps, componentName]);

  return (
    <div>
      <CodeBlock language="tsx" title={`Code Snippet`}>
        {formattedTSXCode}
      </CodeBlock>
    </div>
  );
};
