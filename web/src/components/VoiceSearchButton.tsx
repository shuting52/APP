import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';

interface VoiceSearchButtonProps {
  onResult: (text: string) => void;
  onListeningChange?: (isListening: boolean) => void;
}

export const VoiceSearchButton: React.FC<VoiceSearchButtonProps> = ({
  onResult,
  onListeningChange
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check browser SpeechRecognition support (webkitSpeechRecognition or SpeechRecognition)
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'zh-CN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        if (onListeningChange) onListeningChange(true);
      };

      recognition.onresult = (event: any) => {
        if (event.results && event.results.length > 0) {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            // Remove ending punctuation if any
            const cleaned = transcript.replace(/[。？！，,.?!]+$/g, '').trim();
            onResult(cleaned);
          }
        }
      };

      recognition.onerror = (err: any) => {
        console.warn('Speech recognition error:', err);
        setIsListening(false);
        if (onListeningChange) onListeningChange(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        if (onListeningChange) onListeningChange(false);
      };

      recognitionRef.current = recognition;
    } catch (e) {
      console.warn('Could not initialize SpeechRecognition:', e);
      setIsSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, [onResult, onListeningChange]);

  const toggleListening = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isSupported) {
      alert('您的浏览器暂未支持原生语音识别（推荐使用 Chrome/Edge 浏览器并授予麦克风权限）。');
      return;
    }

    if (!recognitionRef.current) return;

    if (isListening) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      setIsListening(false);
      if (onListeningChange) onListeningChange(false);
    } else {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.warn('Start recognition error:', err);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={toggleListening}
      className={`relative p-2 rounded-lg transition-all cursor-pointer flex items-center justify-center ${
        isListening
          ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30 scale-105 animate-pulse'
          : 'text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700/60'
      }`}
      title={
        isListening
          ? '正在聆听语音中...点击可停止'
          : isSupported
          ? '点击开启麦克风语音输入（说出想找的网站或关键词）'
          : '浏览器不支持语音识别'
      }
      aria-label="语音输入"
    >
      {isListening ? (
        <>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-400 rounded-full animate-ping" />
          <Mic className="w-4 h-4" />
        </>
      ) : (
        <Mic className="w-4 h-4" />
      )}
    </button>
  );
};
