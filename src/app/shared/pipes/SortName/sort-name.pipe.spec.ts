import { Task } from './../../../models/task';
import { SortNamePipe } from './sort-name.pipe';

xdescribe('SortNamePipe', () => {
  let pipe: SortNamePipe;
  beforeEach(() => {
    pipe = new SortNamePipe();
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sort Task[] by name', () => {
    const unsortedTasks: Task[] = [
      {
        name: 'K',
        created: 'some date',
        isDone: false,
      },
      {
        name: 'Z',
        created: 'some date',
        isDone: false,
      },
      {
        name: 'J',
        created: 'some date',
        isDone: false,
      },
      {
        name: 'S',
        created: 'some date',
        isDone: false,
      },
    ];
    const sortedTasks: Task[] = [
      {
        name: 'J',
        created: 'some date',
        isDone: false,
      },
      {
        name: 'K',
        created: 'some date',
        isDone: false,
      },
      {
        name: 'S',
        created: 'some date',
        isDone: false,
      },
      {
        name: 'Z',
        created: 'some date',
        isDone: false,
      },
    ];
    expect(pipe.transform(unsortedTasks)).toEqual(sortedTasks);
  });
});
