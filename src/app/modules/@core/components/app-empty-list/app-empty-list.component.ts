import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink],
  selector: 'app-empty-list',
  styleUrl: './app-empty-list.component.scss',
  templateUrl: './app-empty-list.component.html',
})
export class AppEmptyListComponent {
  public readonly deafultRedirectText = `Ir para cadastro`;
  public readonly defaultDescription: string =
    'Nada por aqui, não encontramos nenhum registro';

  @Input() redirectURL: string = '';
  @Input() description: string = this.defaultDescription;
  @Input() redirectText: string = this.deafultRedirectText;
}
