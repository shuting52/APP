import { Solar, Lunar } from 'lunar-javascript';

export interface LunarInfo {
  solarDateStr: string; // e.g. "2026年9月14日"
  solarWeekStr: string; // e.g. "星期一"
  ganZhiYear: string; // e.g. "丙午"
  shengXiao: string; // e.g. "马"
  lunarMonthStr: string; // e.g. "八月"
  lunarDayStr: string; // e.g. "初四"
  jieQiCurrent: string | null; // e.g. "白露" if today is 白露
  jieQiRecent: string; // e.g. "白露"
  jieQiHou: string; // e.g. "白露 二候"
  nextJieQiName: string; // e.g. "秋分"
  daysToNextJieQi: number; // e.g. 9
  festivals: string[]; // e.g. ["中秋节", "教师节"]
  solarTermPoem: string; // Classic poetic line for current solar term
  culturalSeasonNote: string;
}

// Classical cultural poetic lines corresponding to the 24 Solar Terms
const SOLAR_TERM_POEMS: Record<string, string> = {
  立春: '东风带雨逐西风，大地阳和暖气生',
  雨水: '天街小雨润如酥，草色遥看近却无',
  惊蛰: '微雨众卉新，一雷惊蛰始',
  春分: '日月阳阴两均天，玄鸟不辞归雁便',
  清明: '万物生长此时，皆清洁而明净',
  谷雨: '风吹柳花满店香，雨生百谷夏将至',
  立夏: '日长篱落无人过，唯有蜻蜓蛱蝶飞',
  小满: '物致于此小得盈满，麦穗初齐待丰收',
  芒种: '芒种忙忙割，样样要种时',
  夏至: '昼晷已云极，宵漏自此长',
  小暑: '倏忽温风至，因循小暑来',
  大暑: '桂轮开子夜，萤火照空时',
  立秋: '睡起秋声无觅处，满阶梧桐月明中',
  处暑: '四时俱可喜，最好新秋时',
  白露: '白露收残暑，清风引新凉',
  秋分: '阴阳相半日夜均，丹桂飘香好个秋',
  寒露: '袅袅凉风动，凄凄寒露零',
  霜降: '霜降水返壑，风落木归山',
  立冬: '冻笔新诗懒写，寒炉美酒时温',
  小雪: '太行初雪霁，林表散初晴',
  大雪: '大雪纷纷下，柴门寂寂开',
  冬至: '天时人事日相催，冬至阳生春又来',
  小寒: '小寒连大寒，感象莫相瞒',
  大寒: '大寒须遣酒争豪，更有水仙香满屋'
};

export function getTodayLunarInfo(targetDate: Date = new Date()): LunarInfo {
  const solar = Solar.fromDate(targetDate);
  const lunar = solar.getLunar();

  const ganZhiYear = lunar.getYearInGanZhi();
  const shengXiao = lunar.getYearShengXiao();
  const lunarMonthStr = lunar.getMonthInChinese() + '月';
  const lunarDayStr = lunar.getDayInChinese();
  const jieQiCurrent = lunar.getJieQi() || null;
  const prevJieQi = lunar.getPrevJieQi();
  const nextJieQi = lunar.getNextJieQi();

  const jieQiRecent = jieQiCurrent || prevJieQi.getName();
  const nextJieQiName = nextJieQi.getName();

  // Calculate days until next solar term
  const nextSolar = nextJieQi.getSolar();
  const todayMs = new Date(solar.getYear(), solar.getMonth() - 1, solar.getDay()).getTime();
  const nextMs = new Date(nextSolar.getYear(), nextSolar.getMonth() - 1, nextSolar.getDay()).getTime();
  const daysToNextJieQi = Math.max(1, Math.ceil((nextMs - todayMs) / (1000 * 60 * 60 * 24)));

  // Combine lunar and solar festivals
  const festivals = Array.from(new Set([...lunar.getFestivals(), ...solar.getFestivals()]));

  const solarTermPoem = SOLAR_TERM_POEMS[jieQiRecent] || '四时更替，万物皆有其时';
  const jieQiHou = lunar.getHou() || '';

  return {
    solarDateStr: `${solar.getYear()}年${solar.getMonth()}月${solar.getDay()}日`,
    solarWeekStr: `星期${solar.getWeekInChinese()}`,
    ganZhiYear,
    shengXiao,
    lunarMonthStr,
    lunarDayStr,
    jieQiCurrent,
    jieQiRecent,
    jieQiHou,
    nextJieQiName,
    daysToNextJieQi,
    festivals,
    solarTermPoem,
    culturalSeasonNote: `${ganZhiYear}${shengXiao}年 · 农历${lunarMonthStr}${lunarDayStr}`
  };
}
