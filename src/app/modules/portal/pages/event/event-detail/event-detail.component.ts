import { DatePipe } from '@angular/common';
import {
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingStore } from '../../../../../store/loading.store';
import { AlertService } from '../../../../@core/services/alert.service';
import {
  IEventDB,
  IEventItem,
} from '../../../../@shared/interface/event.interface';
import { DatabaseService } from '../../../../@shared/services/database.service';

@Component({
  standalone: true,
  imports: [DatePipe],
  selector: 'portal-event-detail',
  styleUrl: './event-detail.component.scss',
  templateUrl: './event-detail.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class EventDetailComponent {
  @ViewChild('mapContainer', { static: true }) mapContainer:
    | ElementRef
    | undefined;

  public eventId = signal('');
  public event: IEventItem = {} as IEventItem;

  public loadingStore = inject(LoadingStore);

  constructor(
    private renderer: Renderer2,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private databaseService: DatabaseService
  ) {}

  ngOnInit() {
    this.eventId.set(this.activatedRoute.snapshot.params['id']);
    this.getEvent();
  }

  public getEvent() {
    this.loadingStore.setState(true);
    this.databaseService.event
      .getById<IEventDB>(this.eventId())
      .then((response) => {
        this.event = this.databaseService._model.event.buildItem(response);

        if (this.mapContainer) {
          this.renderer.setProperty(
            this.mapContainer.nativeElement,
            'innerHTML',
            this.event.addressMapHTML
          );
        }
        console.log('GET EVENT', this.event);
      })
      .catch((error) => this.alertService.snackDefaultResponseError(error))
      .finally(() => this.loadingStore.setState(false));
  }
}
