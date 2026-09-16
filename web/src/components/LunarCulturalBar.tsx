import React, { useState, useEffect } from 'react';
import { getTodayLunarInfo, LunarInfo } from '../utils/lunarCalendar';
import {
  SolarTermParticles,
  SolarTermParticleType,
  SOLAR_TERM_PARTICLE_NAMES,
  getParticleTypeForSolarTerm
} from './SolarTermParticles';
import { Calendar, Sparkles, Moon, Sun, Feather, Info, Wand2 } from 'lucide-react';

export const LunarCulturalBar: React.FC = () => {
  const [lunarInfo, setLunarInfo] = useState<LunarInfo>(() => getTodayLunarInfo());
  const [showDetail, setShowDetail] = useState(false);
  const [overrideParticleType, setOverrideParticleType] = useState<SolarTermParticleType | null>(null);
  const [showParticlePicker, setShowParticlePicker] = useState(false);

  useEffect(() => {
    setLunarInfo(getTodayLunarInfo());
    // Update daily at midnight
    const interval = setInterval(() => {
      setLunarInfo(getTodayLunarInfo());
    }, 60000 * 30);
    return () => clearInterval(interval);
  }, []);

  const naturalParticleType = getParticleTypeForSolarTerm(lunarInfo.jieQiRecent);
  const currentActiveType = overrideParticleType || naturalParticleType;
  const currentParticleInfo = SOLAR_TERM_PARTICLE_NAMES[currentActiveType];

  return (
    <div
      id="cultural-lunar-bar"
      className="w-full bg-gradient-to-r from-amber-50/20 via-rose-50/15 to-amber-50/20 dark:from-slate-900/30 dark:via-slate-800/25 dark:to-slate-900/30 backdrop-blur-md border-b border-amber-200/20 dark:border-slate-800/40 select-none transition-colors duration-300 relative z-10 overflow-hidden"
    >
      {/* Dynamic CSS Atmospheric Particle Background Layer for Current Solar Term */}
      <SolarTermParticles
        jieQiName={lunarInfo.jieQiRecent}
        overrideType={overrideParticleType}
      />

      <div className="max-w-[1320px] mx-auto px-3 py-1.5 flex flex-wrap items-center justify-between gap-y-1 gap-x-3 text-xs relative z-10">
        {/* Left: Date + Lunar Calendar */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Calendar Icon with Warm Tint */}
          <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-400 font-medium">
            <span className="w-5 h-5 rounded-md bg-amber-500/15 dark:bg-amber-400/10 flex items-center justify-center text-amber-700 dark:text-amber-400 shrink-0">
              <Calendar className="w-3.5 h-3.5" />
            </span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 tracking-tight">
              {lunarInfo.solarDateStr}
            </span>
            <span className="text-slate-500 dark:text-slate-400 text-[11px]">
              {lunarInfo.solarWeekStr}
            </span>
          </div>

          <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>

          {/* Lunar Date */}
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <Moon className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="font-medium text-amber-900 dark:text-amber-200">
              农历{lunarInfo.lunarMonthStr}{lunarInfo.lunarDayStr}
            </span>
            <span className="px-1.5 py-0.2 rounded text-[10.5px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300/60 dark:border-amber-700/50">
              {lunarInfo.ganZhiYear}·{lunarInfo.shengXiao}年
            </span>
          </div>

          {/* Festivals if any */}
          {lunarInfo.festivals.length > 0 && (
            <div className="flex items-center gap-1">
              {lunarInfo.festivals.map((fest, idx) => (
                <span
                  key={idx}
                  className="px-1.5 py-0.2 rounded text-[10.5px] font-bold bg-rose-500 text-white shadow-2xs animate-pulse"
                >
                  {fest}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Center / Right: Solar Term (节气) & Classic Cultural Quote */}
        <div className="flex items-center gap-2 flex-wrap ml-auto">
          {/* 24 Solar Term Badge */}
          <div
            onClick={() => setShowDetail(!showDetail)}
            className="group flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-red-600 to-amber-600 text-white font-medium text-[11px] shadow-xs hover:shadow-sm cursor-pointer transition-all hover:scale-102"
            title="点击查看节气与物候详解"
          >
            <Sparkles className="w-3 h-3 text-amber-200 animate-spin" style={{ animationDuration: '8s' }} />
            <span className="tracking-wider font-bold">
              节气 · {lunarInfo.jieQiRecent}
            </span>
            <span className="text-[10px] text-amber-100/90 font-normal hidden md:inline border-l border-white/25 pl-1.5">
              距{lunarInfo.nextJieQiName} {lunarInfo.daysToNextJieQi}天
            </span>
          </div>

          {/* Interactive Solar Term Particle Effect Indicator Pill */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowParticlePicker(!showParticlePicker)}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/70 dark:bg-slate-800/80 border border-amber-300/60 dark:border-amber-500/30 text-[10.5px] text-amber-900 dark:text-amber-200 hover:bg-amber-100/60 dark:hover:bg-slate-700/80 transition-all cursor-pointer shadow-2xs"
              title="点击体验不同节气粒子沉浸动效（如立春花瓣、清明细雨、白露晨光等）"
            >
              <span>{currentParticleInfo.icon}</span>
              <span className="font-semibold">{currentParticleInfo.label}特效</span>
              <span className="text-[9px] opacity-70">▾</span>
            </button>

            {/* Particle Effects Switcher Dropdown */}
            {showParticlePicker && (
              <div
                className="absolute right-0 top-full mt-1.5 w-60 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-amber-300/60 dark:border-slate-700 rounded-xl p-2 shadow-xl z-50 animate-content-fade-in"
                onMouseDown={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between text-[11px] font-bold text-amber-900 dark:text-amber-300 mb-1.5 px-1">
                  <span className="flex items-center gap-1">
                    <Wand2 className="w-3 h-3 text-amber-600" />
                    <span>体验节气沉浸粒子动效</span>
                  </span>
                  {overrideParticleType && (
                    <button
                      type="button"
                      onClick={() => {
                        setOverrideParticleType(null);
                        setShowParticlePicker(false);
                      }}
                      className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline font-normal cursor-pointer"
                    >
                      恢复默认
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-1 text-[11px]">
                  {(Object.keys(SOLAR_TERM_PARTICLE_NAMES) as SolarTermParticleType[]).map((type) => {
                    const item = SOLAR_TERM_PARTICLE_NAMES[type];
                    const isSelected = currentActiveType === type;
                    const isNatural = naturalParticleType === type;

                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          setOverrideParticleType(type);
                          setShowParticlePicker(false);
                        }}
                        className={`px-2 py-1.5 rounded-lg flex items-center gap-1.5 text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500 text-white font-bold shadow-xs'
                            : 'hover:bg-amber-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        <span className="text-sm">{item.icon}</span>
                        <div className="leading-tight min-w-0">
                          <div className="truncate flex items-center gap-0.5">
                            <span>{item.label}</span>
                            {isNatural && (
                              <span className="text-[9px] opacity-75">(当日)</span>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Classical Solar Term Poem */}
          <div className="hidden lg:flex items-center gap-1 text-[11.5px] text-amber-900/80 dark:text-amber-200/80 font-serif italic">
            <Feather className="w-3 h-3 text-amber-700 dark:text-amber-400 opacity-70" />
            <span>“{lunarInfo.solarTermPoem}”</span>
          </div>

          {/* Quick detail trigger button */}
          <button
            type="button"
            onClick={() => setShowDetail(!showDetail)}
            className="text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors p-0.5 cursor-pointer"
            title="文化岁时物候信息"
            aria-label="查看岁时文化详情"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Expandable Cultural Detail Card */}
      {showDetail && (
        <div className="border-t border-amber-200/40 dark:border-white/10 bg-white/20 dark:bg-black/25 backdrop-blur-md px-4 py-3 shadow-inner text-xs transition-all relative z-10">
          <div className="max-w-[1320px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex flex-col gap-1 text-slate-700 dark:text-slate-200">
              <div className="flex items-center gap-2">
                <span className="font-bold text-amber-800 dark:text-amber-400 text-sm">
                  【二十四节气 · {lunarInfo.jieQiRecent}】
                </span>
                {lunarInfo.jieQiHou && (
                  <span className="px-2 py-0.5 rounded bg-amber-100/80 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 font-medium text-[11px]">
                    物候：{lunarInfo.jieQiHou}
                  </span>
                )}
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                  下一个节气：{lunarInfo.nextJieQiName}（约 {lunarInfo.daysToNextJieQi} 天后）
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                时令箴言：{lunarInfo.solarTermPoem}。当前节气加载 <strong>{currentParticleInfo.label}</strong> 沉浸动效（{currentParticleInfo.desc}）。四时轮转，顺应天时，祝您今日心情愉悦、灵感涌现！
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowDetail(false)}
              className="text-[11px] text-amber-700 dark:text-amber-400 hover:underline shrink-0 cursor-pointer self-end sm:self-center font-medium"
            >
              收起详情
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

