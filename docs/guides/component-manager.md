---
sidebar_position: 7
---

# Component Manager

Component Manager is the most powerful tool of this library and by using this you can customize all the component's default behavior and seed any default values, so that it suits your mobile app UI.

Here's a simple code snippet of it.

```ts
ComponentManager.setDefaultProps({
  ComponentManager.setDefaultProps({
      Switch: (props: SwitchProps): Partial<SwitchProps> => ({
        size: 'small',
        status: 'primary',
      }),

      Avatar: (props: AvatarProps): Partial<AvatarProps> => {
        if (props.size === 'small') {
          return {
            status: 'success',
          }
        }
        return {
          size: 'large',
          status: 'primary',
        }
      },
    })
});
```

The above code sets the Switch size to `small` & it's status to `primary` and this will be used across the app until it's being overridden there.
While for Avatar we have used the conditional return based on the size of the component.

Similarly, you can override all the Component and it's props. This is just an example but using this you can override about anything and everything of each component.
