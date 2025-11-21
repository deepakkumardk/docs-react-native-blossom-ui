import { useEffect } from "react";
import {
  Select,
  View,
  TextInput,
  Checkbox,
  Text,
  SegmentedButton,
  Spacer,
} from "@react-native-blossom-ui/components";
import { PropsFields } from "@site/src/components/showcase/types";
import { default as JsonSchema } from "../../../output/props-schema.json";
import { Circle } from "@uiw/react-color";

export const PropsRenderer = ({
  propMetadata = [],
  onPropChange,
}: PropsRendererProps) => {
  useEffect(() => {
    propMetadata.forEach((prop) => {
      if (prop.defaultValue !== undefined) {
        onPropChange(
          prop.name,
          parseDefaultValue(prop.defaultValue, prop.dataType)
        );
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={{ gap: 8 }}>
      {propMetadata.map((prop) => {
        if (prop.hidden) return null;

        let field = null;
        // Adding 1 as threshold to mark bad data like DimensionValue having single value
        if (
          prop.dataTypeValues?.length > 1 &&
          prop.dataTypeValues?.length < 4
        ) {
          field = renderSegmentButtonField(
            prop,
            onPropChange,
            prop.dataTypeValues
          );
        } else if (prop.dataTypeValues?.length > 1) {
          field = renderSelectField(prop, onPropChange, prop.dataTypeValues);
        } else if (prop.dataType === "BlossomStatus") {
          field = renderSelectField(
            prop,
            onPropChange,
            JsonSchema["BlossomStatus"]?.dataTypeValues || []
          );
        } else if (prop.dataType === "string") {
          field = renderTextInputField(prop, onPropChange);
        } else if (
          prop.dataType === "number" ||
          prop.dataType === "DimensionValue"
        ) {
          field = renderNumberInputField(prop, onPropChange);
        } else if (prop.dataType === "boolean") {
          field = renderBooleanField(prop, onPropChange);
        } else if (prop.dataType === "ColorValue") {
          field = renderColorField(prop, onPropChange);
        }
        return field ? <View key={prop.name}>{field}</View> : null;
      })}
    </View>
  );
};

interface PropsRendererProps {
  propMetadata: PropsFields[];
  onPropChange: (propName: string, value: any) => void;
}

function getComponentLabel(propName: string) {
  const formattedPropName = propName.replace(/([A-Z])/g, " $1");
  return formattedPropName.charAt(0).toUpperCase() + formattedPropName.slice(1);
}

function renderSelectField(
  prop: PropsFields,
  onPropChange: (propName: string, value: any) => void,
  options: string[]
) {
  return (
    <Select
      label={getComponentLabel(prop.name)}
      placeholder={`Select ${getComponentLabel(prop.name)}`}
      options={options.map((value) => ({ label: value, value }))}
      defaultValue={prop.defaultValue || ""}
      onValueChange={(value) => onPropChange(prop.name, value)}
    />
  );
}

function renderSegmentButtonField(
  prop: PropsFields,
  onPropChange: (propName: string, value: any) => void,
  options: string[]
) {
  return (
    <>
      <Text typography="l2">{getComponentLabel(prop.name)}</Text>
      <Spacer />
      <SegmentedButton
        data={options.map((value) => ({
          title: value,
          label: value,
          value,
          withCheckIcon: false,
        }))}
        status="info"
        defaultValue={prop.defaultValue || ""}
        onPress={(value) => onPropChange(prop.name, value)}
      />
    </>
  );
}

function renderTextInputField(
  prop: PropsFields,
  onPropChange: (propName: string, value: any) => void
) {
  return (
    <TextInput
      label={getComponentLabel(prop.name)}
      placeholder={getComponentLabel(prop.name)}
      defaultValue={prop.defaultValue || ""}
      onChangeText={(text) => onPropChange(prop.name, text)}
    />
  );
}

function renderNumberInputField(
  prop: PropsFields,
  onPropChange: (propName: string, value: any) => void
) {
  return (
    <TextInput
      label={getComponentLabel(prop.name)}
      placeholder={getComponentLabel(prop.name)}
      keyboardType="numeric"
      defaultValue={prop.defaultValue || ""}
      onChangeText={(text) => onPropChange(prop.name, Number(text))}
    />
  );
}

function renderBooleanField(
  prop: PropsFields,
  onPropChange: (propName: string, value: any) => void
) {
  return (
    <Checkbox
      status="primary"
      label={getComponentLabel(prop.name)}
      defaultValue={!!prop.defaultValue}
      onValueChange={(value) => onPropChange(prop.name, !!value)}
    />
  );
}

function renderColorField(
  prop: PropsFields,
  onPropChange: (propName: string, value: any) => void
) {
  return (
    <>
      <Text typography="l2">{getComponentLabel(prop.name)}</Text>
      <Spacer />
      <Circle
        colors={[
          "#F44336",
          "#E91E63",
          "#9C27B0",
          "#673AB7",
          "#3F51B5",
          "#2196F3",
          "#03A9F4",
          "#00BCD4",
          "#009688",
          "#4CAF50",
          "#8BC34A",
          "#CDDC39",
          "#FFEB3B",
          "#FFC107",
          "#FF9800",
          "#000000",
        ]}
        onChange={(color) => onPropChange(prop.name, color.hex)}
      />
    </>
  );
}

const parseDefaultValue = (defaultValue: any, dataType: string) => {
  if (dataType === "number") {
    return Number(defaultValue);
  } else if (dataType === "DimensionValue") {
    return typeof defaultValue === "string" && defaultValue?.includes("%")
      ? defaultValue?.toString()
      : Number(defaultValue);
  } else if (dataType === "boolean") {
    return defaultValue === "true" || defaultValue === true;
  }

  return defaultValue;
};
