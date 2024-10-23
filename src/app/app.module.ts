import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LicensePlateComponent } from './forms/license-plate/license-plate.component';

const routes: Routes = [
  { path: '', redirectTo: 'forms/vehicle-form', pathMatch: 'full' }, 
  { path: 'forms', loadChildren: () => import('./forms/forms.module').then(m => m.FormsModule) }, // Lazy load the forms module
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes) 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
