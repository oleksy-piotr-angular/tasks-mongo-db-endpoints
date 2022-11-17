import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformTask',
})
export class TransformTaskPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return value;
  }
}
