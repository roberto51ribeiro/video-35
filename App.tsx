
import React, { useState, useEffect, useCallback } from 'react';
import type { AspectRatio, ImageFile, AppStatus } from './types';
import { fileToImageFile, dataUrlToImageFile } from './utils/fileUtils';
import { generateVideo } from './services/geminiService';
import ImageSelector from './components/ImageSelector';
import CameraView from './components/CameraView';
import LoadingIndicator from './components/LoadingIndicator';
import VideoPlayer from './components/VideoPlayer';
import { LandscapeIcon, PortraitIcon, SquareIcon, SparklesIcon } from './components/Icons';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>('awaiting_key');
  const [startImage, setStartImage] = useState<ImageFile | null>(null);
  const [endImage, setEndImage] = useState<ImageFile | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showCameraFor, setShowCameraFor] = useState<'start' | 'end' | null>(null);

  const checkApiKey = useCallback(async () => {
    try {
      if (window.aistudio && await window.aistudio.hasSelectedApiKey()) {
        setStatus('idle');
      }
    } catch (e) {
      console.error("Error checking for API key", e);
    }
  }, []);

  useEffect(() => {
    checkApiKey();
  }, [checkApiKey]);

  const handleSelectKey = async () => {
    try {
        await window.aistudio.openSelectKey();
        // Assume success to avoid race condition and immediately show the app.
        setStatus('idle');
    } catch (e) {
        console.error("Error opening select key dialog", e);
        setError("Não foi possível abrir a seleção de chave de API.");
    }
  };

  const handleImageSelected = async (file: File, type: 'start' | 'end') => {
    try {
      const imageFile = await fileToImageFile(file);
      if (type === 'start') {
        setStartImage(imageFile);
      } else {
        setEndImage(imageFile);
      }
    } catch (err) {
      setError('Erro ao processar a imagem.');
      console.error(err);
    }
  };

  const handleCapture = (dataUrl: string) => {
    const imageFile = dataUrlToImageFile(dataUrl);
    if (showCameraFor === 'start') {
      setStartImage(imageFile);
    } else if (showCameraFor === 'end') {
      setEndImage(imageFile);
    }
    setShowCameraFor(null);
  };
  
  const handleGenerateVideo = async () => {
    if (!startImage || !endImage || !prompt) {
      setError('Por favor, selecione duas imagens e insira um prompt.');
      return;
    }
    setError('');
    setStatus('generating');
    try {
      const url = await generateVideo(prompt, startImage, endImage, aspectRatio);
      setVideoUrl(url);
      setStatus('success');
    } catch (err: any) {
      console.error(err);
      let errorMessage = err.message || 'Ocorreu um erro desconhecido.';
      if (errorMessage.includes("Requested entity was not found")) {
        errorMessage = "A chave de API não foi encontrada ou é inválida. Por favor, selecione sua chave novamente.";
        setStatus('awaiting_key');
      } else {
        setStatus('error');
      }
      setError(errorMessage);
    }
  };
  
  const resetApp = () => {
    setStartImage(null);
    setEndImage(null);
    setPrompt('');
    setAspectRatio('16:9');
    setVideoUrl('');
    setError('');
    setStatus('idle');
  }

  const isGenerateButtonDisabled = !startImage || !endImage || !prompt || status === 'generating';

  const renderContent = () => {
    switch (status) {
      case 'awaiting_key':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Video 35</h1>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl">Para começar a criar vídeos com IA, você precisa selecionar uma chave de API do Google AI Studio.</p>
            <button
                onClick={handleSelectKey}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105"
            >
                Selecionar Chave de API
            </button>
            <p className="text-sm text-gray-500 mt-4">Ao usar este serviço, você concorda com os termos e custos associados. <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="underline hover:text-indigo-400">Saiba mais sobre o faturamento.</a></p>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        );
      case 'generating':
        return <LoadingIndicator />;
      case 'success':
        return <VideoPlayer videoUrl={videoUrl} onNewVideo={resetApp} />;
      case 'idle':
      case 'error':
        return (
          <div className="flex flex-col h-full overflow-y-auto">
            <header className="text-center p-6">
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Video 35</h1>
              <p className="text-gray-400 mt-2">Crie um vídeo a partir de um ponto inicial e final.</p>
            </header>

            <main className="flex-grow p-4 md:p-8 flex flex-col lg:flex-row items-start justify-center gap-8">
              <div className="w-full lg:w-1/3">
                <ImageSelector label="Imagem Inicial" image={startImage} onImageSelected={(f) => handleImageSelected(f, 'start')} onOpenCamera={() => setShowCameraFor('start')} />
              </div>
              
              <div className="w-full lg:w-1/3 flex flex-col gap-6 items-center">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Descreva a transição ou a história entre as imagens... (ex: uma semente de árvore crescendo até se tornar uma floresta densa)"
                  className="w-full h-36 p-4 bg-gray-900 border-2 border-gray-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-gray-200 resize-none"
                />
                <div className="flex flex-col items-center gap-3">
                    <label className="font-semibold text-gray-300">Proporção do Vídeo</label>
                    <div className="flex gap-4 p-2 bg-gray-900 rounded-full border border-gray-700">
                        <button onClick={() => setAspectRatio('16:9')} className={`p-2 rounded-full transition-colors ${aspectRatio === '16:9' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-700 text-gray-400'}`}><LandscapeIcon/></button>
                        <button onClick={() => setAspectRatio('9:16')} className={`p-2 rounded-full transition-colors ${aspectRatio === '9:16' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-700 text-gray-400'}`}><PortraitIcon/></button>
                        <button onClick={() => setAspectRatio('1:1')} className={`p-2 rounded-full transition-colors ${aspectRatio === '1:1' ? 'bg-indigo-600 text-white' : 'hover:bg-gray-700 text-gray-400'}`}><SquareIcon/></button>
                    </div>
                </div>
              </div>

              <div className="w-full lg:w-1/3">
                <ImageSelector label="Imagem Final" image={endImage} onImageSelected={(f) => handleImageSelected(f, 'end')} onOpenCamera={() => setShowCameraFor('end')} />
              </div>
            </main>

            <footer className="p-8 mt-auto flex flex-col items-center">
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                <button
                    onClick={handleGenerateVideo}
                    disabled={isGenerateButtonDisabled}
                    className="flex items-center gap-3 w-full max-w-sm justify-center text-xl font-bold py-4 px-8 rounded-full text-white bg-gradient-to-r from-purple-600 to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg shadow-indigo-500/20"
                >
                    <SparklesIcon/>
                    Gerar Vídeo
                </button>
            </footer>
          </div>
        );
    }
  };

  return (
    <div className="h-full w-full bg-gray-950 text-gray-200">
      {renderContent()}
      {showCameraFor && <CameraView onCapture={handleCapture} onClose={() => setShowCameraFor(null)} />}
    </div>
  );
};

export default App;
