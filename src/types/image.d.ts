import {
  SanityAsset,
  SanityImageDimensions,
} from "@sanity/image-url/lib/types/types";

export type SanityImageAsset = SanityAsset & {
  metadata?: { dimensions?: SanityImageDimensions };
};