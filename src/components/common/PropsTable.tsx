import React from "react";
import { useBlossomTheme } from "@react-native-blossom-ui/components";

import { default as JsonSchema } from "../../../output/props-schema.json";
import { PropsFields, PropsTableProps } from "../showcase/types";

export const PropsTable = ({ componentName }: PropsTableProps) => {
  const theme = useBlossomTheme();

  const data = JsonSchema?.[`${componentName}Props`] || {};
  const properties: PropsFields[] = data.properties || [];

  const getParent = () => {
    return data.parent?.filter((value) => !data[value])?.[0];
  };

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
          <td style={{ fontStyle: "italic" }}>{getParent()}</td>
          <td style={{ fontStyle: "italic" }}>--</td>
          <td style={{ fontStyle: "italic" }}>
            Inherits properties from {getParent()}
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
