import { Directive, HostListener, Input } from '@angular/core';
//Directives are simplified Components
@Directive({
  selector: '[appDate]',
})
export class DateDirective {
  @Input()
  date: Date = new Date(); //must initiate all new properties...

  constructor() {}

  @HostListener('mouseenter') //we initiate @HostListener wich listen 'mouseenter' Event and Run method below
  mouseEnter(eventDate: Event): void {
    //this method is running when '@HostListener' receive 'Event'-'mouseenter' and it can be named with another name 'mouseEnter' than Event 'mouseenter' as we See
    console.log(this.date);
  }
  @HostListener('mouseleave') //we initiate @HostListener  which listen 'mouseleave' Event and Run method below
  mouseLeave(eventDate: Event): void {
    //this method is running when '@HostListener' receive 'Event'- 'mouseleave'  and it can be named with another name ' mouseLeave' than Event 'mouseleave' as we See
    console.log(this.date);
  }
}
