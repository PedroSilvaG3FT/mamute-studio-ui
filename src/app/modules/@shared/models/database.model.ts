import { Injectable } from '@angular/core';
import { EventAttendanceListModel } from './event-attendance-list.model';
import { EventPartnerModel } from './event-partner.model';
import { EventPhotoGalleryModel } from './event-photo-gallery.model';
import { EventTestimonialModel } from './event-testimonial.model';
import { EventModel } from './event.model';
import { NewsPartnerModel } from './news-partner.model';
import { NewsModel } from './news.model';
import { PartnerAdvertinngModel } from './partner-advertinng.model';
import { PartnerCategoryModel } from './partner-category.model';
import { PartnerModel } from './partner.model';
import { PrayerCategoryModel } from './prayer-category.model';
import { PrayerWallModel } from './prayer-wall.model';
import { ProductPhotoGalleryModel } from './product-photo-gallery.model';
import { ProductSaleModel } from './product-sale.model';
import { ProductModel } from './product.model';
import { UserModel } from './user.model';

@Injectable({ providedIn: 'root' })
export class DatabaseModel {
  constructor(
    public news: NewsModel,
    public user: UserModel,
    public event: EventModel,
    public partner: PartnerModel,
    public product: ProductModel,
    public prayerWall: PrayerWallModel,
    public newsPartner: NewsPartnerModel,
    public productSale: ProductSaleModel,
    public eventPartner: EventPartnerModel,
    public prayerCategory: PrayerCategoryModel,
    public partnerCategory: PartnerCategoryModel,
    public eventTestimonial: EventTestimonialModel,
    public eventPhotoGallery: EventPhotoGalleryModel,
    public partnerAdvertinng: PartnerAdvertinngModel,
    public eventAttendanceList: EventAttendanceListModel,
    public productPhotoGallery: ProductPhotoGalleryModel
  ) {}
}
