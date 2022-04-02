import { getSrc, getSrcSet, getLqipBackgroundStyle } from '../../utils';

import type { SanityClientLike, SanityImageObject } from '../../types';

export interface ImgProps {
    client: SanityClientLike,
    image: SanityImageObject,
    aspectRatio?: number,
    lqip: boolean,
    sizes?: string,
}

export const Img = ({ client, image, aspectRatio, lqip, sizes, ...rest }: ImgProps) => (
    <img
        srcSet={getSrcSet(client, image, aspectRatio)}
        sizes={sizes}
        src={getSrc(client, image, aspectRatio)}
        style={lqip ? getLqipBackgroundStyle(image) : {}}
        {...rest}
    />
);

export default Img;
