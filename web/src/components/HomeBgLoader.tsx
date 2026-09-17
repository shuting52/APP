import React from 'react';

/**
 * 首页背景装饰组件 (From Uiverse.io by gogo_3618)
 * 3D 圆环旋转渐变 loader，作为首页背景组件，多个实例散布于页面营造氛围。
 * pointer-events: none 保证不遮挡任何点击交互。
 */
export const HomeBgLoader: React.FC = () => {
  return (
    <div className="home-bg-loader" aria-hidden="true">
      <div className="home-loader-item home-loader-1">
        <div className="gogo-loader"><div className="gogo-circle" /></div>
      </div>
      <div className="home-loader-item home-loader-2">
        <div className="gogo-loader"><div className="gogo-circle" /></div>
      </div>
      <div className="home-loader-item home-loader-3">
        <div className="gogo-loader"><div className="gogo-circle" /></div>
      </div>
    </div>
  );
};

export default HomeBgLoader;
