import React, { useState, useEffect, useRef } from 'react';

interface FooterProps {
  onShowToast?: (msg: string) => void;
  isAboutOpen?: boolean;
  onOpenAbout?: () => void;
  onCloseAbout?: () => void;
}

const TYPING_TEXTS = [
  '欢迎来到陈淑婷的专属主页',
  '用心做好每一件事',
  '认真对待每一次交流',
  '期待与你建立长期合作',
  '诚信沟通，专业服务'
];

export const Footer: React.FC<FooterProps> = ({
  onShowToast = (_msg?: string) => {},
  isAboutOpen: externalIsAboutOpen,
  onOpenAbout: externalOnOpenAbout,
  onCloseAbout: externalOnCloseAbout
}) => {
  // Internal about modal state if not controlled externally
  const [internalAboutOpen, setInternalAboutOpen] = useState(false);
  const isAboutOpen = externalIsAboutOpen !== undefined ? externalIsAboutOpen : internalAboutOpen;

  const handleOpenAbout = () => {
    if (externalOnOpenAbout) {
      externalOnOpenAbout();
    } else {
      setInternalAboutOpen(true);
    }
  };

  const handleCloseAbout = () => {
    if (externalOnCloseAbout) {
      externalOnCloseAbout();
    } else {
      setInternalAboutOpen(false);
    }
  };

  useEffect(() => {
    // Ensure legacy theme classes are cleaned up from body
    document.body.classList.remove('theme-dark', 'theme-blue', 'theme-green', 'theme-pink');
    try {
      localStorage.removeItem('custom-footer-theme');
    } catch {
      // ignore
    }
  }, []);

  // Typewriter effect state
  const [displayText, setDisplayText] = useState('');
  const textIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const tick = () => {
      const currentFullText = TYPING_TEXTS[textIndexRef.current];

      if (isDeletingRef.current) {
        charIndexRef.current -= 1;
        setDisplayText(currentFullText.substring(0, charIndexRef.current));
      } else {
        charIndexRef.current += 1;
        setDisplayText(currentFullText.substring(0, charIndexRef.current));
      }

      let typingSpeed = 110;

      if (!isDeletingRef.current && charIndexRef.current === currentFullText.length) {
        // Finished typing one sentence, pause before deleting
        typingSpeed = 2200;
        isDeletingRef.current = true;
      } else if (isDeletingRef.current && charIndexRef.current === 0) {
        // Finished deleting, move to next sentence
        isDeletingRef.current = false;
        textIndexRef.current = (textIndexRef.current + 1) % TYPING_TEXTS.length;
        typingSpeed = 450;
      } else if (isDeletingRef.current) {
        typingSpeed = 55;
      }

      timer = setTimeout(tick, typingSpeed);
    };

    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, []);

  // Keyboard Escape listener for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAboutOpen) {
        handleCloseAbout();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAboutOpen]);

  // QQ Contact Click
  const handleQQContact = () => {
    const qqNumber = '307779523';
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    const qqUrl = isMobile
      ? `mqq://im/chat?chat_type=wpa&uin=${qqNumber}&version=1&src_type=web`
      : `tencent://message/?uin=${qqNumber}&Site=陈淑婷&Menu=yes`;

    try {
      window.location.href = qqUrl;
    } catch {
      // ignore
    }

    // Fallback: copy to clipboard
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(qqNumber).then(() => {
        onShowToast(`已复制站长QQ号：${qqNumber}，欢迎交流沟通！`);
      });
    } else {
      onShowToast(`站长QQ号：${qqNumber}`);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="custom-footer" id="footer">
        <div className="footer-container">
          <div className="footer-typing">
            <span className="typing-text">{displayText}</span>
            <span className="typing-cursor">|</span>
          </div>

          <div className="footer-line" />

          <nav className="footer-links">
            <a href="/">首页</a>

            <button
              type="button"
              className="about-open-button"
              aria-controls="about-modal"
              onClick={handleOpenAbout}
            >
              关于我们
            </button>

            <button
              type="button"
              className="qq-contact-button"
              onClick={handleQQContact}
            >
              联系我
            </button>
          </nav>

          <div className="footer-copyright">
            Copyright © <span className="footer-year">{currentYear}</span> 陈淑婷. All rights reserved.
          </div>
        </div>
      </footer>

      {/* 关于我们弹窗 */}
      <div
        className="about-modal"
        id="about-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-title"
        hidden={!isAboutOpen}
      >
        <div className="about-mask" onClick={handleCloseAbout} />

        <div className="about-content">
          <button
            type="button"
            className="about-close"
            aria-label="关闭弹窗"
            onClick={handleCloseAbout}
          >
            ×
          </button>

          <div className="modal-line" />

          <h2 id="about-title">关于我们</h2>

          <p className="modal-subtitle">
            认真沟通，诚信合作，共同创造更好的服务体验
          </p>

          <div className="about-body">
            <h3>一、网站主体</h3>

            <p>
              本网站由陈淑婷负责运营，主要用于个人信息展示、
              业务交流、咨询沟通及相关服务介绍。
            </p>

            <h3>二、服务理念</h3>

            <div className="service-list">
              <div className="service-item">
                <b>诚信沟通</b>
                <span>保持真实、透明的交流</span>
              </div>

              <div className="service-item">
                <b>认真负责</b>
                <span>认真对待每一次咨询</span>
              </div>

              <div className="service-item">
                <b>长期合作</b>
                <span>重视稳定和持续的合作关系</span>
              </div>
            </div>

            <h3>三、服务说明</h3>

            <p>
              本网站主要用于信息展示与交流沟通。
              具体服务内容、合作方式及相关事项，
              以双方实际沟通确认的内容为准。
            </p>

            <h3>四、信息使用说明</h3>

            <p>
              用户主动提交的相关信息，主要用于回复咨询、
              沟通业务或提供相关服务。请勿提交与咨询事项无关的
              敏感个人信息。
            </p>

            <h3>五、免责声明</h3>

            <p>
              本网站所展示的文字、图片及其他资料仅供信息介绍和交流参考，
              不构成任何形式的承诺、保证或专业意见。
            </p>

            <p>
              如涉及法律、财务、医疗、投资等专业事项，
              建议向具有相应资质的专业人士进行咨询。
            </p>

            <h3>六、知识产权</h3>

            <p>
              本网站中的原创文字、页面设计及其他内容，
              未经许可不得擅自复制、转载、修改或用于商业用途。
            </p>

            <h3>七、条款更新</h3>

            <p>
              本页面内容可能根据实际情况及相关规定进行更新，
              更新后的内容将在本页面展示。
            </p>

            <p className="update-time">
              最后更新时间：{currentYear}年
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
