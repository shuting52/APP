import { useEffect } from 'react';

const THRESHOLD = 8;

/**
 * 全站禁止左右滑动（横向 touchmove），标签/子分类/快捷栏等允许横向滚动的区域除外。
 * 豁免方式：给允许横向滚动的容器添加 class `allow-hscroll`。
 */
export const PreventHorizontalSwipe: React.FC = () => {
  useEffect(() => {
    let startX = 0;
    let startY = 0;

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      startX = t.clientX;
      startY = t.clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      // 标签区域等豁免容器：允许左右滑动
      if (target.closest('.allow-hscroll')) return;
      const t = e.touches[0];
      if (!t) return;
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      // 水平意图明显且幅度足够时阻止默认行为（防止横向 overscroll / 误触发）
      if (Math.abs(dx) > THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
        e.preventDefault();
      }
    };

    // 触控板 / 鼠标滚轮横向滚动同样拦截（非标签区域）
    const onWheel = (e: WheelEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      if (target.closest('.allow-hscroll')) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > THRESHOLD) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => {
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return null;
};
