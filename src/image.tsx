import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import { ForwardedRef, forwardRef } from "react";
import { SanityDimensionedImage, SanityImage  } from "./types/image";
import groq from "groq";

type DPR = 1 | 2 | 3;

export const withDimensions = (img: string) => groq`${img} {
    asset->{
      ...,
      metadata {
        dimensions
      }
  }
}`;

export function isDimensioned(image: SanityImage): image is SanityDimensionedImage {
  return (image as any).asset?.metadata?.dimensions != null
}

export const SanityImg = forwardRef(
  (
    {
      builder,
      image,
      className,
      alt,
      width,
      height,
      dprs,
    }: {
      builder: ImageUrlBuilder;
      image: SanityImage;
      className?: string;
      alt?: string;
      width?: number;
      height?: number;
      dprs?: DPR[];
    },
    ref: ForwardedRef<HTMLImageElement>
  ) => {
    let autoWidth: number | undefined
    let autoHeight: number | undefined
    let aspectRatio : number | undefined
    if (isDimensioned(image)) {
      autoWidth = image.asset.metadata.dimensions.width;
      autoHeight = image.asset.metadata.dimensions.height;
      aspectRatio = image.asset.metadata.dimensions.aspectRatio;
    } else {
      console.warn("Image has no metadata! Layout shifts will occur.");
      console.warn(image);
    }
    let mBuilder = builder.image(image).auto("format");
    if (width) {
      mBuilder = mBuilder.width(width);
      autoWidth = width;
      if (aspectRatio) {
        autoHeight = width / aspectRatio;
      }
    }
    if (height) {
      mBuilder = mBuilder.height(height);
      autoHeight = height;
      if (aspectRatio) {
        autoWidth = height * aspectRatio;
      }
    }
    return (
      <img
        ref={ref}
        className={className}
        alt={alt}
        width={autoWidth}
        height={autoHeight}
        loading="lazy"
        src={mBuilder.url()!}
        srcSet={(dprs ?? [1, 2, 3])
          .map((dpr) => `${mBuilder.dpr(dpr).url()} ${dpr}x`)
          .join(", ")}
      />
    );
  }
);
