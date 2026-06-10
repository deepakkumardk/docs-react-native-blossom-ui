import React, { useMemo, useRef, useState } from "react";

import * as BlossomUIDates from "@react-native-blossom-ui/dates";
import * as BlossomUIOverlays from "@react-native-blossom-ui/overlays";

import { default as MetaDataJsonSchema } from "../../../output/props-default-metadata.json";
import { BlossomComponentRenderer } from "./BlossomComponentRenderer";

import styles from "./BlossomComponentPlayground.module.css";
import { PlaygroundCodeRenderer } from "./PlaygroundCodeRenderer";
import { PropsRenderer } from "./PropsRenderer";
import deepmerge from "deepmerge";
import { PropsFields } from "@site/src/components/showcase/types";
import { Button } from "@react-native-blossom-ui/components";
import { findPropSchema, getComponentPropsSchema } from "../common/helper";

/**
 * Component Playground allows users to interactively modify component props and see the changes reflected in real-time.
 *
 * @param props - The properties for the Component Playground.
 * @param props.componentName - The name of the Blossom UI component to render in the playground.
 * @returns The Component Playground with interactive prop controls and live preview.
 */
export const BlossomComponentPlayground = (props: {
  componentName: string;
  propNameTS?: string;
  onShowCallback?: (props: any) => void;
  packageName?: "components" | "dates" | "overlays";
  deferred?: boolean;
}) => {
  const {
    componentName,
    propNameTS,
    onShowCallback,
    packageName = "components",
    deferred,
  } = props;

  const getComponentMetaData = useMemo(() => {
    const propName = propNameTS || `${componentName}Props`;

    const data = getComponentPropsSchema({
      componentName: componentName ?? "",
      tsPropName: propNameTS,
      packageName,
    });

    const parents = data.parents;
    const parentsMetaData = parents?.flatMap((parent) => {
      const parentData = findPropSchema({
        tsPropName: parent,
      });
      return parentData?.properties || [];
    });
    const schemaProps: PropsFields[] = data.properties ?? [];
    const metadataProps: PropsFields[] =
      (MetaDataJsonSchema as any)[propName]?.properties ?? [];

    const inheritedProps: PropsFields[] = parentsMetaData ?? [];

    const uniqueByName = (items: PropsFields[]) => {
      const uniqueItems: { [name: string]: PropsFields } = {};

      items.forEach((item) => {
        const name = item?.name;
        if (name && !uniqueItems[name]) {
          uniqueItems[name] = item;
        } else {
          // If duplicate, deep merge the properties
          const prevUniqueItem: PropsFields = JSON.parse(
            JSON.stringify(uniqueItems[name]),
          );

          uniqueItems[name] = deepmerge(uniqueItems[name], item, {
            arrayMerge: combineMerge,
          });
          // force override defaultValue if any of the items has forceOverride set to true
          if (item.forceOverride) {
            uniqueItems[name].defaultValue = item.defaultValue;
          } else if (prevUniqueItem.forceOverride) {
            uniqueItems[name].defaultValue = prevUniqueItem.defaultValue;
          }
        }
      });
      return Object.values(uniqueItems);
    };

    const mergedProps = [...schemaProps, ...metadataProps, ...inheritedProps];

    return uniqueByName(mergedProps);
  }, [componentName]);

  const [componentProps, setComponentProps] = useState<{ [key: string]: any }>(
    {},
  );
  const componentPropsRef = useRef(componentProps);

  const handlePropChange = (propName: string, value: any) => {
    if (deferred) {
      componentPropsRef.current = {
        ...componentPropsRef.current,
        [propName]: value,
      };
      return;
    }

    setComponentProps((prevProps) => ({
      ...prevProps,
      [propName]: value,
    }));
  };

  return (
    <div className={styles.componentPlaygroundOuter}>
      <div className={styles.componentPlaygroundGrid}>
        <div>
          <BlossomComponentRenderer
            componentName={componentName}
            packageName={packageName}
            {...componentProps}
          />

          {deferred || onShowCallback ? (
            <Button
              onPress={() => {
                onShowCallback?.(componentProps);
                deferred && setComponentProps(componentPropsRef.current);
              }}
            >
              Show Component
            </Button>
          ) : null}
        </div>

        <PropsRenderer
          propMetadata={getComponentMetaData}
          onPropChange={handlePropChange}
        />
      </div>
      <PlaygroundCodeRenderer
        componentName={componentName}
        componentProps={componentProps}
        packageName={packageName}
      />
    </div>
  );
};

// from deepmerge docs
const combineMerge = (target: any, source: any, options: any) => {
  const destination = target.slice();

  source.forEach((item: any, index: number) => {
    if (typeof destination[index] === "undefined") {
      destination[index] = options.cloneUnlessOtherwiseSpecified(item, options);
    } else if (options.isMergeableObject(item)) {
      destination[index] = deepmerge(target[index], item, options);
    } else if (target.indexOf(item) === -1) {
      destination.push(item);
    }
  });
  return destination;
};
