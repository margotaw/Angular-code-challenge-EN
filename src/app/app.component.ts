import { Component, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { KentekenCheck } from 'rdw-kenteken-check';
import { autoSubtypes, motorSubtypes, vehicles } from './vehicle-subtype';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 

  constructor() {
    
   
  }
  
  ngOnInit() {
  }
  
  

}
