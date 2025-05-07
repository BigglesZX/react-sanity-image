import { createClient } from '@sanity/client';
import type { Meta, StoryObj } from '@storybook/react';

import type { SanityAsset, SanityImageObject } from '../../types';

import Img from './index';

const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    apiVersion: '2022-03-14',
    useCdn: true,
});

const query = '*[_type == "sanity.imageAsset" && _id == $assetId][0]';
const params = { assetId: process.env.SANITY_ASSET_ID };

const meta: Meta<typeof Img> = {
    title: 'Img',
    component: Img,
};

export default meta;

type Story = StoryObj<typeof Img>;

export const Default: Story = {
    loaders: [
        async () => ({
            image: {
                asset: (await client.fetch(query, params)) as Promise<SanityAsset>,
            },
        }),
    ],
    render: (args, { loaded: { image } }) => (
        <Img {...args} client={client} image={image as SanityImageObject} />
    ),
};

export const WithCropping: Story = {
    ...Default,
    loaders: [
        async () => ({
            image: {
                asset: (await client.fetch(query, params)) as Promise<SanityAsset>,
                crop: {
                    _type: 'sanity.imageCrop',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    top: 0.5,
                },
            },
        }),
    ],
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
