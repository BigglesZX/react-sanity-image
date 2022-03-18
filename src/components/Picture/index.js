import PropTypes from 'prop-types';

import { Img } from '../Img';
import { getSrc, getSrcSet, getLqipBackgroundStyle } from '../../common';


export const Picture = ({ client, image, aspectRatio, lqip, media, sizes, imgProps, ...rest }) => (
    <picture {...rest}>
        {media.map(({ media, aspectRatio }) => (
            <source
                key={media}
                media={media}
                srcSet={getSrcSet(client, image, aspectRatio)}
            />
        ))}
        <Img
            srcSet={getSrcSet(client, image, aspectRatio)}
            sizes={sizes}
            src={getSrc(client, image, aspectRatio)}
            style={lqip ? getLqipBackgroundStyle(image) : null}
            {...imgProps}
        />
    </picture>
);

Picture.propTypes = {
    client: PropTypes.object.isRequired,
    image: PropTypes.object.isRequired,
    aspectRatio: PropTypes.number,
    lqip: PropTypes.bool,
    media: PropTypes.arrayOf(PropTypes.shape({
        media: PropTypes.string.isRequired,
        aspectRatio: PropTypes.number.isRequired,
    })),
    sizes: PropTypes.string,
    imgProps: PropTypes.object,
    rest: PropTypes.object,
};

export default Picture;
