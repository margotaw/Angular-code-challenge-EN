import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { LicensePlateComponent } from './license-plate.component';
import { KentekenCheck } from 'rdw-kenteken-check';

describe('LicensePlateComponent', () => {
  let component: LicensePlateComponent;
  let fixture: ComponentFixture<LicensePlateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LicensePlateComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensePlateComponent);
    component = fixture.componentInstance;
    component.vehicleForm = new FormGroup({
      licensePlate: new FormControl('')
    });
    fixture.detectChanges();
  });

  describe('formatLicensePlate', () => {
    it('should format S007JB to S-007-JB', () => {
      const result = component.formatLicensePlate('S007JB');
      expect(result).toBe('S-007-JB');
    });

    it('should format 12AABB to 12-AA-BB', () => {
      const result = component.formatLicensePlate('12AABB');
      expect(result).toBe('12-AA-BB');
    });

    it('should return the original value if it does not match known patterns', () => {
      const result = component.formatLicensePlate('INVALID');
      expect(result).toBe('INVALID');
    });
  });

  describe('onLicensePlateBlur', () => {
    it('should format license plate and set the form value', () => {
      const event = { target: { value: 'S007JB' } } as unknown as Event;
      component.onLicensePlateBlur(event);
      expect(component.formattedValue).toBe('S-007-JB');
      expect(component.vehicleForm.get('licensePlate')?.value).toBe('S-007-JB');
    });

    it('should set invalidLicensePlate to true for an invalid license plate', () => {
      spyOn(KentekenCheck.prototype, 'formatLicense').and.callFake(() => 'S-007-JB'); // Return a string
      const event = { target: { value: 'INVALID' } } as unknown as Event;
      component.onLicensePlateBlur(event);
      expect(component.invalidLicensePlate).toBe(true);
      expect(component.vehicleForm.get('licensePlate')?.errors).toEqual({ invalid: true });
    });

    it('should set invalidLicensePlate to false for a valid license plate', () => {
      spyOn(KentekenCheck.prototype, 'formatLicense').and.callFake(() => 'S-007-JB'); 
      const event = { target: { value: 'S007JB' } } as unknown as Event;
      component.onLicensePlateBlur(event);
      expect(component.invalidLicensePlate).toBe(false);
      expect(component.vehicleForm.get('licensePlate')?.errors).toBeNull();
    });
  });
});
