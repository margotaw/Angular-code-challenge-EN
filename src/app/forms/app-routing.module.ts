import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';

const routes: Routes = [
  { path: 'vehicle-form', component: VehicleFormComponent },
  { path: '', redirectTo: 'forms/vehicle-form', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/vehicle-form' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
