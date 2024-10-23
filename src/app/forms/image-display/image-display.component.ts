import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-display',
  template: `
    <picture>
      <img [src]="image" alt="vehicle image" class="object-cover h-full w-full">
    </picture>
  `,
  styles: [`
    picture {
      width: 100%;
      height: auto;
    }
  `]
})
export class ImageDisplayComponent {
  @Input() image!: string; 
}
