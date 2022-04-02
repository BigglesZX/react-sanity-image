import imageUrlBuilder from '@sanity/image-url';

import { SanityClientLike, SanityImageObject } from './types';

export const IMAGE_WIDTHS = [320, 640, 960, 1280, 1600, 1920, 2240];

export const getUrl = (client: SanityClientLike, image: SanityImageObject, width: number, height: number) => {
    const builder = imageUrlBuilder(client);
    return builder.image(image)
                  .width(width)
                  .height(height)
                  .auto('format')
                  .url();
};

export const getSrcSet = (client: SanityClientLike, image: SanityImageObject, aspectRatio?: number) => {
    const { width: intrinsicWidth } = image.asset.metadata.dimensions;
    const finalAspectRatio = aspectRatio || getIntrinsicAspectRatio(image);
    return IMAGE_WIDTHS.map(width => {
        const height = Math.round(finalAspectRatio * width);
        return width <= intrinsicWidth
            ? `${getUrl(client, image, width, height)} ${width}w`
            : undefined;
    }).filter(s => s).join(', ');
};

export const getSrc = (client: SanityClientLike, image: SanityImageObject, aspectRatio?: number) => {
    const { width, height } = getDefaultSize(image, aspectRatio);
    return getUrl(client, image, width, height);
};

export const getDefaultSize = (image: SanityImageObject, aspectRatio?: number) => {
    const finalAspectRatio = aspectRatio || getIntrinsicAspectRatio(image);
    const width = IMAGE_WIDTHS[0];
    const height = Math.round(finalAspectRatio * width);
    return { width, height };
};

export const getIntrinsicAspectRatio = (image: SanityImageObject) => {
    const {
        width: intrinsicWidth,
        height: intrinsicHeight,
    } = image.asset.metadata.dimensions;
    return (intrinsicHeight / intrinsicWidth);
};

export const getLqipBackgroundStyle = (image: SanityImageObject) => image.asset.metadata.lqip
    ? {
        backgroundImage: `url(${image.asset.metadata.lqip})`,
        backgroundSize: 'cover',
    }
    : undefined;
