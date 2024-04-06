import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateDirective } from './date.directive';
import { Component, DebugElement } from '@angular/core';
import { Task } from 'src/app/models/task';
import { By } from '@angular/platform-browser';
import { NgFor, NgIf } from '@angular/common';
import { DoneTaskComponent } from 'src/app/components/done-task/done-task.component';
import { TodoTaskComponent } from 'src/app/components/todo-task/todo-task.component';
import { TasksService } from 'src/app/services/TaskService/tasks.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpService } from 'src/app/services/HttpService/http.service';
import { dataSAMPLE } from '../../testKit/testDataSet';
import { environment } from 'src/environments/environment';
import { CustomMatchers } from '../../testKit/customMatchers';
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
  standalone: true,
  imports: [NgFor, NgIf, DateDirective],
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
  describe('Isolated Unit Tests', () => {
    let fixture: ComponentFixture<DummyComponent>;
    let divDE: DebugElement;
    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        imports: [DateDirective, DummyComponent, NgFor, NgIf],
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
        expect(paragraph.textContent).toContain(text);
      });
      it('should contain defined CSS styles', () => {
        const defStyles =
          'z-index: 100; position: absolute; background-color: yellow;';
        divDE.triggerEventHandler('mouseenter');
        const paragraph: HTMLParagraphElement = <HTMLParagraphElement>(
          divDE.query(By.css('p')).nativeElement
        );
        expect(paragraph.getAttribute('style')).toContain(defStyles);
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
  describe('Integration Tests', () => {
    let toDoLiDEs: DebugElement[];
    let doneLiDEs: DebugElement[];
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [TasksService, HttpService],
        imports: [
          HttpClientTestingModule,
          DoneTaskComponent,
          TodoTaskComponent,
        ],
      }).compileComponents();
      const fixtureToDo = TestBed.createComponent(TodoTaskComponent);
      const fixtureDone = TestBed.createComponent(DoneTaskComponent);

      TestBed.inject(HttpTestingController)
        .expectOne(environment.URL_ENDPOINT + '/action/find')
        .flush({ documents: dataSAMPLE });

      fixtureDone.detectChanges();
      fixtureToDo.detectChanges();
      toDoLiDEs = fixtureToDo.debugElement.queryAll(
        By.css('div#tasksToDoTemplate>ol>li')
      );
      doneLiDEs = fixtureDone.debugElement.queryAll(
        By.css('div#tasksDoneTemplate>ol>li')
      );
    });

    it('Should not append the "Paragraph" if element was initialized', () => {
      for (let el of toDoLiDEs) {
        expect(el.query(By.css('p#taskDate'))).toBeFalsy();
      }
      for (let el of doneLiDEs) {
        expect(el.query(By.css('p#taskDate'))).toBeFalsy();
      }
    });

    describe('mouseEnter()', () => {
      it('Should append a "Paragraph" child when element is hovered', () => {
        for (let el of toDoLiDEs) {
          el.triggerEventHandler('mouseenter');

          expect(el.query(By.css('p#taskDate')).nativeElement).toBeTruthy();
        }
        for (let el of doneLiDEs) {
          el.query(By.css('div')).triggerEventHandler('mouseenter');
          expect(el.query(By.css('p#taskDate')).nativeElement).toBeTruthy();
        }
      });
      it('should set a "Date: " with string value into "Paragraph" from "appDate" Attribute Property', () => {
        jasmine.addMatchers(CustomMatchers);
        for (let el of toDoLiDEs) {
          el.triggerEventHandler('mouseenter');

          const cleanDataStr = el
            .query(By.css('p#taskDate'))
            .nativeElement.textContent.replace('Date: ', '');
          expect(cleanDataStr).toBeDateToLocaleString();
        }
        for (let el of doneLiDEs) {
          el.query(By.css('div')).triggerEventHandler('mouseenter');

          const cleanDataStr = el
            .query(By.css('p#taskDate'))
            .nativeElement.textContent.replace('Date: ', '');
          expect(cleanDataStr).toBeDateToLocaleString();
        }
      });
      it('should contain defined CSS styles', () => {
        const defStyles =
          'z-index: 100; position: absolute; background-color: yellow;';

        for (let el of toDoLiDEs) {
          el.triggerEventHandler('mouseenter');
          const p: HTMLParagraphElement = el.query(
            By.css('p#taskDate')
          ).nativeElement;
          expect(p.getAttribute('style')).toContain(defStyles);
        }

        for (let el of doneLiDEs) {
          el.query(By.css('div')).triggerEventHandler('mouseenter');
          const p: HTMLParagraphElement = el.query(
            By.css('p#taskDate')
          ).nativeElement;
          expect(p.getAttribute('style')).toContain(defStyles);
        }
      });
    });
    describe('mouseLeave()', () => {
      it('Should remove a "Paragraph" child when mouse leave an element', () => {
        for (let el of toDoLiDEs) {
          el.triggerEventHandler('mouseenter');
          el.triggerEventHandler('mouseleave');
          expect(el.query(By.css('p#taskDate'))).toBeFalsy();
        }
        for (let el of doneLiDEs) {
          el.triggerEventHandler('mouseenter');
          el.triggerEventHandler('mouseleave');
          expect(el.query(By.css('p#taskDate'))).toBeFalsy();
        }
      });
    });
  });
});
