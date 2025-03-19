import { pdfToPng } from 'pdf-to-png-converter';
import { PdfToImageService } from '../domain/PdfToImageService';

export class NodePdfToImageService implements PdfToImageService {
  convert = async (arrayBuffer: ArrayBuffer): Promise<Uint8Array[]> => {
    const buffer = Buffer.from(arrayBuffer);
    const pngPages = await pdfToPng(buffer);

    return pngPages.map((page) => new Uint8Array(page.content));
  };
}
