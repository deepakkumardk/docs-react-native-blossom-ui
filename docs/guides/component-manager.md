---
sidebar_position: 7
---

# Component Manager

Component Manager is the most powerful tool of this library and by using this you can customize all the component's default behavior and seed any default values, so that it suits your mobile app UI.

Here's a simple code snippet of it.

```ts
ComponentManager.setDefaultProps({
  // Simple usage without any prop
  Switch: () => ({
    size: "medium",
    status: "accent",
  }),

  // Usage with props & theme
  Avatar: (props: AvatarProps, theme) => {
    if (props.size === "small") {
      return {
        style: {
          backgroundColor: theme.colors.success900,
        },
      };
    }

    return {
      size: "medium",
      status: "primary",
      mode: "round",
    };
  },
});
```

Using this you can override all the Component and it's props also based on the given props conditions. This is just an example but using this you can override about anything and everything of each component.
