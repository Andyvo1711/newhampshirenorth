"use client";

import { useState } from "react";
import Image from "next/image";
import { getSafeImage } from "@/lib/images";

interface SafeImageProps {
  src?: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  orientation?: "landscape" | "portrait";
}

export default function SafeImage({
  src,
  alt,
  fill,
  width,
  height,
  className,
  sizes,
  priority,
  orientation = "landscape",
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);
  const { src: safeSrc, isPlaceholder } = getSafeImage(src, orientation);
  const fallback = orientation === "portrait" ? "/images/placeholder-portrait.svg" : "/images/placeholder-landscape.svg";
  const finalSrc = failed ? fallback : safeSrc;
  const finalUnoptimized = failed || isPlaceholder;

  if (fill) {
    return (
      <Image
        src={finalSrc}
        alt={alt}
        fill
        sizes={sizes ?? "100vw"}
        className={className}
        unoptimized={finalUnoptimized}
        priority={priority}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <Image
      src={finalSrc}
      alt={alt}
      width={width ?? 800}
      height={height ?? 600}
      sizes={sizes}
      className={className}
      unoptimized={finalUnoptimized}
      priority={priority}
      onError={() => setFailed(true)}
    />
  );
}
