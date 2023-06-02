import { Task } from './../models/task';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortName',
})
export class SortNamePipe implements PipeTransform {
  transform(value: Task[], args?: any): Task[] {
    return value.sort((a, b) => {
      /* inside standard implementation off sort method with 'a','b' arguments in Array */
      // if (a.name.toLowerCase() > b.name.toLowerCase()) {
      //   return 1;
      // } else {
      //   return -1;
      // }
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });
  }
}
