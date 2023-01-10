interface RoundedImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function RoundedImage({ src, alt, className }: RoundedImageProps) {
  return (
    <img
      className={`outline outline-2 outline-neutral-600 outline-offset-0 rounded-xl ${className}`}
      alt={alt}
      src={src}
    />
  );
}
