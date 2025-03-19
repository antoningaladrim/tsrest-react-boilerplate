import { createDocxTextExtractorClient } from './createDocxTextExtractorClient';
import { createPdfToImageClient } from './createPdfToImageClient';
import { createScanClient } from './createScanClient';

export const getScanClientLive = () => {
  return createScanClient();
};

export const getPdfToImageServiceLive = () => {
  return createPdfToImageClient();
};

export const getDocxTextExtractorServiceLive = () => {
  return createDocxTextExtractorClient();
};
