import { Component } from '@angular/core';
import { IPartnerItem } from '../../../../@shared/interface/partner.interface';
import { PortalCardPartnerComponent } from '../../../components/portal-card-partner/portal-card-partner.component';

@Component({
  standalone: true,
  selector: 'portal-home-partner',
  imports: [PortalCardPartnerComponent],
  styleUrl: './home-partner.component.scss',
  templateUrl: './home-partner.component.html',
})
export class HomePartnerComponent {
  public item: IPartnerItem = {
    id: '',
    name: 'Teste',
    email: 'teste@teste.com',
    active: true,
    imageURL:
      'https://file-inpeace-prod.inpeaceapp.com/6414b7c17889a213335109.jpeg',
    telephone: '',
    portfolioURL:
      'https://file-inpeace-prod.inpeaceapp.com/6414b7c17889a213335109.jpeg',
    creationDate: new Date(),
    category: '1',
    occupationDescription: 'Ocupação',
    userCreator: '',
  };

  public parters = [this.item, this.item, this.item];
}
