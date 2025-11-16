import { useEffect } from "react";
import {
  Select,
  Text,
  View,
  TextInput,
} from "@react-native-blossom-ui/components";
import { PropsFields } from "@site/src/components/showcase/types";
import { default as JsonSchema } from "../../../output/props-schema.json";

export const PropsRenderer = (props: {
  propMetadata: PropsFields[];
  onPropChange: (propName: string, value: any) => void;
}) => {
  const { propMetadata = [], onPropChange } = props;

  useEffect(() => {
    propMetadata.forEach((prop) => {
      if (prop.defaultValue) {
        onPropChange(prop.name, prop.defaultValue);
      }
    });
  }, []);

  const getComponentLabel = (propName: string) => {
    const formattedPropName = propName.replace(/([A-Z])/g, " $1");
    const displayPropName =
      formattedPropName.charAt(0).toUpperCase() + formattedPropName.slice(1);
    return displayPropName;
  };

  return (
    <View>
      {propMetadata.map((prop) => (
        <View key={prop.name}>
          {prop.dataTypeValues?.length && (
            <Select
              label={getComponentLabel(prop.name)}
              placeholder={`Select ${getComponentLabel(prop.name)}`}
              options={prop.dataTypeValues.map((value) => ({
                label: value,
                value,
              }))}
              defaultValue={prop.defaultValue || ""}
              onValueChange={(value) => onPropChange(prop.name, value)}
            />
          )}
          {prop.dataType === "BlossomStatus" && (
            <Select
              label={getComponentLabel(prop.name)}
              placeholder={`Select ${getComponentLabel(prop.name)}`}
              options={JsonSchema["BlossomStatus"]?.dataTypeValues.map(
                (value) => ({
                  label: value,
                  value,
                })
              )}
              defaultValue={prop.defaultValue || ""}
              onValueChange={(value) => onPropChange(prop.name, value)}
            />
          )}
          {prop.dataType === "string" && (
            <TextInput
              label={getComponentLabel(prop.name)}
              placeholder={getComponentLabel(prop.name)}
              defaultValue={prop.defaultValue || ""}
              onChangeText={(text) => onPropChange(prop.name, text)}
            />
          )}
        </View>
      ))}
    </View>
  );
};
