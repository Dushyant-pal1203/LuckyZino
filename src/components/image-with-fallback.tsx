import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

export interface IImageWithFallbackProps extends ImageProps {
  src: string,
  fallbackSrc: string,
  alt: string
}

const ImageWithFallback = ({ src, fallbackSrc, alt, ...rest }: IImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  // Reset the image source if the main src prop changes
  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...rest}
      src={imgSrc ? imgSrc : fallbackSrc}
      alt={alt}
      // On error, set the source to the fallback image
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};

export default ImageWithFallback;
