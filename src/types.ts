import type {
    ImageUrlBuilderOptionsWithAliases,
    SanityClientLike,
    SanityModernClientLike,
    SanityProjectDetails,
    SanityImageObject as _SanityImageObject,
} from '@sanity/image-url/lib/types/types';

export type {
    SanityAsset,
    ImageUrlBuilderOptionsWithAliases,
} from '@sanity/image-url/lib/types/types';

export type SanityClient = SanityClientLike | SanityProjectDetails | SanityModernClientLike;

export type BuilderOptions = ImageUrlBuilderOptionsWithAliases & { sourceWidths?: number[] };

export interface SanityImageObject extends _SanityImageObject {
    type?: string;
    asset: {
        metadata: {
            dimensions: {
                width: number;
                height: number;
            };
            lqip?: string;
        };
    };
}

export type AspectRatio = number | null;
