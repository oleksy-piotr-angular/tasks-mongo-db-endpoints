import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appDate]',
})
export class DateDirective {
  constructor() {}

  @HostListener('mouseenter') //we initiate @HostListener wich listen 'mouseenter' Event and Run method below
  mouseE1nter(eventDate: Event): void {
    //this method is running when '@HostListener' receive 'Event'-'mouseenter'
    console.log('mouseenter');
  }
  @HostListener('mouseleave') //we initiate @HostListener  which listen 'mouseleave' Event and Run method below
  mouseLeave(eventDate: Event): void {
    //this method is running when '@HostListener' receive 'Event'- 'mouseleave'
    console.log('mouseleave');
  }
}
