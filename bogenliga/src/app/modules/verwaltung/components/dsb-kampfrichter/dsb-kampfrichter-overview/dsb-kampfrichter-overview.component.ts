import {Component, OnInit} from '@angular/core';
import {DSB_KAMPFRICHTER_OVERVIEW_CONFIG} from './dsb-kampfrichter-overview.config';
import {DsbKampfrichterDataProviderService} from '../../../services/dsb-kampfrichter-data-provider.service';
import {TableRow} from '../../../../shared/components/tables/types/table-row.class';
import {CommonComponent} from '../../../../shared/components/common';
import {Response} from '../../../../shared/data-provider';
import {DsbKampfrichterDTO} from '../../../types/datatransfer/dsb-kampfrichter-dto.class';
import {VersionedDataObject} from '../../../../shared/data-provider/models/versioned-data-object.interface';
import {Router} from '@angular/router';
import {
  Notification,
  NotificationOrigin,
  NotificationService,
  NotificationSeverity,
  NotificationType,
  NotificationUserAction
} from '../../../../shared/services/notification';
import {hideLoadingIndicator, showDeleteLoadingIndicatorIcon, toTableRows} from '../../../../shared/components/tables';

export const NOTIFICATION_DELETE_DSB_KAMPFRICHTER = 'dsb_kampfrichter_overview_delete';

@Component({
  selector:    'bla-dsb-kampfrichter-overview',
  templateUrl: './dsb-kampfrichter-overview.component.html',
  styleUrls:   ['./dsb-kampfrichter-overview.component.scss']
})
export class DsbKampfrichterOverviewComponent extends CommonComponent implements OnInit {

  public config = DSB_KAMPFRICHTER_OVERVIEW_CONFIG;
  public rows: TableRow[];

  constructor(private dsbKampfrichterDataProvider: DsbKampfrichterDataProviderService, private router: Router, private notificationService: NotificationService) {
    super();
  }

  ngOnInit() {
    this.loadTableRows();
  }

  public onView(versionedDataObject: VersionedDataObject): void {
    this.navigateToDetailDialog(versionedDataObject);

  }

  public onEdit(versionedDataObject: VersionedDataObject): void {
    this.navigateToDetailDialog(versionedDataObject);
  }

  public onDelete(versionedDataObject: VersionedDataObject): void {
    // show loading icon
    const id = versionedDataObject.id;

    this.rows = showDeleteLoadingIndicatorIcon(this.rows, id);

    const notification: Notification = {
      id:               NOTIFICATION_DELETE_DSB_KAMPFRICHTER + id,
      title:            'MANAGEMENT.DSBKAMPFRICHTER.NOTIFICATION.DELETE.TITLE',
      description:      'MANAGEMENT.DSBKAMPFRICHTER.NOTIFICATION.DELETE.DESCRIPTION',
      descriptionParam: '' + id,
      severity:         NotificationSeverity.QUESTION,
      origin:           NotificationOrigin.USER,
      type:             NotificationType.YES_NO,
      userAction:       NotificationUserAction.PENDING
    };

    this.notificationService.observeNotification(NOTIFICATION_DELETE_DSB_KAMPFRICHTER + id)
        .subscribe(myNotification => {
          if (myNotification.userAction === NotificationUserAction.ACCEPTED) {
            this.dsbKampfrichterDataProvider.deleteById(id)
                .then(response => this.loadTableRows())
                .catch(response => this.rows = hideLoadingIndicator(this.rows, id));
          }
        });

    this.notificationService.showNotification(notification);

  }

  private loadTableRows() {
    this.loading = true;

    this.dsbKampfrichterDataProvider.findAll()
        .then((response: Response<DsbKampfrichterDTO[]>) => this.handleLoadTableRowsSuccess(response))
        .catch((response: Response<DsbKampfrichterDTO[]>) => this.handleLoadTableRowsFailure(response));
  }

  private navigateToDetailDialog(versionedDataObject: VersionedDataObject) {
    this.router.navigateByUrl('/verwaltung/dsbkampfrichter/' + versionedDataObject.id);
  }

  private handleLoadTableRowsFailure(response: Response<DsbKampfrichterDTO[]>): void {
    this.rows = [];
    this.loading = false;
  }

  private handleLoadTableRowsSuccess(response: Response<DsbKampfrichterDTO[]>): void {
    this.rows = []; // reset array to ensure change detection
    this.rows = toTableRows(response.payload);
    this.loading = false;
  }
}
