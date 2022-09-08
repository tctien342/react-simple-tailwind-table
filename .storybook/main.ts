const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: '@storybook/builder-vite', // 👈 The builder enabled here.
  },
  staticDirs: ['../public'],
  async viteFinal(config, options) {
    // Add your configuration here
    return {
      ...config,
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
          '@utils': path.resolve(__dirname, '../src/utils'),
          '@config': path.resolve(__dirname, './src/config'),
          '@type': path.resolve(__dirname, '../src/global.types.ts'),
          '@components': path.resolve(__dirname, '../src/components'),
          '@constants': path.resolve(__dirname, '../src/constants'),
          '@styles': path.resolve(__dirname, '../src/styles'),
          '@hooks': path.resolve(__dirname, '../src/hooks'),
          '@assets': path.resolve(__dirname, '../src/assets'),
        },
      },
    };
  },
};
