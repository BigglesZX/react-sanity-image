import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

import pkg from './package.json' with { type: 'json' };


const config = {
    input: 'src/index.ts',
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
        typescript(),
        nodeResolve(),
    ],
    external: [
        'prop-types',
        '@sanity/client',
        '@sanity/image-url',
        'react/jsx-runtime',
    ],
};

export default config;
