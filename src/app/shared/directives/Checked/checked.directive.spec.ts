import { dataSAMPLE } from 'src/app/shared/testKit/testDataSet';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CheckedDirective } from './checked.directive';
import { Task } from 'src/app/models/task';
import { Component, DebugElement } from '@angular/core';
import { NgFor } from '@angular/common';
import { DoneTaskComponent } from 'src/app/components/done-task/done-task.component';
import { TasksService } from 'src/app/services/TaskService/tasks.service';
import { HttpService } from 'src/app/services/HttpService/http.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

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
  imports: [NgFor, CheckedDirective],
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
  describe('Isolated Unit Tests', () => {
    let liEl: HTMLLIElement;
    beforeEach(() => {
      const fixture = TestBed.configureTestingModule({
        imports: [TestHostComponent, CheckedDirective, NgFor],
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
      expect(liEl.getAttribute('style')).toContain(defStyle);
    });
  });
  describe('Integration Tests', () => {
    let liDEs: DebugElement[];
    beforeEach(() => {
      const fixture = TestBed.configureTestingModule({
        providers: [TasksService, HttpService],
        imports: [HttpClientTestingModule, DoneTaskComponent],
      }).createComponent(DoneTaskComponent);

      TestBed.inject(HttpTestingController)
        .expectOne(environment.URL_ENDPOINT + '/action/find')
        .flush({ documents: dataSAMPLE });

      fixture.detectChanges();
      liDEs = fixture.debugElement.queryAll(
        By.css('div#tasksDoneTemplate>ol>li')
      );
    });

    it('should attach the "appChecked" directive to the element as an attribute', () => {
      for (let el of liDEs) {
        expect(el.nativeElement.hasAttribute('appChecked')).toBeTrue();
      }
    });
    it('should add defined CSS styles to mark "li" items from "Task[]" as done', () => {
      const defStyle =
        'background: url("/assets/checked.png") 10px center no-repeat rgb(195, 253, 137);';
      for (let el of liDEs) {
        expect(el.nativeElement.getAttribute('style')).toContain(defStyle);
      }
    });
  });
});
