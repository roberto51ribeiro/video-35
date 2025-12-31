
import React, { useRef } from 'react';
import type { ImageFile } from '../types';
import { CameraIcon, GalleryIcon } from './Icons';

interface ImageSelectorProps {
  label: string;
  image: ImageFile | null;
  onImageSelected: (file: File) => void;
  onOpenCamera: () => void;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ label, image, onImageSelected, onOpenCamera }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelected(file);
    }
  };

  const handleGalleryClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900/50 border-2 border-dashed border-gray-700 rounded-2xl p-4 transition-all duration-300 ease-in-out hover:border-indigo-500/80 hover:bg-gray-900/80">
      <h3 className="text-lg font-semibold text-gray-300 mb-4">{label}</h3>
      <div className="aspect-square w-full relative rounded-lg overflow-hidden flex items-center justify-center">
        {image ? (
          <img src={image.objectUrl} alt={label} className="w-full h-full object-cover" />
        ) : (
          <div className="text-gray-500">
            <GalleryIcon />
          </div>
        )}
      </div>
      <div className="flex gap-4 mt-4 w-full">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          onClick={handleGalleryClick}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-700/50 hover:bg-gray-700 text-gray-200 font-medium py-3 px-4 rounded-lg transition-colors"
        >
          <GalleryIcon />
          <span>Galeria</span>
        </button>
        <button
          onClick={onOpenCamera}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-700/50 hover:bg-gray-700 text-gray-200 font-medium py-3 px-4 rounded-lg transition-colors"
        >
          <CameraIcon />
          <span>Câmera</span>
        </button>
      </div>
    </div>
  );
};

export default ImageSelector;
