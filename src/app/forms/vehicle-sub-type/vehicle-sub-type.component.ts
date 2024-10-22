import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { autoSubtypes, motorSubtypes } from 'src/app/vehicle-subtype';
import { VehicleTypeEnum } from '../main-type-enum';

@Component({
  selector: 'app-vehicle-sub-type',
  templateUrl: './vehicle-sub-type.component.html',
  styleUrls: ['./vehicle-sub-type.component.css']
})
export class VehicleSubTypeComponent implements OnInit {
  @Input() vehicleForm!: FormGroup;
  @Input() subtypes!: string[];
  constructor() { }

  ngOnInit(): void {
  }
  onSubTypeSelection(event : Event)
  {
    const subTypeValue = (event.target as HTMLSelectElement).value;
    this.vehicleForm.get('subtype')?.setValue(subTypeValue);
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
}
