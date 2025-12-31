
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { CloseIcon } from './Icons';

interface CameraViewProps {
  onCapture: (dataUrl: string) => void;
  onClose: () => void;
}

const CameraView: React.FC<CameraViewProps> = ({ onCapture, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
          audio: false,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Erro ao acessar a câmera:", err);
        setError("Não foi possível acessar a câmera. Verifique as permissões no seu navegador.");
      }
    };

    getMedia();

    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCapture = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        onCapture(dataUrl);
      }
    }
  }, [onCapture]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
      <button onClick={onClose} className="absolute top-4 right-4 text-white z-50">
        <CloseIcon />
      </button>
      {error ? (
        <div className="text-center text-red-500 p-8">
            <p>{error}</p>
        </div>
      ) : (
        <div className="relative w-full h-full">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            <canvas ref={canvasRef} className="hidden" />
            <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-center">
                <button
                onClick={handleCapture}
                className="w-20 h-20 bg-white rounded-full border-4 border-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white transition-transform transform hover:scale-105"
                aria-label="Capturar foto"
                ></button>
            </div>
        </div>
      )}
    </div>
  );
};

export default CameraView;
