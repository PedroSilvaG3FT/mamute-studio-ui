import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChange,
  inject,
} from '@angular/core';
import { SeedStore } from '../../../../store/seed.store';
import { AlertService } from '../../../@core/services/alert.service';
import { ObjectUtil } from '../../../@core/util/object.util';
import {
  IPartnerDB,
  IPartnerItem,
} from '../../../@shared/interface/partner.interface';
import { DatabaseService } from '../../../@shared/services/database.service';

@Component({
  imports: [],
  standalone: true,
  selector: 'admin-partner-selection',
  styleUrl: './admin-partner-selection.component.scss',
  templateUrl: './admin-partner-selection.component.html',
})
export class AdminPartnerSelectionComponent {
  @Input() title: string = 'Selecione os patrocinadores';
  @Input() selectedIds: string[] = [];

  @Output() onChange = new EventEmitter();

  public partners: IPartnerItem[] = [];
  public seedStore = inject(SeedStore);

  constructor(
    private alertService: AlertService,
    private databaseService: DatabaseService
  ) {}

  get getCategory() {
    return (category: string) => {
      const item = this.seedStore
        .partnerCategoriesOptions()
        .find(({ value }) => value === category);

      return item?.label || '--';
    };
  }

  get isSelected() {
    return (id?: string) => this.selectedIds.includes(String(id));
  }

  ngOnInit() {
    this.getPartners();
  }

  ngOnChanges(changes: SimpleChange) {
    console.log(changes);
  }

  public setLoading(value: boolean) {}

  public getPartners() {
    this.setLoading(true);

    this.databaseService.partner
      .getAll<IPartnerDB[]>()
      .then((response) => {
        this.partners = this.databaseService._model.partner.buildList(response);
      })
      .catch((error) => this.alertService.snackDefaultResponseError(error))
      .finally(() => this.setLoading(false));
  }

  public handleTogglePartner({ id }: IPartnerItem) {
    let list = ObjectUtil.clone(this.selectedIds);

    if (!this.isSelected(id)) list.push(String(id));
    else list = list.filter((item) => item !== id);

    this.onChange.emit(list);
  }
}
