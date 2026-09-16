import React, { useMemo } from 'react';

export type SolarTermParticleType = 'rain' | 'petals' | 'dew' | 'fireflies' | 'leaves' | 'snow';

interface SolarTermParticlesProps {
  jieQiName: string;
  overrideType?: SolarTermParticleType | null;
}

// Map 24 Solar Terms to atmospheric particle effect types
export function getParticleTypeForSolarTerm(jieQi: string): SolarTermParticleType {
  switch (jieQi) {
    // 1. Spring Rain / Drizzle: 清明、雨水、谷雨
    case '清明':
    case '雨水':
    case '谷雨':
      return 'rain';

    // 2. Spring Petals: 立春、惊蛰、春分
    case '立春':
    case '惊蛰':
    case '春分':
      return 'petals';

    // 3. Summer Fireflies: 立夏、小满、芒种、夏至、小暑、大暑
    case '立夏':
    case '小满':
    case '芒种':
    case '夏至':
    case '小暑':
    case '大暑':
      return 'fireflies';

    // 4. Autumn Golden Leaves: 立秋、处暑、秋分
    case '立秋':
    case '处暑':
    case '秋分':
      return 'leaves';

    // 5. Autumn Dew & Frost: 白露、寒露、霜降 (Today is 白露!)
    case '白露':
    case '寒露':
    case '霜降':
      return 'dew';

    // 6. Winter Snow: 立冬、小雪、大雪、冬至、小寒、大寒
    case '立冬':
    case '小雪':
    case '大雪':
    case '冬至':
    case '小寒':
    case '大寒':
      return 'snow';

    default:
      return 'dew';
  }
}

export const SOLAR_TERM_PARTICLE_NAMES: Record<SolarTermParticleType, { label: string; icon: string; desc: string }> = {
  rain: { label: '清明细雨', icon: '🌧️', desc: '烟雨如酥，细雨霏霏落阶前' },
  petals: { label: '立春花瓣', icon: '🌸', desc: '东风拂面，粉桃樱落舞翩跹' },
  dew: { label: '晶莹白露', icon: '💧', desc: '金风玉露，晨露晞晞凝秋光' },
  leaves: { label: '金秋落叶', icon: '🍂', desc: '层林尽染，银杏枫叶逐清风' },
  fireflies: { label: '夏夜萤火', icon: '✨', desc: '晚风流萤，星河微芒照碧霄' },
  snow: { label: '初冬瑞雪', icon: '❄️', desc: '琼枝玉砌，轻雪如席覆人间' }
};

