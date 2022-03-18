import PropTypes from 'prop-types';

import { getSrc, getSrcSet, getLqipBackgroundStyle } from '../../common';


export const Img = ({ client, image, aspectRatio, lqip, sizes, ...rest }) => (
    <img
        srcSet={getSrcSet(client, image, aspectRatio)}
        sizes={sizes}
        src={getSrc(client, image, aspectRatio)}
        style={lqip ? getLqipBackgroundStyle(image) : null}
        {...rest}
    />
);

Img.propTypes = {
    client: PropTypes.object.isRequired,
    image: PropTypes.object.isRequired,
    aspectRatio: PropTypes.number,
    lqip: PropTypes.bool,
    sizes: PropTypes.string,
    rest: PropTypes.object,
};

export default Img;
