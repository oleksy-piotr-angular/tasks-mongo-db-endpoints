import { Task } from './../models/task';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortName',
})
export class SortNamePipe implements PipeTransform {
  transform(value: Task[], args?: any): Task[] {
    return value.sort((a, b) => {
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });
  }
}
