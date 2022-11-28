import ObjectID from 'bson-objectid';
import { ObjectEncodingOptions } from 'fs';

export interface Task {
  //create special interface <Task> with data template to use it in this app instead of <string> type
  _id?: { $oid: string };
  name: string;
  created: string;
  end?: string;
  isDone: boolean;
  /** Above change properties to send data into MongoDB noSQL data store */
}
