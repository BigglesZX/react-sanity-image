import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
    stories: ['../src/components/**/stories.tsx'],
    addons: [
        '@storybook/addon-webpack5-compiler-swc',
        {
            name: '@storybook/addon-essentials',
            options: {
                docs: false,
            },
        },
        '@storybook/addon-interactions',
    ],
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    env: (config) => ({
        ...config,
        SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID || '',
        SANITY_DATASET: process.env.SANITY_DATASET || '',
        SANITY_ASSET_ID: process.env.SANITY_ASSET_ID || '',
    }),
};
export default config;
