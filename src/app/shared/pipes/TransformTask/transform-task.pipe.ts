import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'transformTask',
    standalone: true,
})
export class TransformTaskPipe implements PipeTransform {
  transform(value: string, args: string = ''): string {
    return value.charAt(0).toUpperCase() + value.slice(1) + args;
  }
}
