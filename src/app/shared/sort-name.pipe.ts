import { Task } from './../models/task';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortName',
})
export class SortNamePipe implements PipeTransform {
  transform(value: Array<Task>, args?: any): Array<Task> {
    return value.sort((a, b) => {
      /* inside standard implementation off sort method with 'a','b' arguments in Array */
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      } else {
        return -1;
      }
    });
  }
}
