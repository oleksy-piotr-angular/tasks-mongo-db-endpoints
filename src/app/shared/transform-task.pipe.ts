import { Pipe, PipeTransform } from '@angular/core';
//Pipe change only Data displaying Data in FrontEnd - (Not modify data) Data are same as we Receive from 'Inputs'
@Pipe({
  name: 'transformTask',
})
export class TransformTaskPipe implements PipeTransform {
  /* below we change value type on <string> and argument(args) sended after colon ':' where Pipe is assigned|'args' changed to optional(but we changed to empty string on default content) and switch type into <string> - our whole Pipe transform <string> */
  transform(value: string, args: string = ''): unknown {
    return value.charAt(0).toUpperCase() + value.slice(1) + args; //here we modify string | take first letter with charAt(0) and change it to upperCase and paste rest string from second letter with slice(1) and paste 'args' with additional string after colon in transformTask assignment {todo-task.component.html;done-task.component.html}
  }
}
