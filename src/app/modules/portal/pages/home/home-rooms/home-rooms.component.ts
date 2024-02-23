import { Component, inject } from '@angular/core';
import { WhatsAppService } from '../../../../@core/services/whatsapp.service';
import { ROOMS_DATA } from '../../../data/rooms.data';

@Component({
  imports: [],
  standalone: true,
  selector: 'portal-home-rooms',
  styleUrl: './home-rooms.component.scss',
  templateUrl: './home-rooms.component.html',
})
export class HomeRoomsComponent {
  public rooms = ROOMS_DATA;
  public whatsAppService = inject(WhatsAppService);

  public handleOpenWhatsapp() {
    this.whatsAppService.sendMessage();
  }
}
