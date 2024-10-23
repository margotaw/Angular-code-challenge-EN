import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { KentekenCheck } from 'rdw-kenteken-check';

@Component({
  selector: 'app-license-plate',
  templateUrl: './license-plate.component.html',
  styleUrls: ['./license-plate.component.css']
})
export class LicensePlateComponent implements OnInit {
  invalidLicensePlate: boolean = false;
  @Input() vehicleForm!: FormGroup;
  formattedValue: string = '';

  constructor() { }

  ngOnInit(): void {
  }
 
  formatLicensePlate(alphanumeric: string): string {
    // Check for combinations of letters and numbers (e.g., S007JB or AA14BB)
    if (/[A-Z]/.test(alphanumeric) && /\d/.test(alphanumeric)) {
      return alphanumeric.replace(/([A-Z]+)(\d+)([A-Z]+)/, '$1-$2-$3');
    }

    // Check for 4-letter combinations (e.g., 12AABB)
    if (/^\d{2}[A-Z]{4}$/.test(alphanumeric)) {
      return `${alphanumeric.slice(0, 2)}-${alphanumeric.slice(2, 4)}-${alphanumeric.slice(4)}`;
    }
    
    return alphanumeric; // Return the original if it doesn't match known patterns
  }

  onLicensePlateBlur(event: Event) {
    const licensePlateValue = (event.target as HTMLInputElement).value; // Changed to HTMLInputElement
    this.formattedValue = this.formatLicensePlate(licensePlateValue);
    this.vehicleForm.get('licensePlate')?.setValue(this.formattedValue);

    const kentekenCheck = new KentekenCheck(this.formattedValue);
    kentekenCheck.formatLicense(); 
    this.invalidLicensePlate = !kentekenCheck.valid; 
    if (this.invalidLicensePlate) {
      this.vehicleForm.get('licensePlate')?.setErrors({ invalid: true });
    }
  }
}
