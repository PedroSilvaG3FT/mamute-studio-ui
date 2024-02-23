import { Component, inject } from '@angular/core';
import { WhatsAppService } from '../../../../@core/services/whatsapp.service';

@Component({
  imports: [],
  standalone: true,
  selector: 'portal-home-services',
  styleUrl: './home-services.component.scss',
  templateUrl: './home-services.component.html',
})
export class HomeServicesComponent {
  public readonly services = [
    {
      icon: `codicon:settings`,
      title: `Produção Musical:`,
      description: `No MamuteStudio, conte com um experiente produtor musical para guiar sua gravação, mixagem e masterização, entregando um CD Master de qualidade.`,
    },

    {
      title: `Ensaios`,
      icon: `f7:guitars`,
      description: `Crie e desenvolva seus projetos musicais em um ambiente tranquilo e completo no MamuteStudio, oferecendo a estrutura ideal para seus ensaios.`,
    },

    {
      title: `Podcast`,
      icon: `emojione-monotone:studio-microphone`,
      description: `Dê vida ao seu podcast no MamuteStudio, explorando nossa estrutura para garantir a qualidade e sucesso do seu conteúdo.`,
    },

    {
      title: `Gravação ao Vivo`,
      icon: `fluent:live-24-filled`,
      description: `No MamuteStudio, profissionais experientes e uma ambiente de alta qualidade garantem que sua gravação ao vivo se destaque no mercado musical.`,
    },
  ];

  public whatsAppService = inject(WhatsAppService);

  public handleOpenWhatsapp() {
    this.whatsAppService.sendMessage();
  }
}
