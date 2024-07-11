import { Component, EventEmitter, Input, Output } from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { type } from 'src/app/models/vehicle-interface';

@Component({
  selector: 'app-single-select',
  templateUrl: './single-select.component.html',
  styleUrls: ['./single-select.component.css'],
   providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SingleSelectComponent,
    multi: true
  }]
})
export class SingleSelectComponent implements ControlValueAccessor {

  @Input() formControlName: any;
  @Input() placeholder: string = '';
  @Input() options: type[] = [];
  @Input() name: string = '';
  @Input() title: string = '';
  @Output() selectedOptionChange = new EventEmitter<string>();
  @Input() selectedOption:string | undefined = '';
  control = new FormControl();

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(obj: any): void {
    this.control.setValue(obj, {emitEvent: false});
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
     this.control.valueChanges.subscribe(value => {
        this.onChange(value);
    });
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.control.disable() : this.control.enable();
  }
  onSelectChange(event: Event) {
    let value = (event.target as HTMLSelectElement).value
        this.onChange(value);
    this.selectedOptionChange.emit(value);
  }
}
