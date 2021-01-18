import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import { ForwardedRef, forwardRef } from "react";
import { SanityImageAsset } from "./types/image";

type DPR = 1 | 2 | 3;
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
      image: SanityImageAsset;
      className?: string;
      alt?: string;
      width?: number;
      height?: number;
      dprs?: DPR[];
    },
    ref: ForwardedRef<HTMLImageElement>
  ) => {
    let autoWidth = image.metadata?.dimensions.width;
    let autoHeight = image.metadata?.dimensions.height;
    let mBuilder = builder.image(image).auto("format");
    if (width) {
      mBuilder = mBuilder.width(width);
      autoWidth = width;
      autoHeight = width / image.metadata.dimensions.aspectRatio;
    }
    if (height) {
      mBuilder = mBuilder.height(height);
      autoHeight = height;
      autoWidth = height * image.metadata.dimensions.aspectRatio;
    }
    if (!image.metadata) {
      console.warn("Image has no metadata!");
      console.warn(mBuilder.url());
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