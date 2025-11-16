import * as BlossomUIComponents from "@react-native-blossom-ui/components";
import * as BlossomUIDates from "@react-native-blossom-ui/components";

/**
 * A renderer for Blossom UI components, that dynamically renders components based on the provided component name & props.
 *
 * @param props - The properties for the component renderer.
 * @param props.componentName - The name of the Blossom UI component to render.
 * @returns The rendered Blossom UI component or null if not found.
 */
export const BlossomComponentRenderer = (props: { componentName: string }) => {
  const { componentName, ...rest } = props;

  const Component =
    BlossomUIComponents[componentName] || BlossomUIDates[componentName] || null;

  return Component ? <Component {...rest} /> : null;
};
