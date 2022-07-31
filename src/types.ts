import { SanityImageObject as _SanityImageObject } from '@sanity/image-url/lib/types/types';

export type { SanityAsset, SanityClientLike } from '@sanity/image-url/lib/types/types';

export interface SanityImageObject extends _SanityImageObject {
    type?: string;
    asset: {
        metadata: {
            dimensions: {
                width: number,
                height: number,
            },
            lqip?: string,
        },
    }
}

export type AspectRatio = number | null;
