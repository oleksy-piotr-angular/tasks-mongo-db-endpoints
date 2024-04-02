import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CheckedDirective } from './checked.directive';
import { Task } from 'src/app/models/task';
import { Component } from '@angular/core';
@Component({
    selector: 'app-test-host',
    template: `
    <ol>
      <li id="testEl" appChecked *ngFor="let task of tasksDone">
        {{ task.name }}
      </li>
    </ol>
  `,
    standalone: true,
})
export class TestHostComponent {
  tasksDone: Task[] = [
    {
      name: 'K',
      created: 'someCreatedDate',
      isDone: true,
      end: 'someEndDate',
    },
  ];
  tasksExists = true;
}
describe('CheckedDirective', () => {
  let liEl: HTMLLIElement;
  describe('Isolated Unit Testing', () => {
    beforeEach(() => {
      const fixture = TestBed.configureTestingModule({
    imports: [TestHostComponent, CheckedDirective],
}).createComponent(TestHostComponent);

      fixture.detectChanges();
      liEl = fixture.debugElement.query(By.css('#testEl')).nativeElement;
    });

    it('should attach the "appChecked" directive to the element as an attribute', () => {
      expect(liEl.hasAttribute('appChecked')).toBeTrue();
    });
    it('should add defined CSS styles to mark "li" items from "Task[]" as done', () => {
      const defStyle =
        'background: url("/assets/checked.png") 10px center no-repeat rgb(195, 253, 137);';
      expect(liEl.getAttribute('style')).toEqual(defStyle);
    });
  });
});
