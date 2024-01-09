import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TerminalWindowComponent } from '../../components/terminal-window/terminal-window.component';

@Component({
  standalone: true,
  selector: 'app-home',
  styleUrl: './home.component.scss',
  templateUrl: './home.component.html',
  imports: [CommonModule, RouterModule, TerminalWindowComponent],
})
export class HomeComponent {
  public angularMaterial: string = `ng add @angular/material`;
  public dependencies: string = `npm i animate.css @iconify/iconify @kolkov/angular-editor`;
  public dependenciesDev: string = `npm i autoprefixer postcss tailwindcss -D`;
  public gitClone: string = `git clone https://github.com/PedroSilvaG3FT/angular-boilerplate.git`;

  public initProject: string = `npm start`;
  public initProjectStorybook: string = `npm run storybook`;
}
