import { ImageFacadePort } from "./image-facade-port";

export class ImageAdapterMock implements ImageFacadePort {
  isRemote(_image: string) {
    return false;
  }

  optimizeSrc(_image: string, _options: object) {
    return "";
  }
}
