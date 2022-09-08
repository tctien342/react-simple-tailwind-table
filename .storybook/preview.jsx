import '../src/styles/index.scss';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: { expanded: true },
};

function ThemeWrapper(props) {
  return props.children;
}

export const decorators = [(renderStory) => <ThemeWrapper>{renderStory()}</ThemeWrapper>];
