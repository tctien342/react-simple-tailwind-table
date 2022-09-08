# DevinUI Template

> For making UI library

### Structure

> Path `roots/src`

```
├── __tests__                   Store test for `hooks` and `utils`
├── assets                      Store lib's assets, mostly SVG
│   └── icons
├── components                  Store all library's components
│   ├── __template              Template for generate new component
│   │   ├── index.module.scss   Style for this component, using css module
│   │   ├── index.stories.tsx   Story for this component
│   │   ├── index.test.tsx      Component's testing
│   │   └── index.tsx           Compontnt's logic
├── constants                   Store all library's constants
├── hooks                       Define library's hooks
├── styles                      Define library's styles
│   ├── consts                  SCSS constants
│   └── mixin                   SCSS Mixin
└── utils                       Lib's utils
```

### Command

- Run `yarn dev` to start working with UI
- Run `yarn build` to generate your library package
- Run `yarn test` to start testing all your test files

#### Create your first component

- Duplicate `__template` folder in `components` and change it's name to match your component name
- Writing component's logic
- Writing component's story
- Writing component's test
- Export your component in `components/index.ts`
- Done

#### Create your first hooks

- Create hook's file in `hooks` folder
- Writing your hook's logic
- Writing hooks's test in `__test__` test folder
- Export your hook in `hooks/index.ts`
- Done

### Technologies

- Typescript
- SCSS
- React
- Jest
- Rollup
- Storybook

### Maintainer

@saintno
