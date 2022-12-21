import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AtlasDataAPI } from '../shared/atlas-data-api';
import { Task } from './../models/task';

/** This service was created to Implement Request to Atlas Data Api with - Api Key */
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly atlasApi: AtlasDataAPI = new AtlasDataAPI();

  private readonly dataAPI: string = new AtlasDataAPI().dataAPI; // this is unsafe data to send a request
  private readonly urlDB: string =
    `https://data.mongodb-api.com/app/` +
    this.dataAPI +
    `/endpoint/data/v1/action/`; // prepare URL to send Request to MongoDB_Atlas

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Array<Task>> {
    const getTasksBody = {
      dataSource: 'tasks-example',
      database: 'AngularPractice',
      collection: 'tasks',
    }; // prepare request Body for MongoDB_Atlas to recieve data from noSQL storage
    const myHttpHeader = new HttpHeaders();
    myHttpHeader.set('Content-Type', 'application/xml');
    myHttpHeader.set('Access-Control-Request-Headers', '*');
    //above we prepare Header to recieve JSON in Object from MongoDB
    const action = 'find';
    this.http
      .post<Array<Task>>(this.urlDB + action, getTasksBody, {
        headers: myHttpHeader,
        responseType: 'json',
      }) //
      .subscribe((tasks) => {
        // above is constructed correct Request to MongoDB Atlas with body to make specific action | Receive answer as an Object with Array of stored values
        //const requestToArray = Object.values(tasks); // because after request we receive object as an answer, we need to change values into Array
        //const tasksList: Task[] = Object.values(requestToArray[0]); // this Array element keeps nested Array with tasksList
      });
    return this.http.post<Array<Task>>(this.urlDB + action, getTasksBody, {
      headers: myHttpHeader,
      responseType: 'json',
    }); //below we do not need to subsribe this method here | because we return this method as Observable
    /* .subscribe((tasks) => {
        // above is constructed correct Request to MongoDB Atlas with body to make specific action | Receive answer as an Object with Array of stored values
        const requestToArray = Object.values(tasks); // because after request we receive object as an answer, we need to change values into Array
        const tasksList = requestToArray[0]; // this Array element keeps nested Array with tasksList
        for (let i in tasksList) {
          // print each element of Array
          console.log(tasksList[i]);
        }
      }); */
  }

  saveTasks(list: Array<Task> = []) {
    const listToSave = list.filter((t) => {
      return t._id === undefined;
    });
    if (listToSave.length) {
      const saveTasksBody = {
        collection: 'tasks',
        database: 'AngularPractice',
        dataSource: 'tasks-example',
        documents: listToSave,
      }; // prepare request Body for MongoDB_Atlas to recieve data from noSQL data storage
      const action = 'insertMany';

      this.http.post(this.urlDB + action, saveTasksBody).subscribe((data) => {
        console.log(data);
      });
    }
    this.updateTasksToDone(list);
  }

  removeDoneTasksFromDB() {
    /** This method remove all Tasks which has changed status 'isDone = true' from DB */
    const saveTasksBody = {
      collection: 'tasks',
      database: 'AngularPractice',
      dataSource: 'tasks-example',
      filter: { isDone: true },
    }; // prepare request Body for MongoDB_Atlas | to remove data with specific condition from noSQL data storage
    const action = 'deleteMany';
    this.http.post(this.urlDB + action, saveTasksBody).subscribe((data) => {
      console.log(data);
    });
  }

  updateTasksToDone(list: Array<Task> = []) {
    /** TODO: correct to do this only once not every time */
    /* This method update whole list of tasks which chenged status isDone to 'true' */
    const tasksSavedInDB: Task[] = list.filter((t) => {
      return t._id !== undefined;
    });
    const doneTasks: Task[] = tasksSavedInDB.filter((t) => {
      return t.isDone === true;
    });
    console.log('Tasks saved in DB:');
    console.log(tasksSavedInDB);
    console.log('tasksSaved which was Done now and must be updated: ');
    console.log(doneTasks);

    const action: string = 'updateOne';
    for (let i in doneTasks) {
      const updateTasksBody = {
        collection: 'tasks',
        database: 'AngularPractice',
        dataSource: 'tasks-example',
        filter: {
          _id: { $oid: doneTasks[i]._id },
        },
        update: {
          $set: {
            isDone: true,
            end: doneTasks[i].end,
          },
        },
      }; // prepare request Body for MongoDB_Atlas | to remove data with specific condition from noSQL data storage
      this.http.post(this.urlDB + action, updateTasksBody).subscribe((data) => {
        console.log(data);
      });
    }
  }
}
