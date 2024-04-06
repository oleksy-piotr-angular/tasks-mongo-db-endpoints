# TasksListExample

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.6.

If you want to check how it works on Github Pages click link below:
https://oleksy-piotr-angular.github.io/tasks-mongo-db-endpoints/

# <h1>Specification Details:</h1>

<ol>
  <li>
  <h2>AppComponent</h2>
    <ul>
      <li>Isolated Unit Tests
        <ul>
        <li>should create the app</li>
        <li>should have as title 'Tasks-list-example: Atlas Data API Endpoints(MongoDB) '</li>
        <li>clear()
            </br>+should call "taskService.clearDoneTasksInDB()" to clear the list of completed tasks
        </li>
        <li>Template/ShallowUnitTest
            </br>+should render title
            </br>+should render "button" with defined text and click event for method "clear()"
            </br>+should render 2 elements of "div.container" with Mock Child Components
        </li>
        </ul>
      </li>
      <li>Deep Integration Tests
        <ul>
        <li>clear()
            </br>+should call "taskService.clearDoneTasksInDB()" to clear the list of completed tasks from "tasksList$"
        </li>
        <li>Template
         </br>+should render 2 elements of "div.container" with Child Components
         </br>+should render Child Components templates content</li>
        </ul>      
      </li>
    </ul>
  </li>
  <li>
  <<h2>AddTaskComponent</h2>
  *Isolated Unit Tests
      </br>+should create Component Instance and its defined Template
    </br>-add()
      </br>+should call "TaskService.add()"
      </br>+should create a new Task object and pass it to "TaskService.add()" as param
      </br>+should clear the content of the "newTask" property at the end of execution
    </br>-Template/ShallowUnitTest
      </br>+should render multiple slots with &lt;ng</br>-content&gt;
      </br>+should render properly defined &lt;input&gt; element
      </br>+should render &lt;input&gt; element with [(ngModel)] two</br>-way data Binding with property "newTask"
      </br>+should render button with event</br>-binding "(click)" for method "add()"
  *Integration Tests
    </br>-add()
      </br>+should call "TaskService.add()" which will add a new task with "_id" received after calling "HttpService.saveOneTask()" sending requests to API
  </li>
  <li>
  <h2>DoneTaskComponent</h2>
  *Isolated Unit Tests
      </br>+should create Component Instance
      </br>+should be init with empty Array of "tasksDone" property
      </br>+should be init with false value for "tasksExist" property
    </br>-ngOnInit()
      </br>+should initialize the "Task[]" array as the value of the "tasksDone" property from the returned and filtered array from "Observable<Task[]>" when subscribing to "tasksService.getTaskList$()"
  *Template/ShallowUnitTest
    </br>-Tasks Not Exist
      </br>+should not render div "#tasksDoneTemplate" if Tasks Behavior Subject has no Elements
    </br>-Tasks Exist
      </br>+should render div "#tasksDoneTemplate" if Tasks Behavior Subject has Elements
      </br>+should render Paragraph Element with info about number of Completed Tasks
      </br>+should render &lt;ol&gt; with the same number of &lt;li&gt; elements as the number of completed tasks
      </br>+should in &lt;li&gt; render &lt;div&gt; with name property content of tasks if "task" has "end" property which is used in [appDate] pipe
  *Integration Tests
    </br>-ngOnInit()
      </br>+should initialize the "Task[]" array as the value of the "tasksDone" property from the returned and filtered array from "Observable&lt;Task[]&gt;" when subscribing to "tasksService.getTaskList$()"
    </br>-Template/ShallowUnitTest
      </br>+should render div "#tasksDoneTemplate" if Tasks Behavior Subject has Elements
      </br>+should render Paragraph Element with info about number of Completed Tasks
      </br>+should render &lt;ol&gt; with the same number of &lt;li&gt; elements as the number of completed tasks
      </br>+should in &lt;li&gt; render &lt;div&gt; with name property content of tasks if "task" has "end" property which is used in [appDate] pipe
  </li>
  <li>
  <h2>TodoTaskComponent</h2>
  *Isolated Unit Tests
    </br>+should create Component Instance
    </br>+should be init with empty Array of "tasksList" property
    </br>+should be init with false value for "tasksExist" property
    >Component Initialization:
      </br>-ngOnInit()
        </br>+should initialize the "Task[]" array as the value of the "tasksDone" property from the returned and filtered array from "Observable&lt;Task[]&gt;" when subscribing to "tasksService.getTaskList$()"
      </br>-remove()
        </br>+should call "taskService.remove()" method with "task" to remove in params
      </br>-done()
        </br>+should call "taskService.done()" method with "task" in params to mark it as done
      </br>-setSelector()
        </br>+should return "green" or "red" if the number of "tasksList" elements is equal or greater than 5 or less
  >Template/ShallowUnitTest
    </br>-Tasks Not Exist
      </br>+should not render div "#tasksToDoTemplate" if Tasks Behavior Subject has no Elements
    </br>-Only Completed Tasks Exist
      </br>+should render only #noTask "TemplateRef" if all Tasks are completed
    </br>-Tasks "ToDo" and "Done" Exist
        </br>+should render div "#tasksToDoTemplate" if "tasksExists" property is true
      </br>-Paragraph with number of TO</br>-DO tasks
        </br>+should render info about number of Uncompleted Tasks
        </br>+should have style changed with [ngStyle] condition if it has equal or greater than 5 or less
      </br>-TaskList ToDo
        </br>+should render "ol#taskToDoList" with the same number of &lt;li&gt; elements as the number of Uncompleted tasks
        </br>+should in &lt;li&gt; render &lt;p&gt; with name property content of tasks if "task" has "created" property which is used in [appDate] pipe
        </br>+should change class with [ngClass] condition if it is odd or last of list element
        </br>+should render "Remove" button with defined class and "click" event which handle "remove()" method for each
        </br>+should render "Done" button with defined class and "click" event which handle "done()" method for each
  *Integration Tests
    >Component Initialization:
      </br>-ngOnInit()
        </br>+should initialize the "Task[]" array as the value of the "tasksDone" property from the returned and filtered array from "Observable&lt;Task[]&gt;" when subscribing to "tasksService.getTaskList$()"
      </br>-remove()
        </br>+should remove given task from "tasksList[]" param elements
      </br>-done()
        </br>+should call "taskService.done()" method with "task" in params to mark it as done
      </br>-setSelector()
        </br>+should return "green" or "red" if the number of "tasksList" elements is equal or greater than 5 or less
    >Template/ShallowUnitTest
      </br>-Tasks "ToDo" and "Done" Exist
        </br>+should render div "#tasksToDoTemplate" if "tasksExists" property is true
      </br>-Paragraph with number of TO</br>-DO tasks
        </br>+should render info about number of Uncompleted Tasks
        </br>+should have style changed with [ngStyle] condition if it has equal or greater than 5 or less
      </br>-TaskList ToDo
        </br>+should render "ol#taskToDoList" with the same number of &lt;li&gt; elements as the number of Uncompleted tasks
        </br>+should in &lt;li&gt; render &lt;p&gt; with name property content of tasks if "task" has "created" property which is used in [appDate] pipe
        </br>+should change class with [ngClass] condition if it is odd or last of list element
        </br>+should render "Remove" button with defined class and "click" event which handle "remove()" method for each
        </br>+should render "Done" button with defined class and "click" event which handle "done()" method for each
  </li>
  <li>
  <h2>HttpService</h2>
  </br>-getTasks()
    </br>+should send expected body to get expected response from API when "getTasks()" is called
  </br>-saveOneTask()
    </br>+should send expected body with the task to API to save it and receive "_id" value for it
  </br>-removeDoneTasksFromDB()
    </br>+should send expected body to remove all Completed Tasks in API
  </br>-updateOneTaskToDone()
    </br>+should send expected body with the task marking it as completed in API
  </br>-removeOneTask()
    </br>+should send expected body to remove one task from API
  </li>
  <li>
  <h2>TasksService</h2>
  >Isolated Unit Tests
    </br>-constructor()
      </br>+should call private method "getTasksFromDB()" when is initialized
    </br>-getTasksFromDB()
      </br>+should pass received Array Tasks into private BehaviorSubject "tasksList$"
    </br>-getTaskList$()
      </br>+should return an array from the private property "taskList$"
    </br>-add()
      </br>+should call "httpService.saveOneTask()" method only one time with given Param
      </br>+should add a new Task to The Existing "taskList$" property
    </br>-remove()
      </br>+should call "httpService.removeOneTask()" method only one time with given Param
      </br>+should remove element which was given in Param from "taskList$" property
    </br>-done()
      </br>+should call "httpService.updateOneTaskToDone()" method only one time with given Param
      </br>+should update the "isDone" to true for the element in "taskList$" property
      </br>+should set string data in the "end" property for the element in "taskList$" property
      </br>+should be string date created from Date type using "toLocaleString()" method
    </br>-clearDoneTaskInDB()
      </br>+should call "httpService.removeDoneTasksFromDB()" only one time without Params"
      </br>+should also remove only completed tasks from "tasksList$"
  >Integration Tests
    </br>-constructor()
      </br>+should call private method "getTasksFromDB()" when is initialized to send "POST" method
    </br>-getTasksFromDB()
      </br>+should pass received Array Task into private BehaviorSubject "tasksList$"
    </br>-getTaskList$()
      </br>+should return an array from the private property "taskList$"
    </br>-add()
      </br>+should call "httpService.saveOneTask() to send "POST" method"
      </br>+should add a new Task to The Existing "taskList$" property with received ID from response
    </br>-remove()
      </br>+should call "httpService.removeOneTask()" to send "POST" method
      </br>+should remove element which was given in Param from "taskList$" property
    </br>-done()
      </br>+should call "httpService.updateOneTaskToDone() to send "POST" method"
      </br>+should update the "isDone" to true for the element in "taskList$" property
      </br>+should set string data in the "end" property for the element in "taskList$" property
      </br>+should be string date created from Date type using "toLocaleString()" method
    </br>-clearDoneTaskInDB()
      </br>+should call "httpService.removeDoneTasksFromDB()" to send "POST" method
      </br>+should remove only completed tasks from "tasksList$"
  </li>
  <li>
