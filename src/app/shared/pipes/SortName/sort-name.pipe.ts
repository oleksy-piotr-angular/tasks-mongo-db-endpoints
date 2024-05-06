import { Task } from '../../../models/task';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortName',
  standalone: true,
})
export class SortNamePipe implements PipeTransform {
  transform(value: Task[] | null): Task[] | undefined {
    if (value === null) {
      return undefined;
    }
    return value.sort((a, b) => {
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });
  }
}
