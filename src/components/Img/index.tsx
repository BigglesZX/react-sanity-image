import { getDefaultSize, getSrc, getSrcSet, getLqipBackgroundStyle } from '../../utils';

import type { SanityClient, SanityImageObject, BuilderOptions } from '../../types';

export interface BaseImgProps {
    client: SanityClient;
    image: SanityImageObject;
    aspectRatio?: number;
    lqip?: boolean;
    sizes?: string;
    builderOptions?: BuilderOptions;
}

export type ImgProps = BaseImgProps & React.ImgHTMLAttributes<HTMLImageElement>;

export const Img = ({
    client,
    image,
    aspectRatio,
    lqip,
    sizes,
    builderOptions = undefined,
    ...rest
}: ImgProps) => (
    <img
        srcSet={getSrcSet(client, image, aspectRatio, builderOptions)}
        sizes={sizes}
        src={getSrc(client, image, aspectRatio, builderOptions)}
        style={lqip ? getLqipBackgroundStyle(image) : {}}
        {...getDefaultSize(image, aspectRatio)}
        {...rest}
    />
);

export default Img;
