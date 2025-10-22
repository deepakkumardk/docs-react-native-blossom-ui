import React from "react";
import { useBlossomTheme } from "@react-native-blossom-ui/components";

import Link from "@docusaurus/Link";

import { default as JsonSchema } from "../../../output/props-schema.json";
import { PropsInfo, PropsTableProps } from "../showcase/types";
import { getLinkedPropPath } from "./helper";

export const PropsTable = ({ componentName, propName }: PropsTableProps) => {
  const theme = useBlossomTheme();

  const data: PropsInfo =
    JsonSchema?.[propName || `${componentName}Props`] || {};
  const properties = data.properties || [];

  return (
    <table>
      <thead>
        <tr>
          <th>Prop</th>
          <th>Data Type</th>
          <th>Default Value</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ backgroundColor: theme.colors.primary400 }}>
          <td style={{ fontStyle: "italic" }}>Extends</td>
          <td style={{ fontStyle: "italic" }} title={data.parents?.join(", ")}>
            {getLinkedPropPath(data.parentsDisplay?.[0]) ? (
              <Link to={getLinkedPropPath(data.parentsDisplay?.[0])}>
                {data.parentsDisplay?.[0]}
              </Link>
            ) : (
              data.parentsDisplay?.[0] || "--"
            )}
          </td>
          <td style={{ fontStyle: "italic" }}>--</td>
          <td style={{ fontStyle: "italic" }}>
            {data.parentsDisplay?.[0]
              ? `Inherits properties from ${data.parentsDisplay?.[0]}`
              : "--"}
          </td>
        </tr>
        {properties.map((item) => (
          <tr key={item.name}>
            <td>{item.name || "--"}</td>
            <td>{item.dataType || "--"}</td>
            <td>{item.defaultValue || "--"}</td>
            <td>{item.description || item.comment || "--"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
