// @ts-check

import eslint from '@eslint/js';
import compat from 'eslint-plugin-compat';
import storybook from 'eslint-plugin-storybook';
import reactPlugin from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    compat.configs['flat/recommended'],
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat['jsx-runtime'],
    storybook.configs['flat/recommended']
);
