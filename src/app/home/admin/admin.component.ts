import { Component, OnInit } from '@angular/core';
import { finalize, first } from 'rxjs/operators';
import { ApiService } from '../../shared/services/api.service';
import { AlertService } from '../../shared/services/alert.service';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { CoefInterfaceTask1, CoefInterfaceTask3 } from '../../shared/interfaces/coefInterfaceTask1';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {
  coefsTask1: CoefInterfaceTask1;
  coefsTask3: CoefInterfaceTask3;

  coef1Form: FormGroup;
  coef3Form: FormGroup;
  coefsLoading = new BehaviorSubject<boolean>(false);

  constructor(
    private api: ApiService,
    private alert: AlertService,
  ) {
  }

  ngOnInit() {
    this.getCalculationsCoefficients();
  }

  getCalculationsCoefficients(): void {
    combineLatest(this.api.getCalculationsCoefficientsTask1(), this.api.getCalculationsCoefficientsTask3()).pipe(
      finalize(() => this.coefsLoading.next(false))
    ).subscribe(
      ([coefs1, coefs3]) => {
        this.coefsTask1 = coefs1;
        this.coefsTask3 = coefs3;
        this.createCalculationFormTask1(coefs1);
        this.createCalculationFormTask3(coefs3);
      },
      this.alert.handleError,
    );
  }

  task1DisableChanged(event: MatSlideToggleChange): void {
    this.api.updateDisabledValueTask1(event.checked).pipe(first()).subscribe(
      () => this.alert.showSuccessMessage('Данные успешно обновлены'),
      error => this.alert.handleError(error.error),
    )
  }

  task3DisableChanged(event: MatSlideToggleChange): void {
    this.api.updateDisabledValueTask3(event.checked).pipe(first()).subscribe(
      () => this.alert.showSuccessMessage('Данные успешно обновлены'),
      error => this.alert.handleError(error.error),
    )
  }

  updateTask1(): void {
    this.api.updateCoeficientsTask1(this.formCoefsObject(this.coef1Form)).pipe(first())
      .subscribe(
        () => {
          this.alert.showSuccessMessage('Данные успешно обновлены');
          this.coef1Form.markAsPristine();
        },
        error => this.alert.handleError(error.error),
      )
  }

  updateTask3(): void {
    this.api.updateCoeficientsTask3(this.formCoefsObject(this.coef3Form)).pipe(first())
      .subscribe(
        () => {
          this.alert.showSuccessMessage('Данные успешно обновлены');
          this.coef3Form.markAsPristine();
        },
        error => this.alert.handleError(error.error),
      )
  }

  private createCalculationFormTask1(coefs: CoefInterfaceTask1): void {
    this.coef1Form = new FormGroup({
      G1: new FormControl({value: coefs.G1, disabled: false}, Validators.required),
      G2: new FormControl({value: coefs.G2, disabled: false}, Validators.required),
      T1: new FormControl({value: coefs.T1, disabled: false}, Validators.required),
      T2: new FormControl({value: coefs.T2, disabled: false}, Validators.required),
      Phi1: new FormControl({value: coefs.Phi1, disabled: false}, Validators.required),
      Phi2: new FormControl({value: coefs.Phi2, disabled: false}, Validators.required),
    })
  }

  private createCalculationFormTask3(coefs: CoefInterfaceTask3): void {
    this.coef3Form = new FormGroup({
      T1_1: new FormControl({value: coefs.T1_1, disabled: false}, Validators.required),
      T1_2: new FormControl({value: coefs.T1_2, disabled: false}, Validators.required),
      T2_1: new FormControl({value: coefs.T2_1, disabled: false}, Validators.required),
      T2_2: new FormControl({value: coefs.T2_2, disabled: false}, Validators.required),
      I1: new FormControl({value: coefs.I1, disabled: false}, Validators.required),
      I2: new FormControl({value: coefs.I2, disabled: false}, Validators.required),
      L: new FormControl({value: coefs.L, disabled: false}, Validators.required),
      S: new FormControl({value: coefs.S, disabled: false}, Validators.required),
      V: new FormControl({value: coefs.V, disabled: false}, Validators.required),
      d: new FormControl({value: coefs.d, disabled: false}, Validators.required),
    });
  }

  formCoefsObject(form: FormGroup): any {
    const coefsObject = {};
    Object.keys(form.controls).forEach(key => {
      coefsObject[key] = form.get(key).value;
    });
    return coefsObject;
  }
}
