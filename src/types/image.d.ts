import {
  SanityImageDimensions,
  SanityImageWithAssetStub,
} from "@sanity/image-url/lib/types/types";

export type SanityImageWithMetadata = SanityImageWithAssetStub & {
  asset: {
    metadata?: { dimensions?: SanityImageDimensions };
  };
};
