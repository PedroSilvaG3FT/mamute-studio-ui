import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeService } from '../../services/theme.service';
import { AppCheckboxComponent } from '../form/app-checkbox/app-checkbox.component';

@Component({
  standalone: true,
  selector: 'app-theme-selection',
  styleUrl: './app-theme-selection.component.scss',
  templateUrl: './app-theme-selection.component.html',
  imports: [
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    AppCheckboxComponent,
  ],
})
export class AppThemeSelectionComponent {
  public isDarkMode: boolean = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.isDarkMode = this.themeService.uiStore.theme() === 'dark';
  }

  public onToggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setTheme(this.isDarkMode ? 'dark' : 'light');
  }
}
