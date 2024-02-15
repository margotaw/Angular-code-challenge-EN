import {Component, OnInit} from '@angular/core';
import {autoSubtypes, motorSubtypes, vehicles} from "./vehicle-subtype-select/vehicleSubtype";
import {AbstractControl, FormControl, FormGroup, ValidatorFn} from "@angular/forms";
import {KentekenCheck} from 'rdw-kenteken-check';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'assesment';
  vehicleForm: FormGroup;


  protected readonly vehicles = vehicles;
  protected readonly autoSubtypes = autoSubtypes;
  protected readonly motorSubtypes = motorSubtypes;


  ngOnInit(): void {
    this.vehicleForm = new FormGroup({
      vehicle: new FormControl('Auto'),
      subtype: new FormControl(''),
      licensePlate: new FormControl('', [this.licensePlateValidator()])
    });

    this.licensePlate?.valueChanges.subscribe((value) => {
      const kentekenCheck = new KentekenCheck(value);
      kentekenCheck.formatLicense();

      if (kentekenCheck.valid) {
        const newKenteken = kentekenCheck.newStr;
        if (newKenteken != value) {
          this.licensePlate?.setValue(kentekenCheck.newStr);
        }
      }
    })
  }

  get licensePlate() {
    return this.vehicleForm.get('licensePlate');
  }

  private licensePlateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const kentekenCheck = new KentekenCheck(control.value);
      kentekenCheck.formatLicense();

      return kentekenCheck.valid ? null : {'invalidLicensePlate': true};
    };
  }

  onSubmit() {
    //no backend,so I'll leave submit like this
    console.warn(this.vehicleForm.value)
  }

}
