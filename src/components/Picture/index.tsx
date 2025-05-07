import { Img } from '../Img';

import { getSrcSet } from '../../utils';
import type { BaseImgProps } from '../Img';

export interface BasePictureProps {
    media?: {
        media: string;
        aspectRatio?: number;
        sizes?: React.SourceHTMLAttributes<HTMLImageElement>['sizes'];
    }[];
    imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
}

export type PictureProps = BaseImgProps &
    BasePictureProps &
    React.HTMLAttributes<HTMLPictureElement>;

export const Picture = ({
    client,
    image,
    aspectRatio,
    lqip,
    media = [],
    sizes,
    builderOptions = undefined,
    imgProps,
    ...rest
}: PictureProps) => (
    <picture {...rest}>
        {media.map(({ media, aspectRatio, sizes: sourceSizes }) => (
            <source
                key={media}
                media={media}
                srcSet={getSrcSet(client, image, aspectRatio, builderOptions)}
                sizes={sourceSizes || sizes}
            />
        ))}
        <Img {...{ client, image, aspectRatio, lqip, sizes, builderOptions }} {...imgProps} />
    </picture>
);

export default Picture;
