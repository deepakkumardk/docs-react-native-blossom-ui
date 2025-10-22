import React, { useState } from "react";

import CodeBlock from "@theme/CodeBlock";
import { getComponentCode } from "./helper";

/**
 * React-Native component renderer along with it's description
 */
export const BlossomUIRenderer = ({
  title,
  description,
  children,
  componentName,
  fileName,
  withFlex = true,
  withCodeblock = true,
}: {
  title?: string;
  description?: React.ReactNode | string;
  children?: React.ReactNode;
  componentName: string;
  fileName: string;
  withFlex?: boolean;
  withCodeblock?: boolean;
}) => {
  const [shouldShowCode, setShouldShowCode] = useState(true);

  return (
    <>
      <h3>{title}</h3>
      {typeof description === "string" ? <p>{description}</p> : description}
      <div
        style={{
          ...(withFlex && { display: "flow" }),
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          flex: 1,
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
        {withCodeblock && (
          <button
            type="button"
            onClick={() => setShouldShowCode((prev) => !prev)}
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
            }}
          >
            {shouldShowCode ? "</>" : "<>"} {shouldShowCode ? "Hide" : "Show"}
            {" Code"}
          </button>
        )}
      </div>
      {withCodeblock && shouldShowCode && (
        <CodeBlock language="tsx">
          {getComponentCode(
            require(`!!raw-loader!@react-native-blossom-ui/showcase/src/${fileName}Showcase`)
              .default,
            componentName
          )}
        </CodeBlock>
      )}
    </>
  );
};
