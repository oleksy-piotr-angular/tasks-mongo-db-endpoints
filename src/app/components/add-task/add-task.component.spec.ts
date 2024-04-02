import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTaskComponent } from './add-task.component';
import { TasksService } from '../../services/TaskService/tasks.service';
import { HttpService } from '../../services/HttpService/http.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Task } from './../../models/task';
import { MockHttpService } from 'src/app/shared/testKit/mockDependencies';
import { environment } from 'src/environments/environment';

@Component({
    template: `
    <app-add-task>
      <h1>Default Checked!!!</h1>
      <p id="tip2">Select Checked!!!</p>
    </app-add-task>
  `,
    standalone: true,
    imports: [HttpClientTestingModule, FormsModule],
})
class TestHostComponent {}

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
  let divDE: DebugElement;
  describe('Isolated Unit Testing', () => {
    let mockTaskService: jasmine.SpyObj<TasksService>;

    beforeEach(async () => {
      mockTaskService = jasmine.createSpyObj('TaskService', ['add']);
      await TestBed.configureTestingModule({
    providers: [
        { provide: TasksService, useValue: mockTaskService },
        { provide: HttpService, useClass: MockHttpService },
    ],
    imports: [HttpClientTestingModule, FormsModule, AddTaskComponent, TestHostComponent],
}).compileComponents();

      fixture = TestBed.createComponent(AddTaskComponent);
      component = fixture.componentInstance;
      divDE = fixture.debugElement.query(By.css('div'));
      fixture.detectChanges();
    });

    it('should create Component Instance', () => {
      expect(component).toBeTruthy();
      expect(divDE).toBeTruthy();
    });
    describe('Template/ShallowUnitTest', () => {
      it('should render multiple slots with <ng-content>', () => {
        const testFixture = TestBed.createComponent(TestHostComponent);

        const defaultTestEl: HTMLHeadingElement =
          testFixture.debugElement.query(By.css('div>h1')).nativeElement;
        const selectTestEl: HTMLParagraphElement =
          testFixture.debugElement.query(By.css('div>p#tip2')).nativeElement;
        expect(defaultTestEl.textContent).toEqual('Default Checked!!!');
        expect(selectTestEl.textContent).toEqual('Select Checked!!!');
      });

      it('should render properly <input> text type with two-way data binding for "newTask" property', () => {
        const testValue = 'New Task Test UPDATED';
        const inputEl: HTMLInputElement = divDE.query(
          By.css('#inputNewTaskValue')
        ).nativeElement;
        expect(inputEl).toBeTruthy;
        expect(inputEl.type).toBe('text');
        expect(inputEl.placeholder).toBe('Please enter "New Task"');
        expect(inputEl.value).toBe('');
        component.newTask = testValue;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          const updatedInputEl: HTMLInputElement = divDE.query(
            By.css('#inputNewTaskValue')
          ).nativeElement;
          expect(updatedInputEl.value).toBe(testValue);
        });
        component.newTask = '';
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          const updatedInputEl: HTMLInputElement = divDE.query(
            By.css('#inputNewTaskValue')
          ).nativeElement;
          updatedInputEl.value = testValue;
          expect(component.newTask).toBe(testValue);
        });
      });

      it('should render button with event-binding "(click)" for method "add()"', () => {
        const buttonDE: DebugElement = divDE.query(By.css('button'));
        const buttonEl: HTMLButtonElement = buttonDE.nativeElement;
        spyOn(component, 'add');

        buttonDE.triggerEventHandler('click');

        expect(buttonEl).toBeTruthy();
        expect(buttonEl.textContent).toBe('Add');
        expect(component.add).toHaveBeenCalled();
      });
    });

    describe('add()', () => {
      let testValue: string;
      beforeEach(() => {
        testValue = 'New Task Test UPDATED';
        component.newTask = testValue;
        component.add();
      });
      it('should call "TaskService.add()"', () => {
        expect(mockTaskService.add).toHaveBeenCalled();
        expect(mockTaskService.add).toHaveBeenCalledTimes(1);
      });
      it('should create a new Task object and pass it to "TaskService.add()" as param', () => {
        expect(mockTaskService.add).toHaveBeenCalledOnceWith(
          jasmine.objectContaining({ name: testValue, isDone: false })
        );
      });
      it('should clear the content of the "newTask" property at the end of execution', () => {
        expect(component.newTask).toBeFalsy();
      });
    });
  });

  describe('Integration Unit Tasting', () => {
    let taskService: TasksService;
    let httpTestingController: HttpTestingController;
    beforeEach(async () => {
      await TestBed.configureTestingModule({
    providers: [TasksService, HttpService],
    imports: [HttpClientTestingModule, FormsModule, AddTaskComponent, TestHostComponent],
}).compileComponents();
      httpTestingController = TestBed.inject(HttpTestingController);
      taskService = TestBed.inject(TasksService);
      fixture = TestBed.createComponent(AddTaskComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    describe('add()', () => {
      it('should call "TaskService.add()" which will add a new task with "_id" received after calling "HttpService.saveOneTask()" sending requests to API', () => {
        const testValue = 'New Task Test UPDATED';
        const expected_id = '1111111111111111111111';
        const expectedNewTask: Omit<Task, 'created'> = {
          _id: expected_id,
          name: testValue,
          isDone: false,
        };
        const expectedResponse = {
          _id: expected_id,
        };

        component.newTask = testValue;
        component.add();

        const testRequest = httpTestingController.expectOne(
          environment.URL_ENDPOINT + '/action/insertOne'
        );
        testRequest.flush(expectedResponse);

        taskService.getTaskList$().subscribe((tasks) => {
          const filteredTasks = tasks.filter((el) => el._id === expected_id);
          expect(filteredTasks.length).toBe(1);
          expect(filteredTasks[0]).toEqual(
            jasmine.objectContaining(expectedNewTask)
          );
        });
      });
    });
  });
});
