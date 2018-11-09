import {Component, OnInit} from '@angular/core';
import {DSB_KAMPFRICHTER_DETAIL_CONFIG} from './dsb-kampfrichter-detail.config';
import {Response} from '../../../../shared/data-provider';
import {ButtonType, CommonComponent} from '../../../../shared/components';
import {DsbKampfrichterDataProviderService} from '../../../services/dsb-kampfrichter-data-provider.service';
import {ActivatedRoute, Router} from '@angular/router';
import {isNullOrUndefined, isUndefined} from 'util';
import {DsbKampfrichterDO} from '../../../types/dsb-kampfrichter-do.class';
import {
  Notification,
  NotificationOrigin,
  NotificationService,
  NotificationSeverity,
  NotificationType,
  NotificationUserAction
} from '../../../../shared/services/notification';

const ID_PATH_PARAM = 'id';
const NOTIFICATION_DELETE_DSB_KAMPFRICHTER = 'dsb_kampfrichter_detail_delete';
const NOTIFICATION_DELETE_DSB_KAMPFRICHTER_SUCCESS = 'dsb_kampfrichter_detail_delete_success';
const NOTIFICATION_DELETE_DSB_KAMPFRICHTER_FAILURE = 'dsb_kampfrichter_detail_delete_failure';
const NOTIFICATION_SAVE_DSB_KAMPFRICHTER = 'dsb_kampfrichter_detail_save';
const NOTIFICATION_UPDATE_DSB_KAMPFRICHTER = 'dsb_kampfrichter_detail_update';


@Component({
  selector:    'bla-dsb-kampfrichter-detail',
  templateUrl: './dsb-kampfrichter-detail.component.html',
  styleUrls:   ['./dsb-kampfrichter-detail.component.scss']
})
export class DsbKampfrichterDetailComponent extends CommonComponent implements OnInit {

  public config = DSB_KAMPFRICHTER_DETAIL_CONFIG;
  public ButtonType = ButtonType;
  public currentKampfrichter: DsbKampfrichterDO = new DsbKampfrichterDO();

  public deleteLoading = false;
  public saveLoading = false;

  constructor(private dsbKampfrichterDataProvider: DsbKampfrichterDataProviderService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService) {
    super();
  }

  ngOnInit() {
    this.loading = true;

    this.notificationService.discardNotification();

    this.route.params.subscribe(params => {
      if (!isUndefined(params[ID_PATH_PARAM])) {
        const id = params[ID_PATH_PARAM];
        if (id === 'add') {
          this.currentKampfrichter = new DsbKampfrichterDO();
          this.loading = false;
          this.deleteLoading = false;
          this.saveLoading = false;
        } else {
          this.loadById(params[ID_PATH_PARAM]);
        }
      }
    });
  }

  public onSave(ignore: any): void {
    this.saveLoading = true;

    // persist
    this.dsbKampfrichterDataProvider.create(this.currentKampfrichter)
        .then((response: Response<DsbKampfrichterDO>) => {
          if (!isNullOrUndefined(response)
            && !isNullOrUndefined(response.payload)
            && !isNullOrUndefined(response.payload.id)) {
            console.log('Saved with id: ' + response.payload.id);

            const notification: Notification = {
              id:          NOTIFICATION_SAVE_DSB_KAMPFRICHTER,
              title:       'MANAGEMENT.DSBKAMPFRICHTER_DETAIL.NOTIFICATION.SAVE.TITLE',
              description: 'MANAGEMENT.DSBKAMPFRICHTER_DETAIL.NOTIFICATION.SAVE.DESCRIPTION',
              severity:    NotificationSeverity.INFO,
              origin:      NotificationOrigin.USER,
              type:        NotificationType.OK,
              userAction:  NotificationUserAction.PENDING
            };

            this.notificationService.observeNotification(NOTIFICATION_SAVE_DSB_KAMPFRICHTER)
                .subscribe(myNotification => {
                  if (myNotification.userAction === NotificationUserAction.ACCEPTED) {
                    this.saveLoading = false;
                    this.router.navigateByUrl('/verwaltung/dsbkampfrichter/' + response.payload.id);
                  }
                });

            this.notificationService.showNotification(notification);
          }
        }, (response: Response<DsbKampfrichterDO>) => {
          console.log('Failed');
          this.saveLoading = false;


        });
    // show response message
  }

