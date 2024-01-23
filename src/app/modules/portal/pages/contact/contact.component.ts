import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { WhatsAppService } from '../../../@core/services/whatsapp.service';
import { CONTACT_PHONE_NUMBERS } from '../../../@shared/constants/contact-phone.constant';

@Component({
  standalone: true,
  selector: 'portal-contact',
  styleUrl: './contact.component.scss',
  templateUrl: './contact.component.html',
  imports: [MatExpansionModule, MatIconModule],
})
export class ContactComponent {
  public currentIndexOpen?: number;

  public faqItems = [
    {
      title: `Como faço para ser um patrocinador da Apocalipse?`,
      description: `Entre em contato com nosso departamento de marketing (11) 97848-5904, temos uma equipe preparada para te atender!`,
    },
    {
      title: `Como saber a data do próximo evento?`,
      description: `Toda a agenda de eventos será publicada nesse portal e em nossas redes sociais, então fique ligado pois em breve teremos atualizações.`,
    },
    {
      title: `Como faço para me tornar um voluntário?`,
      description: `Entre em contato com nosso departamento de marketing (11) 97848-5904, temos uma equipe preparada para te atender! será um prazer ter você conosco.`,
    },
    {
      title: `Como participar de um evento?`,
      description: `Nossas vigilias são abertas ao publico, estamos de braços abertos esperando por você.`,
    },
  ];

  constructor(private whatsAppService: WhatsAppService) {}

  public setCurrentIndexOpen(index: number) {
    if (this.currentIndexOpen === index) this.currentIndexOpen = undefined;
    else this.currentIndexOpen = index;
  }

  public sendPartnerMessage() {
    const message = `Olá, gostaria de me tornar um parceiro do projeto!`;
    this.whatsAppService.sendMessage(CONTACT_PHONE_NUMBERS.principal, message);
  }

  public sendVoluntaryMessage() {
    const message = `Olá, gostaria de me tornar um voluntário do projeto!`;
    this.whatsAppService.sendMessage(CONTACT_PHONE_NUMBERS.principal, message);
  }

  public sendMessage() {
    const message = `Olá, gostaria de entrar em contato`;
    this.whatsAppService.sendMessage(CONTACT_PHONE_NUMBERS.principal, message);
  }
}
