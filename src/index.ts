export type {
    SanityAsset,
    SanityClientLike,
    SanityImageObject,
    AspectRatio,
} from "./types";

export { default as Img } from "./components/Img";
export { default as Picture } from "./components/Picture";
export { DEFAULT_SOURCE_WIDTHS } from "./utils";

// Legacy constant name for backwards-compatibility
export { DEFAULT_SOURCE_WIDTHS as IMAGE_WIDTHS } from "./utils";
