import * as BlossomUIComponents from "@react-native-blossom-ui/components";
import * as BlossomUIDates from "@react-native-blossom-ui/dates";
import * as BlossomUIOverlays from "@react-native-blossom-ui/overlays";

/**
 * A renderer for Blossom UI components, that dynamically renders components based on the provided component name & props.
 *
 * @param props - The properties for the component renderer.
 * @param props.componentName - The name of the Blossom UI component to render.
 * @returns The rendered Blossom UI component or null if not found.
 */
export const BlossomComponentRenderer = (props: {
  componentName: string;
  packageName?: "components" | "dates" | "overlays";
}) => {
  const { componentName, packageName = "components", ...rest } = props;

  const Component =
    (packageName === "components"
      ? (BlossomUIComponents as any)[componentName]
      : null) ||
    (packageName === "dates" ? (BlossomUIDates as any)[componentName] : null) ||
    (packageName === "overlays"
      ? (BlossomUIOverlays as any)[componentName]
      : null) ||
    null;

  // Check if Component is a valid React component (function, class, or forwardRef)
  const isValidComponent =
    Component &&
    (typeof Component === "function" ||
      (typeof Component === "object" && Component.$$typeof));

  return isValidComponent ? <Component {...rest} /> : null;
};
