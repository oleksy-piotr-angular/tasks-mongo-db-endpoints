import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  inject,
} from '@angular/core';
@Directive({
  selector: '[appDate]',
  standalone: true,
})
export class DateDirective {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  @Input() appDate: string = '';
  private paragraph!: Renderer2;

  ngOnInit(): void {
    this.paragraph = this.renderer.createElement('p');
  }

  @HostListener('mouseenter')
  mouseEnter(): void {
    interface RequiredStyles {
      'z-index': number;
      position: string;
      'background-color': string;
    }
    const requiredStyles: RequiredStyles = {
      'z-index': 100,
      position: 'absolute',
      'background-color': 'yellow',
    };
    let newStyle: keyof RequiredStyles;
    for (newStyle in requiredStyles) {
      this.renderer.setStyle(
        this.paragraph,
        `${newStyle}`,
        requiredStyles[newStyle]
      );
    }

    this.renderer.setProperty(
      this.paragraph,
      'innerHTML',
      `Date: ${this.appDate}`
    );

    this.renderer.appendChild(this.el.nativeElement, this.paragraph);
  }
  @HostListener('mouseleave')
  mouseLeave(): void {
    this.renderer.removeChild(this.el.nativeElement, this.paragraph);
  }
}
