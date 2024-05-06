import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  inject,
} from '@angular/core';

@Directive({
  selector: '[appChecked]',
  standalone: true,
})
export class CheckedDirective implements OnInit {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit(): void {
    let li: HTMLLIElement = this.el.nativeElement;
    this.renderer.setStyle(
      li,
      'background',
      'url(/assets/checked.png) 10px center no-repeat  rgb(195, 253, 137)'
    );
  }
}
