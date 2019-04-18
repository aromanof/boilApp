import { Injectable, ErrorHandler, TemplateRef, NgZone } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NotificationsService } from 'angular2-notifications';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AlertService implements ErrorHandler {
  public constructor(
      private notifier: NotifierService,
      private notificationsService: NotificationsService,
      private snackBar: MatSnackBar,
      private zone: NgZone,
  ) { }

  /**
   * Error handler.
   * Alert an error if there is one.
   * @param error
   * @returns {null}
   */
  handleError = (error: any) => {
    this.notifier.notify('error', `Ошибка! ${error.message || error}`);
    return null;
  }

  /**
   * Checks if there is no errors in the response body.
   * Alert an error if there is one.
   * @param response
   */
  public responseHasNoErrors(response: any): boolean {
    const errorText = this.getResponseErrorText(response);
    if (errorText.length) {
      this.notifier.notify( 'error', `Ошибка! ${errorText}`);
      return false;
    } else {
      return true;
    }
  }

  /**
   * Getting response text
   */
  public getResponseErrorText(response: any): string {
    if (response.error && response.error.message) {
      return response.error.message;
    } else {
      return '';
    }
  }

  /**
   * Showing new message
   * @param {string} message
   */
  public showDefaultMessage(message: string): void {
    this.notifier.notify('default', message);
  }

  public showErrorMessage(message: string): void {
    this.notifier.notify('error', message);
  }

  public showSuccessMessage(message: string): void {
    this.notifier.notify('success', message);
  }

  public showInfoMessage(message: string): void {
    this.notifier.notify('info', message);
  }

  /* Notifications Service */

  public showCustomNotification(customNotification: TemplateRef<any>, override?: object): void {
    this.notificationsService.html(customNotification, null, override);
  }

  /**
   * For inexplicable reasons, snackBar works incorrectly on event map valuation page!
   * @param message
   * @param actionText
   * @param callback
   * @param args
   */
  public showNotificationWithAction(message: string, actionText: string, callback: Function, ...args: any): void {
    this.zone.run(() => {
      setTimeout(() => {
        const snackBar = this.snackBar.open(message, actionText, {
          verticalPosition: 'bottom',
          duration: 3000,
          horizontalPosition: 'center',
        });
        snackBar.onAction().subscribe(() => {
          callback(...args);
        });
      }, 200);
    });
  }
}
