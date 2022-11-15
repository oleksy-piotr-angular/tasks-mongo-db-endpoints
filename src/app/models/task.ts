export interface Task {
  //create special interface <Task> with data template to use it in this app instead of <string> type
  name: string;
  created: Date;
  end?: Date;
}
