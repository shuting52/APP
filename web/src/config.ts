/**
 * 全局配置：应用信息、官方群、版本号
 * 版本号集中管理：升级时同步修改此处 APP_VERSION 与 app/build.gradle.kts
 */
export const APP_CONFIG = {
  appName: '懒得找',
  shareTitle: '懒得找 - 精选导航',
  shareText:
    '推荐一个超好用的导航工具「懒得找」：精选网站资源一键直达，免费无套路，支持分类导航、快捷收藏、自定义添加，还有壁纸设置等个性玩法，快来试试吧！',
  officialGroup: {
    groupName: '懒得找官方交流群',
    qqNumber: '439211347',
    qqGroupUrl:
      'https://qun.qq.com/universal-share/share?ac=1&authKey=gtnBoTi8HEzXQAF9x40Y5GYQtubkWu4pGDJg7OuNQte9oz3sXiFonGqZaUXxjffu&busi_data=eyJncm91cENvZGUiOiI0MzkyMTEzNDciLCJ0b2tlbiI6IkVxeXJDb0tyVjM3Y0VIRmhZQ3M5eDg4VW5MYWU0RW4ybVlSRlBlS2ozQXRxanB5V2ZtNzNHMlRIa2ZRd0VTQnUiLCJ1aW4iOiIzMDc3Nzk1MjMifQ%3D%3D&data=QnUzn164u21Cu1dG7vAVYJqU_4hw0COArsGrrBOIc0vxu7ES6gOJcYyrpu2JgkVs-y3X0ZUGZb_nPBJsBTRccQ&svctype=4&tempid=h5_group_info',
    qrcodeUrl: 'official-qrcode.jpg',
    note: '欢迎加入官方交流群，第一时间获取更新与福利'
  }
};

/**
 * 版本号：与 app/build.gradle.kts 中 versionCode / versionName 保持一致
 */
export const APP_VERSION = {
  versionName: '1.0.6',
  versionCode: 7,
  updateTitle: 'v1.0.6 更新说明',
  updateLog: [
    '开屏特效全新升级：LOADING 字母逐字弹出动画，附渐变波浪启动按钮',
    '首页布局重写：加入 3D 圆环旋转渐变背景装饰，沉浸通透',
    '设置中心改为列表形式，全部弹窗统一毛玻璃红 blob 视觉',
    '移除顶部与底部"分类"导航，界面更简洁聚焦',
    '修复已知问题并优化整体交互细节'
  ]
};

/**
 * 开屏特效编号（按编号对接参考图，直接改这里即可切换开屏动画）：
 * 1 - Uiverse.io by Subaashbala  hideAndSeek 字母逐字弹出动画（LOADING，文字透明需背景）
 * 2 - Uiverse.io by SelfMadeSystem 双环流光加载动画（旧版开屏）
 * 3 - Uiverse.io by gogo_3618      3D 圆环旋转渐变加载动画（首页同款）
 */
export const SPLASH_EFFECT_ID: number = 1;

/** localStorage 中记录“已读版本号”的键名 */
export const LAST_SEEN_VERSION_KEY = 'lazydao_last_seen_version';

/**
 * 强制更新检测配置：
 * 启动时拉取 GitHub 仓库根目录 version.json，若 versionCode 大于当前内置版本，
 * 则弹出强制更新弹窗（不可关闭），展示官方群与“立即更新”按钮。
 */
export const UPDATE_CHECK_URLS: string[] = [
  'https://cdn.jsdelivr.net/gh/shuting52/APP@main/version.json',
  'https://raw.githubusercontent.com/shuting52/APP/main/version.json'
];

export interface RemoteVersionInfo {
  versionCode: number;
  versionName: string;
  changelog?: string;
  apkUrl?: string;
  apkUrlRaw?: string;
  updateTitle?: string;
}
