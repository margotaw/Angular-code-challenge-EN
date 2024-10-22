import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { VehicleSubTypeComponent } from './vehicle-sub-type.component';
import { VehicleTypeEnum } from '../main-type-enum';
import { autoSubtypes, motorSubtypes } from 'src/app/vehicle-subtype';

describe('VehicleSubTypeComponent', () => {
  let component: VehicleSubTypeComponent;
  let fixture: ComponentFixture<VehicleSubTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [VehicleSubTypeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleSubTypeComponent);
    component = fixture.componentInstance;
    
    // Initialize the form group for testing
    component.vehicleForm = new FormGroup({
      subtype: new FormControl('')
    });
    
    component.subtypes = [];
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the subtype value in the form on selection', () => {
    const event = { target: { value: 'Car' } } as unknown as Event; 
    component.onSubTypeSelection(event);
    expect(component.vehicleForm.get('subtype')?.value).toBe('Car');
  });

  it('should return correct subtypes based on vehicle type', () => {
    expect(component.getSubtypes(VehicleTypeEnum.Auto)).toEqual(autoSubtypes);
    expect(component.getSubtypes(VehicleTypeEnum.Motor)).toEqual(motorSubtypes);
    expect(component.getSubtypes(VehicleTypeEnum.Scooter)).toEqual([]);
    expect(component.getSubtypes('Unknown')).toEqual([]);
  });

  it('should initialize with the correct subtypes if provided', () => {
    component.subtypes = autoSubtypes;
    expect(component.subtypes).toEqual(autoSubtypes);
  });
});
