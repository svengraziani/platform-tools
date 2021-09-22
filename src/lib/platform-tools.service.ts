import {Injectable} from '@angular/core';
import {fromEvent} from "rxjs";
import {startWith, tap} from "rxjs/operators";

export type Platforms = keyof typeof PLATFORMS_MAP;

@Injectable({
  providedIn: 'root'
})
export class PlatformToolsService {

  public constructor() {
    setupPlatforms(window);

    fromEvent(window, 'resize').pipe(
      startWith(true),
      tap(_ => updateOrientation(window))
    ).subscribe();

  }

}

export function updateOrientation(win?: any) {

  if (win.matchMedia("(orientation: portrait)").matches) {
    win.document.documentElement.classList.add('is-portrait');
    win.document.documentElement.classList.remove('is-landscape');
  }

  if (win.matchMedia("(orientation: landscape)").matches) {
    win.document.documentElement.classList.add('is-landscape');
    win.document.documentElement.classList.remove('is-portrait');
  }

}

export const setupPlatforms = (win: any = window) => {
  if (typeof win === 'undefined') {
    return [];
  }

  let platforms: Platforms[] | undefined | null = null;
  platforms = detectPlatforms(win);
  platforms.forEach(p => win.document.documentElement.classList.add(`plt-${p}`));

  return platforms;
};

const detectPlatforms = (win: Window) =>
  (Object.keys(PLATFORMS_MAP) as Platforms[]).filter(p => PLATFORMS_MAP[p](win));

const isMobileWeb = (win: Window): boolean =>
  isMobile(win);

const isIpad = (win: Window) => {
  // iOS 12 and below
  if (testUserAgent(win, /iPad/i)) {
    return true;
  }

  // iOS 13+
  if (testUserAgent(win, /Macintosh/i) && isMobile(win)) {
    return true;
  }

  return false;
};

const isIphone = (win: Window) =>
  testUserAgent(win, /iPhone/i);

const isIOS = (win: Window) =>
  testUserAgent(win, /iPhone|iPod/i) || isIpad(win);

const isAndroid = (win: Window) =>
  testUserAgent(win, /android|sink/i);

const isAndroidTablet = (win: Window) => {
  return isAndroid(win) && !testUserAgent(win, /mobile/i);
};

const isPhablet = (win: Window) => {
  const width = win.innerWidth;
  const height = win.innerHeight;
  const smallest = Math.min(width, height);
  const largest = Math.max(width, height);

  return (smallest > 390 && smallest < 520) &&
    (largest > 620 && largest < 800);
};

const isTablet = (win: Window) => {
  const width = win.innerWidth;
  const height = win.innerHeight;
  const smallest = Math.min(width, height);
  const largest = Math.max(width, height);

  return (
    isIpad(win) ||
    isAndroidTablet(win) ||
    (
      (smallest > 460 && smallest < 820) &&
      (largest > 780 && largest < 1400)
    )
  );
};

const isMobile = (win: Window) =>
  matchMedia(win, '(any-pointer:coarse)');

const isDesktop = (win: Window) =>
  !isMobile(win);

const isPWA = (win: Window): boolean =>
  !!(win.matchMedia('(display-mode: standalone)').matches || (win.navigator as any).standalone);

export const testUserAgent = (win: Window, expr: RegExp) =>
  expr.test(win.navigator.userAgent);

const matchMedia = (win: Window, query: string): boolean =>
  win.matchMedia(query).matches;

const PLATFORMS_MAP = {
  'ipad': isIpad,
  'iphone': isIphone,
  'ios': isIOS,
  'android': isAndroid,
  'phablet': isPhablet,
  'tablet': isTablet,
  'pwa': isPWA,
  'mobile': isMobile,
  'mobileweb': isMobileWeb,
  'desktop': isDesktop
};
