import imageUrlBuilder from '@sanity/image-url';


export const IMAGE_WIDTHS = [320, 640, 960, 1280, 1600, 1920, 2240];

export const getUrl = (client, image, width, height) => {
    const builder = imageUrlBuilder(client);
    return builder.image(image)
                  .width(width)
                  .height(height)
                  .auto('format');
};

export const getSrcSet = (client, image, aspectRatio) => {
    const { width: intrinsicWidth } = image.asset.metadata.dimensions;
    aspectRatio = aspectRatio || getIntrinsicAspectRatio(image);
    return IMAGE_WIDTHS.map(width => {
        const height = Math.round(aspectRatio * width);
        return width <= intrinsicWidth
            ? `${getUrl(client, image, width, height)} ${width}w`
            : undefined;
    }).filter(s => s).join(', ');
};

export const getSrc = (client, image, aspectRatio) => {
    const { width, height } = getDefaultSize(image, aspectRatio);
    return getUrl(image, width, height);
};

export const getDefaultSize = (image, aspectRatio) => {
    aspectRatio = aspectRatio || getIntrinsicAspectRatio(image);
    const width = IMAGE_WIDTHS[0];
    const height = Math.round(aspectRatio * width);
    return { width, height };
};

export const getIntrinsicAspectRatio = (image) => {
    const {
        width: intrinsicWidth,
        height: intrinsicHeight,
    } = image.asset.metadata.dimensions;
    return (intrinsicHeight / intrinsicWidth);
};

export const getLqipBackgroundStyle = (image) => image.asset.metadata.lqip
    ? {
        backgroundImage: `url(${image.asset.metadata.lqip})`,
        backgroundSize: 'cover',
    }
    : undefined;
