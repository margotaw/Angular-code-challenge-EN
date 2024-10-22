import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { VehicleFormComponent } from './vehicle-form.component';
import { VehicleTypeEnum } from '../main-type-enum';
import { autoSubtypes, motorSubtypes, vehicles } from '../../vehicle-subtype';

describe('VehicleFormComponent', () => {
  let component: VehicleFormComponent;
  let fixture: ComponentFixture<VehicleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [VehicleFormComponent],
      providers: [FormBuilder]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the form with default values', () => {
    expect(component.vehicleForm).toBeTruthy();
    expect(component.vehicleForm.get('vehicleType')?.value).toBe('');
    expect(component.vehicleForm.get('subtype')?.value).toBe('');
    expect(component.vehicleForm.get('licensePlate')?.value).toBe('');
  });

  it('should update vehicle image based on vehicle type', () => {
    component.updateVehicleImage(VehicleTypeEnum.Auto);
    expect(component.vehicleImage).toBe('./assets/auto.jpg');

    component.updateVehicleImage(VehicleTypeEnum.Motor);
    expect(component.vehicleImage).toBe('./assets/motor.jpg');

    component.updateVehicleImage(VehicleTypeEnum.Scooter);
    expect(component.vehicleImage).toBe('./assets/scooter.jpg');

    component.updateVehicleImage('Unknown');
    expect(component.vehicleImage).toBe('./assets/auto.jpg');
  });

  it('should get subtypes based on vehicle type', () => {
    expect(component.getSubtypes(VehicleTypeEnum.Auto)).toEqual(autoSubtypes);
    expect(component.getSubtypes(VehicleTypeEnum.Motor)).toEqual(motorSubtypes);
    expect(component.getSubtypes(VehicleTypeEnum.Scooter)).toEqual([]);
    expect(component.getSubtypes('Unknown')).toEqual([]);
  });

  it('should update current license plate value', () => {
    const licensePlate = 'ABC123';
    component.onLicensePlateChange(licensePlate);
    expect(component.currentLicensePlate).toBe(licensePlate);
  });

  it('should update subtypes and form validators on vehicle change', () => {
    component.onVehicleChange({ target: { value: VehicleTypeEnum.Auto } } as unknown as Event);
    expect(component.subtypes).toEqual(autoSubtypes);
    expect(component.vehicleForm.get('subtype')?.validator).toBeTruthy();
    expect(component.vehicleForm.get('subtype')?.errors).toBeNull();

    component.onVehicleChange({ target: { value: VehicleTypeEnum.Scooter } } as unknown as Event);
    expect(component.subtypes).toEqual([]);
    expect(component.vehicleForm.get('subtype')?.validator).toBeNull();
  });

  it('should call onSubmit method', () => {
    spyOn(component, 'onSubmit');
    component.onSubmit();
    expect(component.onSubmit).toHaveBeenCalled();
  });
});
