import { MammothDocxTextExtractorService } from './infrastructure';

export const createDocxTextExtractorClient = () => {
  return new MammothDocxTextExtractorService();
};
