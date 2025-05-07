import { createClient } from '@sanity/client';
import type { Meta, StoryObj } from '@storybook/react';

import type { SanityAsset, SanityImageObject } from '../../types';

import Picture from './index';

const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    apiVersion: '2022-03-14',
    useCdn: true,
});

const query = '*[_type == "sanity.imageAsset" && _id == $assetId][0]';
const params = { assetId: process.env.SANITY_ASSET_ID };

const meta: Meta<typeof Picture> = {
    title: 'Picture',
    component: Picture,
};

export default meta;

type Story = StoryObj<typeof Picture>;

export const Default: Story = {
    loaders: [
        async () => ({
            image: {
                asset: (await client.fetch(query, params)) as Promise<SanityAsset>,
            },
        }),
    ],
    render: (args, { loaded: { image } }) => (
        <Picture {...args} client={client} image={image as SanityImageObject} />
    ),
};

export const WithMedia: Story = {
    ...Default,
    args: {
        media: [
            {
                media: '(min-width: 1024px)',
                aspectRatio: 1 / 1,
            },
        ],
    },
};

export const WithMediaAndSizes: Story = {
    ...Default,
    args: {
        media: [
            {
                media: '(min-width: 1024px)',
                aspectRatio: 1 / 1,
                sizes: '50vw',
            },
        ],
        sizes: '100vw',
    },
};

export const WithBuilderOptions: Story = {
    ...Default,
    args: {
        builderOptions: {
            blur: undefined,
            sharpen: undefined,
            format: undefined,
            invert: true,
            orientation: undefined,
            quality: undefined,
            fit: undefined,
            crop: undefined,
            saturation: undefined,
            auto: undefined,
        },
    },
};
