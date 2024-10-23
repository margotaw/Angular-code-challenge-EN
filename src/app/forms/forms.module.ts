import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { VehicleSubTypeComponent } from './vehicle-sub-type/vehicle-sub-type.component';
import { ImageDisplayComponent } from './image-display/image-display.component';
import { LicensePlateComponent } from './license-plate/license-plate.component';

const routes: Routes = [
  { path: 'vehicle-form', component: VehicleFormComponent },
];

@NgModule({
  declarations: [
    VehicleFormComponent,
    VehicleSubTypeComponent,
    ImageDisplayComponent,
    LicensePlateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}, {}),
    RouterModule.forChild(routes) // Use forChild here for lazy loading
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class FormsModule {}
