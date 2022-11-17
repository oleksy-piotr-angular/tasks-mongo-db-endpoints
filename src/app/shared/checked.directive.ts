import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appChecked]',
})
export class CheckedDirective implements OnInit {
  /* good habit to modify HTML elements in ngOnInit lifecycle hook method */

  constructor(private el: ElementRef, private renderer: Renderer2) {
    /*above was injected two properties from imported class */
  }

  ngOnInit(): void {
    let li = this.el.nativeElement; //we assign this element <li> where this directive was implemented thanks 'ElementRef'
    this.renderer.setStyle(
      li,
      'background',
      'url(/assets/checked.png) 10px center no-repeat'
    ); //above we use 'renderer' object to manipulate <li> element style but we used here this solution("background" not "listy-style-image") because we want to have checked.png aligned vertically center and 10px from left border|in this solution we had to add styles into DoneTask-Component|
    this.renderer.setStyle(li, 'background-color', '#c3fd89');
  }
}
