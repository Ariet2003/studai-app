import { XMarkIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { ReadyWork } from '@/types/work';
import { useState, useEffect } from 'react';

interface WorkPreviewModalProps {
  work: ReadyWork | null;
  onClose: () => void;
  onPurchase: (work: ReadyWork) => void;
}

export default function WorkPreviewModal({ work, onClose, onPurchase }: WorkPreviewModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [html, setHtml] = useState<string | null>(null);
  const [scale, setScale] = useState(1.2);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 2.5));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  useEffect(() => {
    const loadPreview = async () => {
      if (!work) return;

      setLoading(true);
      setError(null);
      setHtml(null);
      setLoadingProgress(0);

      try {
        console.log('Requesting preview for file:', work.filePath);
        
        const response = await fetch('/api/ready-works/preview', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ filePath: work.filePath }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to load preview');
        }

        // Имитация прогресса загрузки
        const reader = response.body?.getReader();
        const contentLength = +(response.headers.get('Content-Length') ?? 0);
        let receivedLength = 0;
        let chunks = [];

        while(true) {
          const {done, value} = await reader!.read();
          
          if (done) break;
          
          chunks.push(value);
          receivedLength += value.length;
          
          if (contentLength) {
            setLoadingProgress(Math.round((receivedLength / contentLength) * 100));
          }
        }

        const htmlContent = new TextDecoder().decode(
          new Uint8Array(chunks.reduce((acc, chunk) => [...acc, ...chunk], []))
        );
        
        setHtml(htmlContent);
        console.log('Preview loaded successfully');
      } catch (err) {
        console.error('Error in preview process:', err);
        setError(err instanceof Error ? err.message : 'Не удалось загрузить предпросмотр документа');
      } finally {
        setLoading(false);
      }
    };

    loadPreview();
  }, [work]);

  if (!work) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-2 sm:p-4">
        <div className="relative w-full transform overflow-hidden rounded-xl bg-[#181F38] px-2 pb-2 pt-3 text-left shadow-xl transition-all sm:px-4 sm:pb-4 sm:pt-5 sm:my-8 sm:max-w-5xl sm:p-6">
          {/* Кнопка закрытия */}
          <button
            onClick={onClose}
            className="absolute right-2 top-2 text-gray-400 hover:text-white transition-colors sm:right-4 sm:top-4"
          >
            <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* Заголовок */}
          <div className="mb-3 sm:mb-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 pr-8">
              {work.title}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-sm sm:text-base text-gray-400">
                Автор: {work.author}
              </span>
              <span className="inline-block px-2 py-1 sm:px-3 sm:py-1 bg-[#0A0F23] text-[#454CEE] rounded-full text-xs sm:text-sm font-medium">
                {work.type}
              </span>
            </div>
          </div>

          {/* Контролы масштабирования */}
          <div className="flex items-center justify-end mb-2 gap-1 sm:gap-2">
            <button
              onClick={handleZoomOut}
              className="p-1 text-gray-400 hover:text-white transition-colors"
              title="Уменьшить"
            >
              <MinusIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <span className="text-sm sm:text-base text-gray-400">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1 text-gray-400 hover:text-white transition-colors"
              title="Увеличить"
            >
              <PlusIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>

          {/* Предпросмотр документа */}
          <div className="bg-white rounded-lg mb-3 sm:mb-6 overflow-hidden">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-[50vh] sm:h-[60vh]">
                <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-gray-300 border-t-[#454CEE] rounded-full animate-spin mb-3 sm:mb-4" />
                <div className="text-sm sm:text-base text-gray-500">
                  Загрузка: {loadingProgress}%
                </div>
              </div>
            ) : error ? (
              <div className="text-center text-red-500 py-6 sm:py-8 px-2 sm:px-4">
                <p className="font-medium mb-2 text-sm sm:text-base">Ошибка загрузки:</p>
                <p className="text-sm sm:text-base">{error}</p>
                {work.filePath && (
                  <p className="text-xs sm:text-sm mt-2 text-gray-500">
                    Путь к файлу: {work.filePath}
                  </p>
                )}
                <button
                  onClick={() => window.location.reload()}
                  className="mt-3 sm:mt-4 px-3 py-1.5 sm:px-4 sm:py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm sm:text-base"
                >
                  Попробовать снова
                </button>
              </div>
            ) : (
              <div className="relative h-[60vh] sm:h-[70vh] overflow-auto bg-gray-100">
                <div 
                  className="min-h-full"
                  style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'top center',
                    transition: 'transform 0.2s ease-in-out'
                  }}
                >
                  <div
                    className="bg-white shadow-lg mx-auto"
                    dangerouslySetInnerHTML={{ __html: html || '' }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Информация и кнопки */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
            <div>
              <p className="text-sm sm:text-base text-gray-400 mb-1">Количество страниц: {work.pageCount}</p>
              <p className="text-lg sm:text-xl font-semibold text-white">
                Стоимость: {work.price.amount} сом
              </p>
            </div>
            <button
              onClick={() => onPurchase(work)}
              className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-[#454CEE] to-[#3339AA] hover:from-[#3339AA] hover:to-[#454CEE] text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
            >
              Купить работу
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}