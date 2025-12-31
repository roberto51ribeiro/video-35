
import type { ImageFile } from './types';

export const fileToImageFile = (file: File): Promise<ImageFile> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      const objectUrl = URL.createObjectURL(file);
      resolve({ base64, mimeType: file.type, objectUrl });
    };
    reader.onerror = (error) => reject(error);
  });
};

export const dataUrlToImageFile = (dataUrl: string): ImageFile => {
    const arr = dataUrl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) {
        throw new Error("Invalid Data URL");
    }
    const mimeType = mimeMatch[1];
    const base64 = arr[1];
    
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
    const objectUrl = URL.createObjectURL(blob);

    return { base64, mimeType, objectUrl };
};
