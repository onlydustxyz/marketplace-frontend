export interface OptimizeImageOptions {
  format: string;
  width: number;
  height: number;
  fit: string;
}

export interface ImageFacadePort {
  isRemote(image: string): boolean;
  optimizeSrc(image: string, options?: Partial<OptimizeImageOptions>): string;
}
