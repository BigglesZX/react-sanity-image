import { Img } from '../Img';

import { getSrcSet } from '../../utils';
import type { ImgProps } from '../Img';

export interface PictureProps extends ImgProps {
    media?: {
        media: string,
        aspectRatio?: number,
    }[],
    imgProps?: JSX.IntrinsicElements['img'][],
}

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
