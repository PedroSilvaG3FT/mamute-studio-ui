import { Injectable, inject } from '@angular/core';
import { UiStore } from '../../../store/ui.store';
import { THEME_CONFIG } from '../config/theme.config';
import { ThemeType } from '../types/theme.type';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  public uiStore = inject(UiStore);

  public setTheme(theme: ThemeType) {
    this.setVariables(theme);

    document.body.className = theme;
    this.uiStore.setTheme(theme);
  }

  public init() {
    this.setTheme(this.uiStore.theme() as ThemeType);
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
