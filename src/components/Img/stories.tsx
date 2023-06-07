import sanityClient from '@sanity/client';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import type { SanityAsset, SanityImageObject } from '../../types';

import Img from './index';

const client = sanityClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    apiVersion: '2022-03-14',
    useCdn: true,
});

const query = '*[_type == "sanity.imageAsset" && _id == $assetId][0]';
const params = { assetId: process.env.SANITY_ASSET_ID };

export default {
    title: 'Img',
    component: Img,
} as ComponentMeta<typeof Img>;

const Template: ComponentStory<typeof Img> = (args, { loaded: { image }}) => {
    return <Img {...args} client={client} image={image as SanityImageObject} />
};
Template.loaders = [
    async () => ({
        image: {
            asset: (await client.fetch(query, params)) as Promise<SanityAsset>,
        },
    }),
];

export const Default = Template.bind({});
Default.args = {};
Default.loaders = Template.loaders;

export const WithCropping = Template.bind({});
WithCropping.args = {};
WithCropping.loaders = [
    async () => ({
        image: {
            asset: (await client.fetch(query, params)) as Promise<SanityAsset>,
            crop: {
                _type: "sanity.imageCrop",
                bottom: 0,
                left: 0,
                right: 0,
                top: 0.5,
            },
        },
    }),
];

export const WithBuilderOptions = Template.bind({});
WithBuilderOptions.args = {
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
};
WithBuilderOptions.loaders = Template.loaders;
