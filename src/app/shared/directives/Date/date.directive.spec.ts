import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateDirective } from './date.directive';
import { DoneTaskComponent } from 'src/app/components/done-task/done-task.component';
import { By } from '@angular/platform-browser';
import { TasksService } from 'src/app/services/TaskService/tasks.service';
import { SortNamePipe } from '../../pipes/SortName/sort-name.pipe';
import { of } from 'rxjs';
import { TransformTaskPipe } from '../../pipes/TransformTask/transform-task.pipe';
import { DebugElement } from '@angular/core';
import { Task } from 'src/app/models/task';

describe('DateDirective', () => {
  let fixture: ComponentFixture<DoneTaskComponent>;
  let divDE: DebugElement;
  let mockTaskService: jasmine.SpyObj<TasksService>;
  beforeEach(() => {
    const TASKS: Task[] = [
      {
        name: 'K',
        created: 'someCreatedDate',
        isDone: true,
        end: 'someEndDate',
      },
    ];
    mockTaskService = jasmine.createSpyObj(['getTaskListObs']);
    fixture = TestBed.configureTestingModule({
      declarations: [
        DateDirective,
        DoneTaskComponent,
        SortNamePipe,
        TransformTaskPipe,
      ],
      providers: [{ provide: TasksService, useValue: mockTaskService }],
    }).createComponent(DoneTaskComponent);

    mockTaskService.getTaskListObs.and.returnValue(of(TASKS));
    fixture.detectChanges();
    divDE = fixture.debugElement.query(By.css('li>div'));
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
