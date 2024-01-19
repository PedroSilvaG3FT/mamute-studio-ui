import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeService } from '../../services/theme.service';
import { AppCheckboxComponent } from '../form/app-checkbox/app-checkbox.component';

@Component({
  standalone: true,
  selector: 'app-theme-selection',
  styleUrl: './app-theme-selection.component.scss',
  templateUrl: './app-theme-selection.component.html',
  imports: [FormsModule, MatTooltipModule, AppCheckboxComponent],
})
export class AppThemeSelectionComponent {
  public isDarkMode: boolean = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.isDarkMode = this.themeService.uiStore.theme() === 'dark';
  }

  public onToggleDarkMode() {
    this.themeService.setTheme(this.isDarkMode ? 'dark' : 'light');
  }
}
