# Blossom UI Documentation Website

This project is the documentation site for Blossom UI, built with [Docusaurus](https://docusaurus.io/). It provides interactive docs, usage guides, and API references for the React Native Blossom UI component library.

## Features

- Interactive component showcases
- Prop tables with auto-generated types
- Guides for theming and customization

## Getting Started

### Installation

Install dependencies:

```bash
yarn
```

### Local Development

Start the local dev server:

```bash
yarn start
```

This will open the docs in your browser. Most changes are reflected live without restarting.

### Build

Generate static site files:

```bash
yarn build
```

Output will be in the `build` directory.

### Deployment

This is currently host at [vercel](https://docs-react-native-blossom-ui.vercel.app/) and deployment is auto triggered automatically whenever a commit is pushed/merged to main branch.

## Documentation Structure

- `docs/` — Main documentation pages (components, guides, design system)
- `blog/` — Blog posts and changelog
- `src/` — Source code for custom docs components
- `static/` — Static assets (images, icons)

## Contributing

Pull requests and issues are welcome! Please follow the code style and add documentation for new components or features.

## Links

- [Blossom UI GitHub](https://github.com/deepakkumardk/react-native-blossom-ui)
- [Docusaurus Documentation](https://docusaurus.io/docs)

---

For more details, see the docs in the `docs/` folder or open an issue for help.
