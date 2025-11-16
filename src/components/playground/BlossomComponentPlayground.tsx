import React, { useMemo, useState } from "react";

import * as BlossomUIDates from "@react-native-blossom-ui/dates";

import { default as JsonSchema } from "../../../output/props-schema.json";
import { default as MetaDataJsonSchema } from "../../../output/props-metadata.json";
import { BlossomComponentRenderer } from "./BlossomComponentRenderer";

import styles from "./BlossomComponentPlayground.module.css";
import { PlaygroundCodeRenderer } from "./PlaygroundCodeRenderer";
import { PropsRenderer } from "./PropsRenderer";

/**
 * Component Playground allows users to interactively modify component props and see the changes reflected in real-time.
 *
 * @param props - The properties for the Component Playground.
 * @param props.componentName - The name of the Blossom UI component to render in the playground.
 * @returns The Component Playground with interactive prop controls and live preview.
 */
export const BlossomComponentPlayground = (props: {
  componentName: string;
}) => {
  const { componentName } = props;

  const getComponentMetaData = useMemo(() => {
    const propName = `${componentName}Props`;
    const parents = JsonSchema[propName]?.parents;
    const parentsMetaData = parents?.flatMap((parent) => {
      return JsonSchema[parent]?.properties || [];
    });
    const schemaProps = JsonSchema[propName]?.properties ?? [];
    const metadataProps = MetaDataJsonSchema[propName]?.properties ?? [];
    const inheritedProps = parentsMetaData ?? [];

    const uniqueByName = (items: any[]) => {
      const seen = new Set<string>();
      return items.filter((item) => {
        const name = item?.name;
        if (!name) return true; // keep items without a name
        if (seen.has(name)) return false;
        seen.add(name);
        return true;
      });
    };

    const mergedProps = [...schemaProps, ...metadataProps, ...inheritedProps];

    return uniqueByName(mergedProps);
  }, [componentName]);

  const [componentProps, setComponentProps] = useState<{ [key: string]: any }>(
    {}
  );

  const handlePropChange = (propName: string, value: any) => {
    setComponentProps((prevProps) => ({
      ...prevProps,
      [propName]: value,
    }));
  };

  return (
    <div className={styles.componentPlaygroundOuter}>
      <div className={styles.componentPlaygroundGrid}>
        <BlossomComponentRenderer
          componentName={componentName}
          {...componentProps}
        />

        <PropsRenderer
          propMetadata={getComponentMetaData}
          onPropChange={handlePropChange}
        />
      </div>
      <PlaygroundCodeRenderer
        componentName={componentName}
        componentProps={componentProps}
        packageName={BlossomUIDates[componentName] ? "dates" : "components"}
      />
    </div>
  );
};
