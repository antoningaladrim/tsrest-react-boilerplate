export interface PdfToImageService {
  convert(arrayBuffer: ArrayBuffer): Promise<Uint8Array[]>;
}
