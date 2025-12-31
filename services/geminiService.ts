import { GoogleGenAI } from "@google/genai";
import type { AspectRatio, ImageFile, VideoGenerationOperation } from '../types';

export async function generateVideo(
  prompt: string,
  startImage: ImageFile,
  endImage: ImageFile,
  aspectRatio: AspectRatio,
): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  let operation: VideoGenerationOperation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: prompt,
    image: {
      imageBytes: startImage.base64,
      mimeType: startImage.mimeType,
    },
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio: aspectRatio,
      lastFrame: {
        imageBytes: endImage.base64,
        mimeType: endImage.mimeType,
      },
    },
  });

  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;

  if (!downloadLink) {
    throw new Error('Falha na geração do vídeo. Nenhum link de download foi retornado.');
  }

  const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
  if (!videoResponse.ok) {
    throw new Error(`Falha ao baixar o vídeo. Status: ${videoResponse.statusText}`);
  }

  const videoBlob = await videoResponse.blob();
  return URL.createObjectURL(videoBlob);
}
