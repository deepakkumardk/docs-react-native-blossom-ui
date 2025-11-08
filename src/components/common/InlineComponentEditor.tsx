import React, { useState } from "react";

/**
 * InlineComponentEditor
 * Renders an inline editor for a component, allowing users to edit props dynamically based on metadata.
 *
 * @param {Object} props
 * @param {string} componentName - Name of the component to render.
 * @param {React.ComponentType<any>} Component - The actual React component to render.
 * @param {Array} propsMetadata - Array of prop metadata objects (name, type, defaultValue, description, options).
 */
export const InlineComponentEditor = ({
  componentName,
  Component,
  propsMetadata,
}: {
  componentName: string;
  Component: React.ComponentType<any>;
  propsMetadata: Array<{
    name: string;
    type: string;
    defaultValue?: any;
    description?: string;
    options?: any[]; // For select/radio type props
  }>;
}) => {
  // Initialize state for all props
  const initialState = Object.fromEntries(
    propsMetadata.map((meta) => [meta.name, meta.defaultValue ?? ""])
  );
  const [propsState, setPropsState] = useState(initialState);

  // Handle prop change
  const handleChange = (name: string, value: any) => {
    setPropsState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: 16,
        marginBottom: 24,
      }}
    >
      <h3>Inline Editor: {componentName}</h3>
      <form style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {propsMetadata.map((meta) => (
          <div key={meta.name} style={{ minWidth: 180 }}>
            <label style={{ fontWeight: "bold" }} htmlFor={meta.name}>
              {meta.name}
            </label>
            <br />
            {meta.type === "boolean" ? (
              <input
                type="checkbox"
                id={meta.name}
                checked={!!propsState[meta.name]}
                onChange={(e) => handleChange(meta.name, e.target.checked)}
              />
            ) : meta.options ? (
              <select
                id={meta.name}
                value={propsState[meta.name]}
                onChange={(e) => handleChange(meta.name, e.target.value)}
              >
                {meta.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={meta.type === "number" ? "number" : "text"}
                id={meta.name}
                value={propsState[meta.name]}
                onChange={(e) =>
                  handleChange(
                    meta.name,
                    meta.type === "number"
                      ? Number(e.target.value)
                      : e.target.value
                  )
                }
              />
            )}
            {meta.description && (
              <div style={{ fontSize: "0.9em", color: "#666" }}>
                {meta.description}
              </div>
            )}
          </div>
        ))}
      </form>
      <div style={{ marginTop: 24 }}>
        <Component {...propsState} />
      </div>
    </div>
  );
};