<h2>CheckedDirective</h2>
  >Isolated Unit Tests
    </br>+should attach the "appChecked" directive to the element as an attribute
    </br>+should add defined CSS styles to mark "li" items from "Task[]" as done
  >Integration Tests
    </br>+should attach the "appChecked" directive to the element as an attribute
    </br>+should add defined CSS styles to mark "li" items from "Task[]" as done
  </li>
  <li>
  <h2>DateDirective</h2>
  >Isolated Unit Tests
    </br>+should not append the "Paragraph" if element was initialized
    </br>-mouseEnter()
      </br>+should append a "Paragraph" child when element is hovered
      </br>+should set a "Date: " with string value into "Paragraph" from "appDate" Attribute Property
      </br>+should contain defined CSS styles
    </br>-mouseLeave()
      </br>+should remove a "Paragraph" child when mouse leave an element
  >Integration Tests
    </br>+should not append the "Paragraph" if element was initialized
    </br>-mouseEnter()
      </br>+should append a "Paragraph" child when element is hovered
      </br>+should set a "Date: " with string value into "Paragraph" from "appDate" Attribute Property
      </br>+should contain defined CSS styles
    </br>-mouseLeave()
      </br>+should remove a "Paragraph" child when mouse leave an element
  </li>
  <li>
  <h2>SortNamePipe</h2>
  </br>+should create an instance
  </br>+should sort Task[] by name
  </li>
  <li>
  <h2>TransformTaskPipe</h2>
  </br>+should create an Instance
  </br>+should change the first letter to uppercase and append the optional string parameter to the end of the string
  </li>
</ol>
