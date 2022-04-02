import sanityClient from '@sanity/client';

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
};

const Template = (args, { loaded: { image } }) => {
    return <Img client={client} image={image} {...args} />
};
Template.loaders = [
    async () => ({
        image: {
            asset: await client.fetch(query, params),
        },
    }),
];

export const Default = Template.bind({});
Default.args = {};
Default.loaders = Template.loaders;