  public onUpdate(ignore: any): void {
    this.saveLoading = true;

    // persist
    this.dsbKampfrichterDataProvider.update(this.currentKampfrichter)
        .then((response: Response<DsbKampfrichterDO>) => {
          if (!isNullOrUndefined(response)
            && !isNullOrUndefined(response.payload)
            && !isNullOrUndefined(response.payload.id)) {

            const id = this.currentKampfrichter.id;

            const notification: Notification = {
              id:          NOTIFICATION_UPDATE_DSB_KAMPFRICHTER + id,
              title:       'MANAGEMENT.DSBKAMPFRICHTER_DETAIL.NOTIFICATION.SAVE.TITLE',
              description: 'MANAGEMENT.DSBKAMPFRICHTER_DETAIL.NOTIFICATION.SAVE.DESCRIPTION',
              severity:    NotificationSeverity.INFO,
              origin:      NotificationOrigin.USER,
              type:        NotificationType.OK,
              userAction:  NotificationUserAction.PENDING
            };

            this.notificationService.observeNotification(NOTIFICATION_UPDATE_DSB_KAMPFRICHTER + id)
                .subscribe(myNotification => {
                  if (myNotification.userAction === NotificationUserAction.ACCEPTED) {
                    this.saveLoading = false;
                    this.router.navigateByUrl('/verwaltung/dsbkampfrichter');
                  }
                });

            this.notificationService.showNotification(notification);
          }
        }, (response: Response<DsbKampfrichterDO>) => {
          console.log('Failed');
          this.saveLoading = false;
        });
    // show response message
  }

  public onDelete(ignore: any): void {
    this.deleteLoading = true;
    this.notificationService.discardNotification();

    const id = this.currentKampfrichter.id;

    const notification: Notification = {
      id:               NOTIFICATION_DELETE_DSB_KAMPFRICHTER + id,
      title:            'MANAGEMENT.DSBKAMPFRICHTER_DETAIL.NOTIFICATION.DELETE.TITLE',
      description:      'MANAGEMENT.DSBKAMPFRICHTER_DETAIL.NOTIFICATION.DELETE.DESCRIPTION',
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
                .then(response => this.handleDeleteSuccess(response))
                .catch(response => this.handleDeleteFailure(response));
          }
        });

    this.notificationService.showNotification(notification);
  }

  public entityExists(): boolean {
    return this.currentKampfrichter.id > 0;
  }

  private loadById(id: number) {
    this.dsbKampfrichterDataProvider.findById(id)
        .then((response: Response<DsbKampfrichterDO>) => this.handleSuccess(response))
        .catch((response: Response<DsbKampfrichterDO>) => this.handleFailure(response));
  }

  private handleSuccess(response: Response<DsbKampfrichterDO>) {
    this.currentKampfrichter = response.payload;
    this.loading = false;
  }

  private handleFailure(response: Response<DsbKampfrichterDO>) {
    this.loading = false;

  }

  private handleDeleteSuccess(response: Response<void>): void {

    const notification: Notification = {
      id:          NOTIFICATION_DELETE_DSB_KAMPFRICHTER_SUCCESS,
      title:       'MANAGEMENT.DSBKAMPFRICHTER_DETAIL.NOTIFICATION.DELETE_SUCCESS.TITLE',
      description: 'MANAGEMENT.DSBKAMPFRICHTER_DETAIL.NOTIFICATION.DELETE_SUCCESS.DESCRIPTION',
      severity:    NotificationSeverity.INFO,
      origin:      NotificationOrigin.USER,
      type:        NotificationType.OK,
      userAction:  NotificationUserAction.PENDING
    };

    this.notificationService.observeNotification(NOTIFICATION_DELETE_DSB_KAMPFRICHTER_SUCCESS)
        .subscribe(myNotification => {
          if (myNotification.userAction === NotificationUserAction.ACCEPTED) {
            this.router.navigateByUrl('/verwaltung/dsbkampfrichter');
            this.deleteLoading = false;
          }
        });

    this.notificationService.showNotification(notification);
  }

  private handleDeleteFailure(response: Response<void>): void {

    const notification: Notification = {
      id:          NOTIFICATION_DELETE_DSB_KAMPFRICHTER_FAILURE,
      title:       'MANAGEMENT.DSBKAMPFRICHTER_DETAIL.NOTIFICATION.DELETE_FAILURE.TITLE',
      description: 'MANAGEMENT.DSBKAMPFRICHTER_DETAIL.NOTIFICATION.DELETE_FAILURE.DESCRIPTION',
      severity:    NotificationSeverity.ERROR,
      origin:      NotificationOrigin.USER,
      type:        NotificationType.OK,
      userAction:  NotificationUserAction.PENDING
    };

    this.notificationService.observeNotification(NOTIFICATION_DELETE_DSB_KAMPFRICHTER_FAILURE)
        .subscribe(myNotification => {
          if (myNotification.userAction === NotificationUserAction.ACCEPTED) {
            this.deleteLoading = false;
          }
        });

    this.notificationService.showNotification(notification);
  }
}
