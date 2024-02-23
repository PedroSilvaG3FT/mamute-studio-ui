import { Injectable } from '@angular/core';
import { CONTACT_PHONE_NUMBERS } from '../../@shared/constants/contact-phone.constant';

@Injectable({ providedIn: 'root' })
export class WhatsAppService {
  public sendMessage(
    phone: string = CONTACT_PHONE_NUMBERS.principal,
    message: string = `Olá gostaria de saber mais sobre o Mamute Studio`
  ) {
    window.open(
      `http://api.whatsapp.com/send?phone=${phone}&text=${message}`,
      '_blank'
    );
  }
}
