import { Injectable } from '@angular/core';
import { DatabaseModel } from '../models/database.model';
import { EventAttendanceListService } from './event-attendance-list.service';
import { EventPartnerService } from './event-partner.service';
import { EventPhotoGalleryService } from './event-photo-gallery.service';
import { EventTestimonialService } from './event-testimonial.service';
import { EventTicketService } from './event-ticket.service';
import { EventService } from './event.service';
import { NewsCategoryService } from './news-category.service';
import { NewsPartnerService } from './news-partner.service';
import { NewsService } from './news.service';
import { PartnerAdvertinngService } from './partner-advertinng.service';
import { PartnerCategoryService } from './partner-category.service';
import { PartnerService } from './partner.service';
import { PrayerCategoryService } from './prayer-category.service';
import { PrayerWallService } from './prayer-wall.service';
import { ProductPhotoGalleryService } from './product-photo-gallery.service';
import { ProductSaleService } from './product-sale.service';
import { ProductService } from './product.service';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class DatabaseService {
  constructor(
    public _model: DatabaseModel,

    public news: NewsService,
    public user: UserService,
    public event: EventService,
    public partner: PartnerService,
    public product: ProductService,
    public prayerWall: PrayerWallService,
    public eventTicket: EventTicketService,
    public newsPartner: NewsPartnerService,
    public productSale: ProductSaleService,
    public newsCategory: NewsCategoryService,
    public eventPartner: EventPartnerService,
    public prayerCategory: PrayerCategoryService,
    public partnerCategory: PartnerCategoryService,
    public eventTestimonial: EventTestimonialService,
    public eventPhotoGallery: EventPhotoGalleryService,
    public partnerAdvertinng: PartnerAdvertinngService,
    public eventAttendanceList: EventAttendanceListService,
    public productPhotoGallery: ProductPhotoGalleryService
  ) {}
}
