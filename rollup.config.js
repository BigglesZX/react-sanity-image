import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';

import pkg from './package.json';


const config = {
    input: 'src/index.js',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
        },
        {
            file: pkg.module,
            format: 'es',
        },
    ],
    plugins: [
        babel({
            exclude: 'node_modules/**',
            babelHelpers: 'bundled',
        }),
        nodeResolve(),
    ],
    external: [
        'prop-types',
        '@sanity/client',
        '@sanity/image-url',
    ],
};

export default config;
