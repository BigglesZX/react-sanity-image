import { getSrc, getSrcSet, getLqipBackgroundStyle } from '../../utils';

import type { SanityClientLike, SanityImageObject } from '../../types';

export interface BaseImgProps {
    client: SanityClientLike,
    image: SanityImageObject,
    aspectRatio?: number,
    lqip?: boolean,
    sizes?: string,
}

export type ImgProps = BaseImgProps & React.ImgHTMLAttributes<HTMLImageElement>;

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
