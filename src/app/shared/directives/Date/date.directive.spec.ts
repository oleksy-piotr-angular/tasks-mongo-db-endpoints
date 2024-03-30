import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateDirective } from './date.directive';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { Task } from 'src/app/models/task';
@Component({
  selector: 'app-dummy',
  template: `
    <ol>
      <li *ngFor="let task of tasksDone">
        <div id="testEl" *ngIf="task.end != null" [appDate]="task.end">
          TEST DESCRIPTION...
        </div>
      </li>
    </ol>
  `,
})
class DummyComponent {
  tasksDone: Task[] = [
    {
      name: 'K',
      created: 'someCreatedDate',
      isDone: true,
      end: 'someEndDate',
    },
  ];
}
describe('DateDirective', () => {
  let fixture: ComponentFixture<DummyComponent>;
  let divDE: DebugElement;
  describe('Isolated Unit Testing', () => {
    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        declarations: [DummyComponent, DateDirective],
      }).createComponent(DummyComponent);

      fixture.detectChanges();
      divDE = fixture.debugElement.query(By.css('#testEl'));
    });

    it('Should not append the "Paragraph" if element was initialized', () => {
      expect(divDE.query(By.css('p'))).toBeFalsy();
    });

    describe('mouseEnter()', () => {
      it('Should append a "Paragraph" child when element is hovered', () => {
        divDE.triggerEventHandler('mouseenter');
        expect(divDE.query(By.css('p'))).toBeTruthy();
      });
      it('should set a "Date: " with string value into "Paragraph" from "appDate" Attribute Property', () => {
        const text = 'Date: someEndDate';
        divDE.triggerEventHandler('mouseenter');
        const paragraph: HTMLParagraphElement = <HTMLParagraphElement>(
          divDE.query(By.css('p')).nativeElement
        );
        expect(paragraph.textContent).toEqual(text);
      });
      it('should contain defined CSS styles', () => {
        const defStyles =
          'z-index: 100; position: absolute; background-color: yellow;';
        divDE.triggerEventHandler('mouseenter');
        const paragraph: HTMLParagraphElement = <HTMLParagraphElement>(
          divDE.query(By.css('p')).nativeElement
        );
        expect(paragraph.getAttribute('style')).toEqual(defStyles);
      });
    });
    describe('mouseLeave()', () => {
      it('Should remove a "Paragraph" child when mouse leave an element', () => {
        divDE.triggerEventHandler('mouseenter');
        divDE.triggerEventHandler('mouseleave');
        expect(divDE.query(By.css('p'))).toBeFalsy();
      });
    });
  });
});
