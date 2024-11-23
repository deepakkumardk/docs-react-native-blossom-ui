---
sidebar_position: 7
---

# Component Manager

Component Manager is the most powerful tool of this library and by using this you can customize all the component's default behavior and seed any default values, so that it suits your mobile app UI.

Here's a simple code snippet of it.

```ts
ComponentManager.setDefaultProps({
  Switch: {
    size: "small",
    status: "primary",
  },
  Avatar: {
    size: "large",
    status: "primary",
  },
});
```

The above code sets the Switch size to `small` & it's status to `primary` and this will be used across the app until it's being overridden there. same for Avatar.

Similarly, you can override all the Component and it's props.
