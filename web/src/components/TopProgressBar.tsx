import React, { useEffect, useState } from 'react';

interface TopProgressBarProps {
  isLoading: boolean;
}

export const TopProgressBar: React.FC<TopProgressBarProps> = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let finishTimer: NodeJS.Timeout;

    if (isLoading) {
      setVisible(true);
      setProgress(15);

      // Fast progress to ~75% then slowing down
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 88) return prev;
          const diff = Math.random() * 15 + 8;
          return Math.min(88, prev + diff);
        });
      }, 100);
    } else if (visible) {
      // Completed, jump to 100% then fade out
      setProgress(100);
      finishTimer = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 350);
    }

    return () => {
      clearInterval(timer);
      clearTimeout(finishTimer);
    };
  }, [isLoading, visible]);

  if (!visible && progress === 0) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 pointer-events-none transition-opacity duration-300 ${
        progress === 100 ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ height: '3px' }}
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-all duration-200 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
