/**
 * Props for the PropsTable component.
 */
export type PropsTableProps = {
  /**
   * The name of the component whose props are being displayed.
   */
  componentName?: string;
  /**
   * The specific prop name to highlight or display.
   */
  propName?: string;
};

/**
 * Represents a single prop's metadata.
 */
export type PropsFields = {
  /**
   * The name of the prop.
   */
  name: string;
  /**
   * The data type of the prop (e.g., string, number, function).
   * will be fetched from the datatype of the ts type definition
   */
  dataType: string;
  /**
   * Possible values for the prop if it's a union type.
   * will be fetched if the datatype is a union type
   */
  dataTypeValues?: string[];
  /**
   * The default value of the prop, if any.
   * will be fetched from the @default tag in the doc comment
   */
  defaultValue?: string;
  /**
   * force override the value while merging the meta data props
   */
  forceOverride?: boolean;
  /**
   * Hides the prop from props renderer if set to true.
   */
  hidden?: boolean;
  /**
   * A description of the prop's purpose.
   * will be fetched from the @description tag in the js doc
   */
  description?: string;
  /**
   * Any additional comments about the prop.
   * will be fetched from the main doc comment if available
   */
  comment?: string;
};

/**
 * Information about a component's props and its inheritance.
 */
export type PropsInfo = {
  /**
   * Array of prop field definitions for the component.
   */
  properties?: PropsFields[];
  /**
   * Names of parent components/types (if any).
   */
  parents?: string[];
  /**
   * Display names for parent components/types.
   */
  parentsDisplay?: string[];
};

/**
 * JSON schema mapping component/type names to their prop info.
 */
export type JsonSchemaType = {
  /**
   * The component/type name as key, with its PropsInfo as value.
   */
  [key: string]: PropsInfo;
};
