
import React from 'react';
import { DownloadIcon, ShareIcon } from './Icons';

interface VideoPlayerProps {
  videoUrl: string;
  onNewVideo: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, onNewVideo }) => {
  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = videoUrl;
    a.download = `video35_${Date.now()}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        const response = await fetch(videoUrl);
        const blob = await response.blob();
        const file = new File([blob], `video35_${Date.now()}.mp4`, { type: 'video/mp4' });
        await navigator.share({
          title: 'Vídeo criado com Video 35',
          text: 'Confira este vídeo que criei com a ajuda da IA!',
          files: [file],
        });
      } catch (error) {
        console.error('Erro ao compartilhar:', error);
      }
    } else {
      alert('Seu navegador não suporta a API de compartilhamento. Use o botão de download.');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center p-4 md:p-8">
      <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500 mb-6">Seu vídeo está pronto!</h2>
      <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/20 mb-6 bg-black">
        <video src={videoUrl} controls autoPlay loop className="w-full h-full object-contain" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-md">
        <button
          onClick={handleDownload}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105"
        >
          <DownloadIcon />
          <span>Baixar</span>
        </button>
        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105"
        >
          <ShareIcon />
          <span>Compartilhar</span>
        </button>
        <button
          onClick={onNewVideo}
          className="sm:col-span-3 flex items-center justify-center gap-2 bg-transparent border-2 border-gray-600 hover:bg-gray-800 text-gray-300 font-bold py-3 px-4 rounded-lg transition-all"
        >
          Criar Novo Vídeo
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