export const SolarTermParticles: React.FC<SolarTermParticlesProps> = ({
  jieQiName,
  overrideType
}) => {
  const activeType = overrideType || getParticleTypeForSolarTerm(jieQiName);

  // Generate deterministic particles for lightweight performance
  const particles = useMemo(() => {
    const count = activeType === 'rain' ? 24 : activeType === 'snow' ? 18 : 14;
    return Array.from({ length: count }, (_, i) => {
      const left = ((i * 7.3 + (i % 3) * 13) % 96) + 2; // Spread across 2% - 98%
      const duration = 2.5 + ((i * 1.3) % 3.5); // Vary between 2.5s - 6s
      const delay = -((i * 0.7) % 5); // Negative delay for smooth continuous loop
      const size = 6 + (i % 5) * 2;
      const opacity = 0.5 + (i % 4) * 0.12;
      const rotation = (i * 47) % 360;

      return { id: i, left, duration, delay, size, opacity, rotation };
    });
  }, [activeType]);

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none"
      aria-hidden="true"
    >
      <style>{`
        /* 1. Rain Drizzle */
        @keyframes solarTermRain {
          0% {
            transform: translateY(-24px) translateX(0) skewX(-16deg);
            opacity: 0;
          }
          20% {
            opacity: 0.75;
          }
          85% {
            opacity: 0.75;
          }
          100% {
            transform: translateY(56px) translateX(-20px) skewX(-16deg);
            opacity: 0;
          }
        }

        /* 2. Petals Flutter */
        @keyframes solarTermPetal {
          0% {
            transform: translateY(-20px) translateX(0) rotate(0deg) scale(0.85);
            opacity: 0;
          }
          25% {
            opacity: 0.85;
          }
          50% {
            transform: translateY(16px) translateX(14px) rotate(160deg) scale(1);
          }
          80% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(52px) translateX(-8px) rotate(320deg) scale(0.9);
            opacity: 0;
          }
        }

        /* 3. Dew & Frost Shimmer */
        @keyframes solarTermDew {
          0%, 100% {
            transform: translateY(0) scale(0.8);
            opacity: 0.25;
            filter: drop-shadow(0 0 1px rgba(254, 240, 138, 0.4));
          }
          50% {
            transform: translateY(-5px) scale(1.25);
            opacity: 0.9;
            filter: drop-shadow(0 0 5px rgba(251, 191, 36, 0.85));
          }
        }

        /* 4. Autumn Leaves */
        @keyframes solarTermLeaf {
          0% {
            transform: translateY(-20px) translateX(0) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 0.85;
          }
          50% {
            transform: translateY(18px) translateX(-15px) rotate(90deg);
          }
          85% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(54px) translateX(12px) rotate(220deg);
            opacity: 0;
          }
        }

        /* 5. Summer Fireflies */
        @keyframes solarTermFirefly {
          0% {
            transform: translateY(28px) translateX(0) scale(0.8);
            opacity: 0.1;
          }
          50% {
            opacity: 0.95;
            transform: translateY(4px) translateX(10px) scale(1.2);
            filter: drop-shadow(0 0 6px rgba(163, 230, 53, 0.9));
          }
          100% {
            transform: translateY(-26px) translateX(-6px) scale(0.7);
            opacity: 0;
          }
        }

        /* 6. Winter Snow */
        @keyframes solarTermSnow {
          0% {
            transform: translateY(-16px) translateX(0);
            opacity: 0;
          }
          20% {
            opacity: 0.85;
          }
          50% {
            transform: translateY(16px) translateX(8px);
          }
          80% {
            opacity: 0.85;
          }
          100% {
            transform: translateY(50px) translateX(-6px);
            opacity: 0;
          }
        }
      `}</style>

      {/* Render Active Particle Theme */}
      {activeType === 'rain' && (
        <div className="relative w-full h-full">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute pointer-events-none rounded-full"
              style={{
                left: `${p.left}%`,
                top: 0,
                width: '1.5px',
                height: `${12 + (p.id % 4) * 4}px`,
                background:
                  'linear-gradient(to bottom, rgba(147, 197, 253, 0.1), rgba(96, 165, 250, 0.8), rgba(59, 130, 246, 0.95))',
                animation: `solarTermRain ${p.duration * 0.6}s linear infinite`,
                animationDelay: `${p.delay}s`,
                opacity: p.opacity
              }}
            />
          ))}
        </div>
      )}

      {activeType === 'petals' && (
        <div className="relative w-full h-full">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute pointer-events-none"
              style={{
                left: `${p.left}%`,
                top: 0,
                animation: `solarTermPetal ${p.duration * 1.2}s ease-in-out infinite`,
                animationDelay: `${p.delay}s`,
                opacity: p.opacity
              }}
            >
              <svg
                width={p.size + 4}
                height={p.size + 4}
                viewBox="0 0 24 24"
                className="transform"
                style={{
                  filter: 'drop-shadow(0 1px 2px rgba(244, 114, 182, 0.35))'
                }}
              >
                <path
                  d="M12 2C9 7 4 11 5 16C6 20 10 22 12 22C14 22 18 20 19 16C20 11 15 7 12 2Z"
                  fill={p.id % 2 === 0 ? '#f472b6' : '#fb7185'}
                  fillOpacity={0.85}
                />
              </svg>
            </div>
          ))}
        </div>
      )}

      {activeType === 'dew' && (
        <div className="relative w-full h-full">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute pointer-events-none rounded-full flex items-center justify-center"
              style={{
                left: `${p.left}%`,
                top: `${20 + (p.id % 5) * 12}%`,
                width: `${p.size + 2}px`,
                height: `${p.size + 2}px`,
                background:
                  p.id % 2 === 0
                    ? 'radial-gradient(circle, rgba(254, 240, 138, 0.95) 0%, rgba(245, 158, 11, 0.5) 65%, transparent 100%)'
                    : 'radial-gradient(circle, rgba(224, 242, 254, 0.95) 0%, rgba(56, 189, 248, 0.6) 60%, transparent 100%)',
                animation: `solarTermDew ${p.duration * 0.9}s ease-in-out infinite`,
                animationDelay: `${p.delay}s`,
                boxShadow:
                  p.id % 2 === 0
                    ? '0 0 8px rgba(251, 191, 36, 0.5)'
                    : '0 0 8px rgba(56, 189, 248, 0.45)'
              }}
            >
              <div className="w-1 h-1 bg-white rounded-full opacity-90" />
            </div>
          ))}
        </div>
      )}

      {activeType === 'leaves' && (
        <div className="relative w-full h-full">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute pointer-events-none"
              style={{
                left: `${p.left}%`,
                top: 0,
                animation: `solarTermLeaf ${p.duration * 1.3}s cubic-bezier(0.4, 0, 0.2, 1) infinite`,
                animationDelay: `${p.delay}s`,
                opacity: p.opacity
              }}
            >
              <svg
                width={p.size + 3}
                height={p.size + 3}
                viewBox="0 0 24 24"
                style={{
                  filter: 'drop-shadow(0 1px 2px rgba(180, 83, 9, 0.3))'
                }}
              >
                <path
                  d="M17 8C8 10 5 16 7 21C11 20 18 17 19 12C20 9 19 8 17 8ZM12 15C9.5 13 8 10 7 6C11 7 15 9.5 16 13C14.5 14 13.2 14.5 12 15Z"
                  fill={p.id % 3 === 0 ? '#f59e0b' : p.id % 3 === 1 ? '#ea580c' : '#d97706'}
                  fillOpacity={0.88}
                />
              </svg>
            </div>
          ))}
        </div>
      )}

      {activeType === 'fireflies' && (
        <div className="relative w-full h-full">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute pointer-events-none rounded-full"
              style={{
                left: `${p.left}%`,
                top: `${15 + (p.id % 4) * 18}%`,
                width: `${4 + (p.id % 3) * 2}px`,
                height: `${4 + (p.id % 3) * 2}px`,
                backgroundColor: p.id % 2 === 0 ? '#bef264' : '#fef08a',
                animation: `solarTermFirefly ${p.duration * 1.1}s ease-in-out infinite`,
                animationDelay: `${p.delay}s`,
                boxShadow: '0 0 10px rgba(163, 230, 53, 0.9)'
              }}
            />
          ))}
        </div>
      )}

      {activeType === 'snow' && (
        <div className="relative w-full h-full">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute pointer-events-none rounded-full bg-white dark:bg-slate-100 flex items-center justify-center"
              style={{
                left: `${p.left}%`,
                top: 0,
                width: `${4 + (p.id % 4) * 1.5}px`,
                height: `${4 + (p.id % 4) * 1.5}px`,
                animation: `solarTermSnow ${p.duration}s ease-in-out infinite`,
                animationDelay: `${p.delay}s`,
                opacity: p.opacity,
                filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.9))'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
