import { Task } from './../models/task';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortName',
})
export class SortNamePipe implements PipeTransform {
  //below we change what kind of value type this Pipe receives<Array<Task>> and what type he return <Array<Task>>
  transform(value: Array<Task>, args?: any): Array<Task> {
    return value.sort((a, b) => {
      /* inside standard implementation off sort method with 'a','b' arguments in Array */
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        //above we set all letters in Received Argument from Array to 'toLowerCase' - need to be compatible comparison
        //'value' - Array
        //'a';'b' - elements of Array with Types <Task>
        //'a.name' we call one parameter of element according to this <Type>(interface)
        return 1;
      } else {
        return -1;
      }
    });
  }
}
