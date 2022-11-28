import {
  Directive,
  HostListener,
  Input,
  ElementRef,
  Renderer2,
} from '@angular/core';
//Directives are simplified Components
@Directive({
  selector: '[appDate]',
})
export class DateDirective {
  @Input()
  date: string = ''; //must initiate all new properties...
  private paragraph: Renderer2; //<p>//this property is prepared to initiate in constructor and use it inside this 'DateDirective'

  constructor(private el: ElementRef, private renderer: Renderer2) {
    /* above we need to Inject these classes to contructor to manipulate element <li> DOM appearance (and each, where this directive is assigned) and show {{task.end}} and {{task.created}} info from methods and property-binding. It will show after 'Events' in @Hostlistener decorator running methods*/
    this.paragraph = this.renderer.createElement('p'); //create a HTML DOM element <p> tag
  }

  @HostListener('mouseenter') //we initiate @HostListener wich listen 'mouseenter' Event and Run method below
  mouseEnter(eventDate: Event): void {
    //this method is running when '@HostListener' receive 'Event'-'mouseenter' and it can be named with another name 'mouseEnter' than Event 'mouseenter' as we See
    this.renderer.setProperty(
      this.paragraph,
      'innerHTML',
      `Date: ${this.date}` /** remove previous Code because we recieve String value only */
    ); //we cannot use 'innnerHTML on 'renderer' so we do content replacement to 'this.date' with setProperty() method we change format also with 'localeDateString()' method
    this.renderer.appendChild(this.el.nativeElement, this.paragraph); //we append child with this 'paragraph' to element where this directive is assigned
  }
  @HostListener('mouseleave') //we initiate @HostListener  which listen 'mouseleave' Event and Run method below
  mouseLeave(eventDate: Event): void {
    //this method is running when '@HostListener' receive 'Event'- 'mouseleave'  and it can be named with another name ' mouseLeave' than Event 'mouseleave' as we See
    this.renderer.removeChild(this.el.nativeElement, this.paragraph); //we remove this Child 'paragraph' from element where this directive is assigned
  }
}
