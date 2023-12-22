import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';
import { AppCheckboxComponent } from '../form/app-checkbox/app-checkbox.component';

@Component({
  standalone: true,
  selector: 'app-theme-selection',
  imports: [FormsModule, AppCheckboxComponent],
  styleUrl: './app-theme-selection.component.scss',
  templateUrl: './app-theme-selection.component.html',
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
