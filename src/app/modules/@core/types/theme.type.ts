import { IThemeConfig } from '../interfaces/theme.interface';

export type ThemeType = 'light' | 'dark';
export type ThemeConfigType = Record<ThemeType, IThemeConfig>;
