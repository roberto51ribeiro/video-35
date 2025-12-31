
import React, { useState, useEffect } from 'react';

const messages = [
  "Ajustando as lentes da IA...",
  "Processando sua criatividade...",
  "Construindo sua obra-prima, pixel por pixel...",
  "A mágica está acontecendo, só mais um instante.",
  "Quase pronto para a estreia!",
];

const LoadingIndicator: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-950/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-center p-4">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-500"></div>
      <p className="mt-6 text-xl font-medium text-gray-200 transition-opacity duration-500">
        {messages[messageIndex]}
      </p>
    </div>
  );
};

export default LoadingIndicator;
