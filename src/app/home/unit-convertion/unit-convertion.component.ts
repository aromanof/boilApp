import { Component, OnInit } from '@angular/core';
import { UnitConvertionEnum } from '../../shared/enums/unit-convertion.enum';
import { SelectionChange } from '@angular/cdk/collections';
import { MatSelectChange } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CoefInterfaceTask1 } from '../../shared/interfaces/coefInterfaceTask1';

@Component({
  selector: 'app-unit-convertion',
  templateUrl: './unit-convertion.component.html',
  styleUrls: ['./unit-convertion.component.sass']
})
export class UnitConvertionComponent implements OnInit {
  private conversionModel;
  convertionForm: FormGroup;
  selectedSiValue = UnitConvertionEnum.Pa;
  selectedMkggsValue = '';
  unitConversionEnum = UnitConvertionEnum;
  siValues: Array<string>;
  mkgssValues: Array<string>;
  siQuantity: number = 1;
  mkgssQuantity;


  SIValues = [];
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createConvertionnForm();
    this.conversionModel = this.getUnitConvertionModel();
    this.siValues = this.getSiValues(this.conversionModel);
    this.mkgssValues = this.getMKGSSValuesBySiValue(this.conversionModel, this.selectedSiValue);
  }

  private createConvertionnForm(): void {
    this.convertionForm = new FormGroup({
      si: new FormControl('', Validators.required),
      mkggs: new FormControl(''),
    });
  }

  calculate(): void {
    const conversionValue = Number(this.getCoefficient(
      this.conversionModel,
      this.selectedSiValue,
      this.selectedMkggsValue,
    ) * this.siInputValue).toFixed(8);

    this.convertionForm.get('mkggs').setValue(conversionValue);
  }

  get siInputValue(): number {
    return this.convertionForm.get('si').value
  }

  getUnitConvertionModel() {
    return {
      [this.unitConversionEnum.Pa]: {
          [this.unitConversionEnum.NM2]: 1,
          [this.unitConversionEnum.KgsM2]: 0.101972,
          [this.unitConversionEnum.MmRtSt]: 0.0075,
          [this.unitConversionEnum.Bar]: Math.pow(10, -5),
          [this.unitConversionEnum.PPSqD]: 0.000145,
      },
      [this.unitConversionEnum.Dj]: {
        [this.unitConversionEnum.KgsM]: 0.101972,
        [this.unitConversionEnum.LsH]: 0.37764 * Math.pow(10, -6),
        [this.unitConversionEnum.wTH]: 0.27778 * Math.pow(10, -3),
        [this.unitConversionEnum.Kal]: 0.23885,
      },
      [this.unitConversionEnum.Wt]: {
        [this.unitConversionEnum.KalS]: 0.23885,
        [this.unitConversionEnum.KkalH]: 0.859845,
        [this.unitConversionEnum.PoundS]: 0.7375621492783,
        [this.unitConversionEnum.Ls]: 0.001341,
      },
    }
  }

  getSiValues(convertionModel: any): Array<string> {
    return Object.keys(convertionModel);
  }

  getMKGSSValuesBySiValue(convertionModel: any, SiValue: string) {
    return Object.keys(convertionModel[SiValue]);
  }

  onSiValueChange(event: MatSelectChange) {
    this.selectedSiValue = event.value;
    this.mkgssValues = this.getMKGSSValuesBySiValue(this.conversionModel, event.value);
    this.selectedMkggsValue = null;
    this.convertionForm.get('mkggs').setValue(null);
  }

  onMkggsValueChange(event: MatSelectChange) {
    this.selectedMkggsValue = event.value;
  }

  getCoefficient(convertionModel: any, SiValue: string, MkggsValue: string): number {
    return convertionModel[SiValue][MkggsValue];
  }

}
