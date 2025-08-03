import React from 'react';
import { CldImage as CldImageComponent } from 'next-cloudinary';

export default function CldImage({
  width,
  height,
  src,
  sizes,
  alt,
  className,
  handleClick,
}: {
  width: number;
  height: number;
  src: string;
  sizes?: string;
  alt: string;
  className?: string;
  handleClick?: () => void;
}) {
  return (
    <CldImageComponent
      width={width}
      height={height}
      src={src}
      sizes={sizes}
      alt={alt}
      className={className}
      onClick={handleClick}
      priority
    />
  );
}
