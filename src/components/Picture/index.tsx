import { Img } from '../Img';

import { getSrcSet } from '../../utils';
import type { BaseImgProps } from '../Img';

export interface BasePictureProps {
    media?: {
        media: string,
        aspectRatio?: number,
    }[],
    imgProps?: React.ImgHTMLAttributes<HTMLImageElement>,
}

export type PictureProps =
    BaseImgProps & BasePictureProps & React.HTMLAttributes<HTMLPictureElement>;

export const Picture = ({ client, image, aspectRatio, lqip, media = [], sizes, imgProps, ...rest }: PictureProps) => (
    <picture {...rest}>
        {media.map(({ media, aspectRatio }) => (
            <source
                key={media}
                media={media}
                srcSet={getSrcSet(client, image, aspectRatio)}
            />
        ))}
        <Img
            client={client}
            image={image}
            aspectRatio={aspectRatio}
            lqip={lqip}
            sizes={sizes}
            {...imgProps}
        />
    </picture>
);

export default Picture;
