---
sidebar_position: 1
---

# Theme

Blossom UI supports dark theme out of the box and also re-renders the component based on that.

Wrap your root component into `BlossomThemeProvider` in your App.ts file.
Generate your desired Theme from **[Theme Generator](/docs/design-system/theme-generator)** and create json file for your project.

```tsx
import React, {useState} from 'react'
import {
  BlossomThemeProvider,
} from '@react-native-blossom-ui/components'
import {MyNavigationStack} 'src/navigation'
import {lightTheme, darkTheme, options} from 'src/themes'

export default function App() {
  const [isDark, setIsDark] = useState(false)

  return (
    <BlossomThemeProvider
      theme={isDark ? darkTheme : lightTheme}
      isDark={isDark}
      options={options}
      >
        <MyNavigationStack />
    </BlossomThemeProvider>
  )
}
```

And that was all you have to do to get started along with Light/Dark Theme support out of the box.

## Customization

Blossom UI also provides a way to customize typography and border radius.
The border radius will be applied across components like `Button`, `TextInput`, `SearchInput` etc.

Defining your options in a json file, here's the default values for `options`

```json
{
   "borderRadius":12,
   "typography":{
      "h1":{
         "fontSize":36,
         "fontWeight":"700"
      },
      "h2":{
         "fontSize":32,
         "fontWeight":"700"
      },
      "h3":{
         "fontSize":28,
         "fontWeight":"700"
      },
      "h4":{
         "fontSize":24,
         "fontWeight":"600"
      },
      "h5":{
         "fontSize":20,
         "fontWeight":"600"
      },
      "h6":{
         "fontSize":18,
         "fontWeight":"600"
      },
      "s1":{
         "fontSize":17,
         "fontWeight":"600"
      },
      "s2":{
         "fontSize":17,
         "fontWeight":"400"
      },
      "b1":{
         "fontSize":16,
         "fontWeight":"600"
      },
      "b2":{
         "fontSize":16,
         "fontWeight":"400"
      },
      "b3":{
         "fontSize":15,
         "fontWeight":"400"
      },
      "l1":{
         "fontSize":14,
         "fontWeight":"600"
      },
      "l2":{
         "fontSize":14,
         "fontWeight":"400"
      },
      "c1":{
         "fontSize":13,
         "fontWeight":"400"
      },
      "c2":{
         "fontSize":12,
         "fontWeight":"400"
      }
   }
```

## Using Theme Hook

You can also use the blossom theme hook inside any of the components.

```ts
import { useBlossomTheme } from "@react-native-blossom-ui/components";

const { colors, isDark, options } = useBlossomTheme();
```

- <b>colors</b>: Using this you can access all the colors passed to the `BlossomThemeProvider` theme prop
- <b>isDark</b>: if the dark mode is enabled or not
- <b>options</b>: extra options that is passed to the `BlossomThemeProvider` options prop, if you wanna access it
