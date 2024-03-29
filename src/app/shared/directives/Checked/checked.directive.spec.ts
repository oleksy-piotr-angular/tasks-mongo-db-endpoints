import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DoneTaskComponent } from 'src/app/components/done-task/done-task.component';
import { Task } from 'src/app/models/task';
import { TasksService } from 'src/app/services/TaskService/tasks.service';
import { DateDirective } from '../Date/date.directive';
import { SortNamePipe } from '../../pipes/SortName/sort-name.pipe';
import { TransformTaskPipe } from '../../pipes/TransformTask/transform-task.pipe';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { CheckedDirective } from './checked.directive';

describe('CheckedDirective', () => {
  //TODO
  //!Add Mocks
  let liEl: HTMLLIElement;
  describe('Isolated Unit Testing', () => {
    beforeEach(() => {
      const mockTaskService: jasmine.SpyObj<TasksService> =
        jasmine.createSpyObj(TasksService, ['getTaskListObs']);

      const fixture = TestBed.configureTestingModule({
        declarations: [
          DateDirective,
          DoneTaskComponent,
          SortNamePipe,
          TransformTaskPipe,
          CheckedDirective,
        ],
        providers: [{ provide: TasksService, useValue: mockTaskService }],
      }).createComponent(DoneTaskComponent);

      const TASKS: Task[] = [
        {
          name: 'K',
          created: 'someCreatedDate',
          isDone: true,
          end: 'someEndDate',
        },
      ];
      mockTaskService.getTaskListObs.and.returnValue(of(TASKS));
      fixture.detectChanges();

      liEl = fixture.debugElement.query(By.css('li')).nativeElement;
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
