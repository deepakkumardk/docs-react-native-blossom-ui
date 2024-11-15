import React, { useState } from "react";

import CodeBlock from "@theme/CodeBlock";

/**
 * React-Native component renderer along with it's description
 */
export const UIDocRenderer = ({
  title,
  description,
  children,
  componentName,
  fileName,
}: {
  title?: string;
  description?: React.ReactNode | string;
  children?: React.ReactNode;
  componentName: string;
  fileName: string;
}) => {
  const [shouldShowCode, setShouldShowCode] = useState(true);
  return (
    <>
      <h3>{title}</h3>
      {typeof description === "string" ? <p>{description}</p> : description}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          padding: 16,
          marginTop: 16,
          marginBottom: 16,
          paddingBottom: 32,
          borderRadius: 8,
          border: "1px solid gray",
          position: "relative",
        }}
      >
        {children}
        <button
          type="button"
          onClick={() => setShouldShowCode((prev) => !prev)}
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
          }}
        >
          {"<> "}Show Code
        </button>
      </div>
      {shouldShowCode && (
        <CodeBlock language="tsx">
          {getComponentCode(
            require(`!!raw-loader!./${fileName}`).default,
            componentName
          )}
        </CodeBlock>
      )}
    </>
  );
};

const getComponentCode = (codeblock: string, componentName: string) => {
  const code = codeblock
    .split("const ")
    .find((value) => value.startsWith(componentName));
  const regex = /return\s?\(([^)]+)\);/s;
  const finalCode = code.match(regex);

  return finalCode?.[1].trimEnd().replace("\n", "");
};
