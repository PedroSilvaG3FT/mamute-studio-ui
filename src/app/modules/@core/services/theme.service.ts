import { Injectable } from '@angular/core';
import { THEME_CONFIG } from '../config/theme.config';
import { STORAGE_THEME_STATE_KEY } from '../constants/storage.constant';
import { ThemeType } from '../types/theme.type';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly defaultTheme: ThemeType = 'light';

  constructor() {}

  public get currentTheme() {
    return (
      (localStorage.getItem(STORAGE_THEME_STATE_KEY) as ThemeType) ||
      this.defaultTheme
    );
  }

  public setTheme(theme: ThemeType) {
    this.setVariables(theme);

    document.body.className = theme;
    localStorage.setItem(STORAGE_THEME_STATE_KEY, theme);
  }

  public init() {
    this.setTheme(this.currentTheme);
  }

  public setVariables(theme: ThemeType) {
    const appStyle = document.documentElement.style;
    if (!appStyle) return;

    const variables = THEME_CONFIG[theme];
    appStyle.setProperty(`--bg-primary`, variables.bgPrimary);
    appStyle.setProperty(`--bg-secondary`, variables.bgSecondary);
    appStyle.setProperty(`--text-primary`, variables.textPrimary);
  }
}
