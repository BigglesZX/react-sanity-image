import sanityClient from '@sanity/client';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import type { SanityAsset, SanityImageObject } from '../../types';

import Picture from './index';


const client = sanityClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    apiVersion: '2022-03-14',
    useCdn: true,
});

const query = '*[_type == "sanity.imageAsset" && _id == $assetId][0]';
const params = { assetId: process.env.SANITY_ASSET_ID };

export default {
    title: 'Picture',
    component: Picture,
    args: {
        builderOptions: {
            blur: undefined,
            sharpen: undefined,
            format: undefined,
            invert: undefined,
            orientation: undefined,
            quality: undefined,
            fit: undefined,
            crop: undefined,
            saturation: undefined,
            auto: undefined,
        },
        media:[{
            media: '(min-width: 1024px)',
            aspectRatio: 9/16,
        }]
    }
} as ComponentMeta<typeof Picture>;

const Template: ComponentStory<typeof Picture> = (args, { loaded: { image } }) => {
    return <Picture {...args} client={client} image={(image as SanityImageObject)} />
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
