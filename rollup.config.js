import autoprefixer from 'autoprefixer';
import path from 'path';
import csso from 'postcss-csso';
import atImport from 'postcss-import';
import commonjs from 'rollup-plugin-commonjs';
import del from 'rollup-plugin-delete';
import resolve from 'rollup-plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import progress from 'rollup-plugin-progress';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';

export default [
  {
    input: 'src/index.tsx',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'esm',
        exports: 'named',
        sourcemap: true,
      },
    ],
    plugins: [
      del({ targets: 'build/*' }),
      postcss({
        extract: true,
        // Or with custom file name
        extract: path.resolve('build/style.css'),
        modules: false,
        autoModules: true,
        plugins: [atImport(), autoprefixer(), csso()],
      }),
      external(),
      resolve(),
      typescript({
        exclude: ['**/__tests__/**', '__Template'],
        clean: true,
        typescript: require('ttypescript'),
        tsconfigDefaults: {
          compilerOptions: {
            plugins: [
              { transform: 'typescript-transform-paths' },
              { transform: 'typescript-transform-paths', afterDeclarations: true },
            ],
          },
        },
      }),
      commonjs({
        include: ['node_modules/**'],
        namedExports: {
          'node_modules/react/react.js': ['Children', 'Component', 'PropTypes', 'createElement'],
          'node_modules/react-dom/index.js': ['render'],
          'node_modules/recharts/node_modules/react-is/index.js': ['isFragment'],
          'node_modules/react-date-range/dist/index.js': ['Calendar', 'DateRangePicker'],
        },
      }),
      terser({
        mangle: {
          eval: true,
          toplevel: true,
        },
        output: {
          comments: 'some',
        },
      }),
      progress(),
    ],
  },
];
