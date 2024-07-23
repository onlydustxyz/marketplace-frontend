import { ImageFacadePort } from "./image-facade-port";

export const ImageAdapterMock: ImageFacadePort = {
  isRemote: (_image: string) => false,
  optimizeSrc: (_image: string, _options: object) => "",
};
