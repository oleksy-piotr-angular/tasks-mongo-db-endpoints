import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { AddTaskComponent } from './add-task.component';
import { TasksService } from '../../services/TaskService/tasks.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Task } from './../../models/task';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/services/HttpService/http.service';

@Component({
  template: `
    <app-add-task>
      <h2>Default Checked!!!</h2>
      <p id="tip2">Select Checked!!!</p>
    </app-add-task>
  `,
  standalone: true,
  imports: [FormsModule, AddTaskComponent],
})
class TestHostComponent {}

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
  let divDE: DebugElement;
  describe('Isolated Unit Tests', () => {
    let mockTaskService: jasmine.SpyObj<TasksService>;

    beforeEach(async () => {
      mockTaskService = jasmine.createSpyObj('TaskService', ['add']);
      await TestBed.configureTestingModule({
        providers: [{ provide: TasksService, useValue: mockTaskService }],
        imports: [AddTaskComponent, TestHostComponent, FormsModule],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(AddTaskComponent);
      component = fixture.componentInstance;
      divDE = fixture.debugElement.query(By.css('div'));

      fixture.detectChanges();
    });

    it('should create Component Instance and its defined Template', () => {
      expect(component).toBeTruthy();
      expect(divDE).toBeTruthy();
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

    describe('Template/ShallowUnitTest', () => {
      it('should render multiple slots with <ng-content>', () => {
        const testFixture = TestBed.createComponent(TestHostComponent);
        const defaultTestEl: HTMLHeadingElement =
          testFixture.debugElement.query(By.css('div>h2')).nativeElement;
        const selectTestEl: HTMLParagraphElement =
          testFixture.debugElement.query(By.css('div>p#tip2')).nativeElement;
        expect(defaultTestEl.textContent).toContain('Default Checked!!!');
        expect(selectTestEl.textContent).toContain('Select Checked!!!');
      });

      it('should render properly defined <input> element ', () => {
        const inputEl: HTMLInputElement = divDE.query(
          By.css('#inputNewTaskValue')
        ).nativeElement;
        expect(inputEl).toBeTruthy;
        expect(inputEl.type).toBe('text');
        expect(inputEl.placeholder).toBe('Please enter "New Task"');
        expect(inputEl.value).toBe('');
      });

      it('should render <input> element with [(ngModel)] two-way data Binding with property "newTask"', async () => {
        //arrange
        const inputEl: HTMLInputElement = divDE.query(
          By.css('#inputNewTaskValue')
        ).nativeElement;

        //act
        component.newTask = 'UPDATED Property_VALUE';
        fixture.detectChanges();

        //assert model->view
        await fixture.whenStable();
        expect(inputEl.value).toEqual('UPDATED Property_VALUE');

        //act
        inputEl.value = 'UPDATED_Input_VALUE';
        inputEl.dispatchEvent(new Event('input'));

        //assert view-model
        await fixture.whenStable();
        expect(component.newTask).toEqual('UPDATED_Input_VALUE');
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
  });

  describe('Integration Unit Tasting', () => {
    let taskService: TasksService;
    let httpTestingController: HttpTestingController;
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        providers: [TasksService, HttpService],
        imports: [HttpClientTestingModule, AddTaskComponent],
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
