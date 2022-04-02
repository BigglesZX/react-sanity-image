const path = require('path');

module.exports = {
    stories: ['../src/components/**/stories.tsx'],
    addons: [
        '@storybook/addon-essentials',
    ],
    framework: '@storybook/react',
};
