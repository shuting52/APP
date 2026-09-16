import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, Palette } from 'lucide-react';

interface BackToTopProps {
  onOpenTheme?: () => void;
}

export const BackToTop: React.FC<BackToTopProps> = ({ onOpenTheme }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToFooter = () => {
    const footer = document.getElementById('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-5 bottom-8 z-40 flex flex-col gap-2">
      {onOpenTheme && (
        <button
          type="button"
          id="floatingThemeBtn"
          onClick={onOpenTheme}
          className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer animate-in fade-in"
          title="切换主题风格（千禧年/2026新年/新粗野/新拟态/磨砂/膨胀可爱）"
          aria-label="切换主题风格"
        >
          <Palette className="w-5 h-5" />
        </button>
      )}
      <button
        type="button"
        id="jumpToFooter"
        onClick={scrollToFooter}
        className="w-10 h-10 rounded-full bg-[#0f3460] hover:bg-[#2563eb] text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer animate-in fade-in"
        title="跳转至页脚"
        aria-label="跳转至页脚"
      >
        <ArrowDown className="w-5 h-5" />
      </button>
      {visible && (
        <button
          type="button"
          id="backTop"
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-[#0f3460] hover:bg-[#2563eb] text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer animate-in fade-in"
          title="返回顶部"
          aria-label="返回顶部"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
