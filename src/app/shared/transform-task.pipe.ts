import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformTask',
})
export class TransformTaskPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return value.charAt(0).toUpperCase() + value.slice(1); //here we modify string | take first letter with charAt(0) and change it to upperCase and paste rest string from second letter with slice(1)
  }
}
