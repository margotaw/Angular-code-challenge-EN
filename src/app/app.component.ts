import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VehicleService } from './services/vehicle.service';
import { type } from './models/vehicle-interface';
import { KentekenCheck } from 'rdw-kenteken-check';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {
  public vehicleTypeData: type[] = [];
  public vehicleSubTypeData: type[] | undefined = [];
  public vehicleImage: string | undefined = undefined;
  public selectedVehicleType: string | undefined = '';
  public errorMsg: string = ''
  public form: FormGroup;
  private vehicleTypeDataSubscription: Subscription | null = null;
  private vehicleSubTypeDataSubscription: Subscription| null = null

  @ViewChild('kenteken') inputElmRef!: ElementRef;
  @ViewChild('errorKenteken') outputElmRef!: ElementRef;
  constructor(private fb: FormBuilder, private vehicleService: VehicleService) {
    // The code here is good to do in ngOnInit keeping because of strict types

    this.form = this.fb.group({
      vehicleType: ['', Validators.required],
      vehicleSubType: ['', Validators.required],
      licensePlateNumber: ['', Validators.required]
    });
  }

  /**
   * Angular lifcycle used to call related services when initialize
  *
  */

 ngOnInit(): void {
   this.vehicleService.getVehicleData().subscribe();
   // we don't need observable here just can write a method and get sub type
   // as im not using ngRx just want to replicate behavior with rxjs
   this.vehicleTypeDataSubscription = this.vehicleService.vehicleTypeData$.subscribe(vehicleTypeData => {
     this.vehicleTypeData = vehicleTypeData;
   })

   this.vehicleSubTypeDataSubscription = this.vehicleService.vehicleSubTypeData$.subscribe(subVehicleTypeData => {
     this.vehicleSubTypeData = subVehicleTypeData;
   })
  }

  /**
   * Angular lifcycle used to check
   * initial validation of license plate
   * after the elements are available to the view
   *
   */
  ngAfterViewChecked(): void {
    this.validateLicensePlateNumber(this.form.get('licensePlateNumber')?.value);
  }

  /**
   * onVehicleTypeChange method check if vehicle
   * type changed and will do update in service
   * based on the update value the subTypes will show.
   * @param {string} value
   *
   */
  public onVehicleTypeChange(value: string): void {
    this.selectedVehicleType = value;
    this.vehicleSubTypeData = undefined;
    this.vehicleImage = `./assets/${value}.jpg`;
     this.vehicleService.updateVehicleType(value);
  }

  /**
   * Submit method check if the form is valid.
   * if not it throws error message.
   *
   */
  public onSubmit(): void {
    if (this.form.invalid) {
      this.errorMsg = 'Vul alle waardes correct in.';
    } else {
      this.errorMsg = '';
    }

    console.log('final form value', this.form.value);
  }

  /**
   * validateLicensePlateNumber check the vehicle has valid number Plate.
   *
   * @param {string} licensePlateNumber
   *
   */
  validateLicensePlateNumber(licensePlateNumber: string): void {
    const kentekenCheck = new KentekenCheck(licensePlateNumber, this.inputElmRef.nativeElement, this.outputElmRef.nativeElement, 'valid', `<div class="font-bold">Oeps, het ingevoerde kenteken is niet geldig.</div>
        <div class="block sm:inline">Gebruik het volgende formaat AA-12-BB.`);
     kentekenCheck.arrRegEx.push(
        '^([ABDFGHJKLMNPRSTVWXYZ]{2})([0-9]{2})([ABDFGHJKLMNPRSTVWXYZ]{2})$',
        '^([0-9]{2})([ABDFGHJKLMNPRSTVWXZ]{2})([ABDFGHJKLMNPRSTVWXZ]{2})$',
     );
    kentekenCheck.formatLicense();


    if (kentekenCheck.valid) {
      this.outputElmRef.nativeElement.style.display = 'none';
    } else {
      this.outputElmRef.nativeElement.style.display = 'block';
      const control = this.form.get('licensePlateNumber');
      control?.setValue('');
    }
    kentekenCheck.bindInputListener();
    }

    /**
    * Angular lifeCycle used for the destroy of subscriptions
    */
    ngOnDestroy(): void {
      this.vehicleSubTypeDataSubscription?.unsubscribe();
      this.vehicleTypeDataSubscription?.unsubscribe();
    }
}
