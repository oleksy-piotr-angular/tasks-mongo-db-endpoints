import { SortNamePipe } from './../shared/pipes/SortName/sort-name.pipe';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoneTaskComponent } from './done-task.component';
import { TasksService } from '../services/TaskService/tasks.service';
import { HttpService } from '../services/HttpService/http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TransformTaskPipe } from '../shared/pipes/TransformTask/transform-task.pipe';
import { DateDirective } from '../shared/directives/Date/date.directive';
import { CheckedDirective } from '../shared/directives/Checked/checked.directive';

describe('DoneTaskComponent', () => {
  let component: DoneTaskComponent;
  let fixture: ComponentFixture<DoneTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DoneTaskComponent,
        SortNamePipe,
        TransformTaskPipe,
        DateDirective,
        CheckedDirective,
      ],
      providers: [TasksService, HttpService],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DoneTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
