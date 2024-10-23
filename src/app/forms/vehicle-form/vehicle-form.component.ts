// vehicle-form.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KentekenCheck } from 'rdw-kenteken-check';
import { autoSubtypes, motorSubtypes, vehicles } from '../../vehicle-subtype';
import { VehicleTypeEnum } from '../main-type-enum';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
})
export class VehicleFormComponent {
  vehicleForm: FormGroup;
  vehicleImage: string = './assets/auto.jpg';
  protected readonly vehicles = vehicles;
  protected readonly autoSubtypes = autoSubtypes;
  protected readonly motorSubtypes = motorSubtypes;
  subtypes!: string[];
  invalidLicensePlate: any;
  currentLicensePlate: string = '';
  

  constructor(private fb: FormBuilder) {
    this.vehicleForm = this.fb.group({
      vehicleType: ['', Validators.required],
      subtype: ['', Validators.required],
      licensePlate: ['', Validators.required],
    });
  }

  onLicensePlateChange(value: string) {
    this.currentLicensePlate = value;
    console.log('Current License Plate:', this.currentLicensePlate);
  }

  onVehicleChange(event: Event) {
    const vehicleType = (event.target as HTMLSelectElement).value;
    this.updateVehicleImage(vehicleType);
    this.subtypes = this.getSubtypes(vehicleType);
    this.updateVehicleSubtype();
  }
  
  getSubtypes(type: string): string[] {
    switch (type.toLocaleLowerCase()) {
      case VehicleTypeEnum.Auto:
        return autoSubtypes;
      case VehicleTypeEnum.Motor:
        return motorSubtypes;
      case VehicleTypeEnum.Scooter:
        return [];
      default:
        return [];
    }
  }

  private updateVehicleSubtype() {
    this.vehicleForm.get('vehicleSubtype')?.setValue(this.subtypes);
    const validators = this.subtypes.length > 0 ? [Validators.required] : [];
    this.vehicleForm.get('vehicleSubtype')?.setValidators(validators);
    this.vehicleForm.get('vehicleSubtype')?.updateValueAndValidity();
  }
   updateVehicleImage(vehicleType: string) {
    //instead of creating new component with ngIf according to switch case I will use switch cases
    // Also this can be dynamic as well 
    switch (vehicleType.toLocaleLowerCase()) {
      case VehicleTypeEnum.Auto:
        this.vehicleImage = './assets/auto.jpg';
        break;
      case VehicleTypeEnum.Motor:
        this.vehicleImage = './assets/motor.jpg';
        break;
      case VehicleTypeEnum.Scooter:
        this.vehicleImage = './assets/scooter.jpg';
        break;
      default:
        this.vehicleImage = './assets/auto.jpg';
    }
  }

  

  onSubmit() {
  }
}
