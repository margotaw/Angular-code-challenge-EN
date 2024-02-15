import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-vehicle-photo',
  templateUrl: './vehicle-photo.component.html',
})
export class VehiclePhotoComponent {
  @Input() vehicle: string | null | undefined;
}
