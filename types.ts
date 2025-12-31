import type { Operation } from '@google/genai';

export type AspectRatio = '16:9' | '9:16' | '1:1';

export interface ImageFile {
  base64: string;
  mimeType: string;
  objectUrl: string;
}

export type AppStatus = 'awaiting_key' | 'idle' | 'generating' | 'success' | 'error';

export type VideoGenerationOperation = Operation;

// FIX: Centralize global declaration for window.aistudio to avoid duplicate declaration errors.
declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}
