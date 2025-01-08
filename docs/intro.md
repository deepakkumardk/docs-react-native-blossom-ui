---
sidebar_position: 1
---

# Getting Started

Start with installing the components library.

```bash npm2yarn
npm install @react-native-blossom-ui/components
```

Now wrap your Root Component (Navigation Container) into the `BlossomThemeProvider` in your App.ts file

```ts
import React, { useState } from "react";
import { BlossomThemeProvider } from "@react-native-blossom-ui/components";

import lightTheme from "../lightTheme.json";
import darkTheme from "../darkTheme.json";
import options from "../options.json";
import { MyAppContainer } from "src/navigation";

export default function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <BlossomThemeProvider
      theme={isDark ? darkTheme : lightTheme}
      isDark={isDark}
      options={options}
    >
      <MyAppContainer />
    </BlossomThemeProvider>
  );
}
```
