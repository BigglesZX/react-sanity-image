const path = require('path');

module.exports = {
    stories: ['../src/components/**/stories.js'],
    addons: [
        '@storybook/addon-essentials',
    ],
    framework: '@storybook/react',
};
