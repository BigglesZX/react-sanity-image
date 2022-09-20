import imageUrlBuilder from '@sanity/image-url';

import { SanityClientLike, SanityImageObject } from './types';

/**
 * Various widths at which to generate image sources in `srcset`. First item is used as the default width in fallback `img` elements.
 */
export const SOURCE_WIDTHS = [320, 640, 960, 1280, 1600, 1920, 2240];

/**
 * Get dimensions of the specified image at the default size, which is a `width` of the first element in `SOURCE_WIDTHS` and a corresponding `height` based on cropped or default aspect ratio, overrideable with the `aspectRatio` argument
 * @param image Sanity image object
 * @param aspectRatio Desired aspect ratio
 * @returns Dimensions object containing `width` and `height`
 */
export const getDefaultSize = (image: SanityImageObject, aspectRatio?: number) => {
    const finalAspectRatio = aspectRatio || getEffectiveAspectRatio(image);
    const width = SOURCE_WIDTHS[0];
    const height = Math.round(finalAspectRatio * width);
    return { width, height };
};

/**
 * Get effective aspect ratio of source image, taking into account cropping if defined
 * @param image Sanity image object
 * @returns Aspect ratio
 */
export const getEffectiveAspectRatio = (image: SanityImageObject) => {
    const { width, height } = getEffectiveDimensions(image);
    return (height / width);
};

/**
 * Get effective dimensions of source image, taking into account cropping if defined
 * @param image Sanity image object
 * @returns Dimensions object containing `width` and `height`
 */
export const getEffectiveDimensions = (image: SanityImageObject) => {
    // source: https://github.com/sanity-io/sanity/issues/1627#issuecomment-748246785

    const {
        width: intrinsicWidth,
        height: intrinsicHeight,
    } = image.asset.metadata.dimensions;

    let cropWidth = 0;
    let cropHeight = 0;
    if (image.crop) {
        cropWidth =
            intrinsicWidth -
            image.crop.left * intrinsicWidth -
            image.crop.right * intrinsicWidth;
        cropHeight =
            intrinsicHeight -
            image.crop.top * intrinsicHeight -
            image.crop.bottom * intrinsicHeight;
    }

    const width = cropWidth || intrinsicWidth;
    const height = cropHeight || intrinsicHeight;
    return { width, height };
};

/**
 * Generate partial `style` object for LQIP background, if image includes LQIP definition
 * @param image Sanity image object
 * @returns
 */
export const getLqipBackgroundStyle = (image: SanityImageObject) => image.asset.metadata.lqip
    ? {
        backgroundImage: `url(${image.asset.metadata.lqip})`,
        backgroundSize: 'cover',
    }
    : undefined;

/**
 * Generates a `srcset` string for the specified image using the built-in source widths definition
 * @param client Sanity client instance
 * @param image Sanity image object
 * @param aspectRatio Desired aspect ratio of generated sources
 * @returns `srcset` string
 */
export const getSrcSet = (client: SanityClientLike, image: SanityImageObject, aspectRatio?: number) => {
    const { width: effectiveWidth } = getEffectiveDimensions(image);
    const finalAspectRatio = aspectRatio || getEffectiveAspectRatio(image);
    return SOURCE_WIDTHS.map(width => {
        const height = Math.round(finalAspectRatio * width);
        return width <= effectiveWidth
            ? `${getUrl(client, image, width, height)} ${width}w`
            : undefined;
    }).filter(s => s).join(', ');
};

export const getSrc = (client: SanityClientLike, image: SanityImageObject, aspectRatio?: number) => {
    const { width, height } = getDefaultSize(image, aspectRatio);
    return getUrl(client, image, width, height);
};

/**
 * Use the Sanity image-url builder to construct a CDN URL for the given image at the given dimensions
 * @param client Sanity client instance
 * @param image Sanity image object
 * @param width Image width in pixels
 * @param height Image height in pixels
 * @returns CDN URL for generated image
 */
 export const getUrl = (client: SanityClientLike, image: SanityImageObject, width: number, height: number) => {
    const builder = imageUrlBuilder(client);
    return builder.image(image)
                  .width(width)
                  .height(height)
                  .auto('format')
                  .url();
};
