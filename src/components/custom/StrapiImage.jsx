import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils";

const StrapiImageProps = {
    src: "",
    alt: "",
    height: 0,
    width: 0,
    className: ""
};
export function StrapiImage({
    src = StrapiImageProps.src,
    alt = StrapiImageProps.alt,
    height = StrapiImageProps.height,
    width = StrapiImageProps.width,
    className = StrapiImageProps.className,
}) {
    if (!src) return null;
    const imageUrl = getStrapiMedia(src);
    const imageFallback = `https://placehold.co/${width}x${height}`;

    return (
        <Image
            src={imageUrl ?? imageFallback}
            alt={alt}
            height={height}
            width={width}
            className={className}
        />
    );
}