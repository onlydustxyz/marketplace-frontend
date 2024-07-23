export interface ImageFacadePort {
  isRemote: (image: string) => boolean;
  optimizeSrc: (
    image: string,
    options?: Partial<{
      format: string;
      width: number;
      height: number;
      fit: string;
    }>
  ) => string;
}
