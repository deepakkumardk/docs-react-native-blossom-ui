---
sidebar_position: 3
---

# Colors

All Colors comes in with a color shade from **100** to **900** (lighter to darker shade). and there transparent shade from **100** too **500** (from opacity of 10% to 50%)
color500 is the default seed color from which the shade is gets generated.

| Color Variant | Usage                                                                     |
| ------------- | ------------------------------------------------------------------------- |
| primary       | Used to identify the brand, uses - Button background, header color etc.   |
| accent        | Used to identify some form components, uses - Switch, Checkbox by default |
| success       | Used to represent any success event                                       |
| info          | Used to represent any information event                                   |
| warn          | Used to represent any warning event                                       |
| error         | Used to represent any error event                                         |
| background    | Used for surface layouts like View                                        |
| text          | Used in the typography for texts                                          |

There are 2 more variant that comes in `bgLight` and `bgDark`

- **bgLight** - Lighter shade from `white` to `gray`
- **bgDark** - Darker shade from `gray` to `black`

## Primary Color

Primary color is the main brand color that is being applied to the multiple components.

## Accent Color

Accent color is the secondary color to use in the few components like form boolean fields components. This is the secondary color and meant to be used lesser than the main primary color.

## System/Semantic Colors

Success, info, warn & error these colors are get triggered for any user action event shows about their corresponding state as it's name suggest.

## Background Color

View surface color is get picked from the shade i.e. `background100`. While also disabled state colors is also get picked from this shade.
By default it's shade is just get inverted for dark theme, you can change it's shade from the Theme Generator.

## Text Color

Text colors is get picked from the shade i.e. `background100`. While also disabled/label/captions text colors is also get picked from this shade.
By default it's shade is just get inverted for dark theme, you can change it's shade from the Theme Generator.
