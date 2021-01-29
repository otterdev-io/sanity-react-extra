import {
  SanityImageDimensions,
  SanityImageWithAssetStub,
  SanityReference,
} from "@sanity/image-url/lib/types/types";

export type SanityDimensionedImage =  SanityImageWithAssetStub & {
  asset: {
    metadata: { dimensions: SanityImageDimensions };
  };
};

export type SanityImage = SanityReference | SanityDimensionedImage;
