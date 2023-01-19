interface RoundedImageProps {
  src: string;
  alt: string;
  size: "sm" | "md" | "lg";
  className?: string;
}

export default function RoundedImage({ src, alt, className, size }: RoundedImageProps) {
  return (
    <img
      className={`outline outline-neutral-600 outline-offset-0 rounded-xl object-cover ${
        size === "sm" && "outline-2 h-8 w-8"
      } ${size === "md" && "outline-3 h-10 w-10"} ${size === "lg" && "outline-4 h-12 w-12"} ${className}`}
      alt={alt}
      src={src}
    />
  );
}
