import { NodePdfToImageService } from './infrastructure';

export const createPdfToImageClient = () => {
  return new NodePdfToImageService();
};
