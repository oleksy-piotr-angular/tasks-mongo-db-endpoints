# TasksListExample

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.6.

If you want to check how it works on Github Pages click link below:
https://oleksy-piotr-angular.github.io/tasks-mongo-db-endpoints/


# Specification Details:
=AppComponent
  *Isolated Unit Tests
      +should create the app
      +should have as title 'Tasks-list-example: Atlas Data API Endpoints(MongoDB) '
    - clear()
      +should call "taskService.clearDoneTasksInDB()" to clear the list of completed tasks
    -Template/ShallowUnitTest
      +should render title
      +should render "button" with defined text and click event for method "clear()"
      +should render 2 elements of "div.container" with Mock Child Components
  *Deep Integration Tests
      +clear()
      +should call "taskService.clearDoneTasksInDB()" to clear the list of completed tasks from "tasksList$"
    -Template
      +should render 2 elements of "div.container" with Child Components
      +should render Child Components templates content
      
=AddTaskComponent
  *Isolated Unit Tests
      +should create Component Instance and its defined Template
    -add()
      +should call "TaskService.add()"
      +should create a new Task object and pass it to "TaskService.add()" as param
      +should clear the content of the "newTask" property at the end of execution
    -Template/ShallowUnitTest
      +should render multiple slots with <ng-content>
      +should render properly defined <input> element
      +should render <input> element with [(ngModel)] two-way data Binding with property "newTask"
      +should render button with event-binding "(click)" for method "add()"
  *Integration Tests
    -add()
      +should call "TaskService.add()" which will add a new task with "_id" received after calling "HttpService.saveOneTask()" sending requests to API

=DoneTaskComponent
  *Isolated Unit Tests
      +should create Component Instance
      +should be init with empty Array of "tasksDone" property
      +should be init with false value for "tasksExist" property
    -ngOnInit()
      +should initialize the "Task[]" array as the value of the "tasksDone" property from the returned and filtered array from "Observable<Task[]>" when subscribing to "tasksService.getTaskList$()"
  *Template/ShallowUnitTest
    -Tasks Not Exist
      +should not render div "#tasksDoneTemplate" if Tasks Behavior Subject has no Elements
    -Tasks Exist
      +should render div "#tasksDoneTemplate" if Tasks Behavior Subject has Elements
      +should render Paragraph Element with info about number of Completed Tasks
      +should render <ol> with the same number of <li> elements as the number of completed tasks
      +should in <li> render <div> with name property content of tasks if "task" has "end" property which is used in [appDate] pipe
  *Integration Tests
    -ngOnInit()
      +should initialize the "Task[]" array as the value of the "tasksDone" property from the returned and filtered array from "Observable<Task[]>" when subscribing to "tasksService.getTaskList$()"
    -Template/ShallowUnitTest
      +should render div "#tasksDoneTemplate" if Tasks Behavior Subject has Elements
      +should render Paragraph Element with info about number of Completed Tasks
      +should render <ol> with the same number of <li> elements as the number of completed tasks
      +should in <li> render <div> with name property content of tasks if "task" has "end" property which is used in [appDate] pipe

=TodoTaskComponent
  *Isolated Unit Tests
    +should create Component Instance
    +should be init with empty Array of "tasksList" property
    +should be init with false value for "tasksExist" property
    >Component Initialization:
      -ngOnInit()
        +should initialize the "Task[]" array as the value of the "tasksDone" property from the returned and filtered array from "Observable<Task[]>" when subscribing to "tasksService.getTaskList$()"
      -remove()
        +should call "taskService.remove()" method with "task" to remove in params
      -done()
        +should call "taskService.done()" method with "task" in params to mark it as done
      -setSelector()
        +should return "green" or "red" if the number of "tasksList" elements is equal or greater than 5 or less
  >Template/ShallowUnitTest
    -Tasks Not Exist
      +should not render div "#tasksToDoTemplate" if Tasks Behavior Subject has no Elements
    -Only Completed Tasks Exist
      +should render only #noTask "TemplateRef" if all Tasks are completed
    -Tasks "ToDo" and "Done" Exist
        +should render div "#tasksToDoTemplate" if "tasksExists" property is true
      -Paragraph with number of TO-DO tasks
        +should render info about number of Uncompleted Tasks
        +should have style changed with [ngStyle] condition if it has equal or greater than 5 or less
      -TaskList ToDo
        +should render "ol#taskToDoList" with the same number of <li> elements as the number of Uncompleted tasks
        +should in <li> render <p> with name property content of tasks if "task" has "created" property which is used in [appDate] pipe
        +should change class with [ngClass] condition if it is odd or last of list element
        +should render "Remove" button with defined class and "click" event which handle "remove()" method for each
        +should render "Done" button with defined class and "click" event which handle "done()" method for each
  *Integration Tests
    >Component Initialization:
      -ngOnInit()
        +should initialize the "Task[]" array as the value of the "tasksDone" property from the returned and filtered array from "Observable<Task[]>" when subscribing to "tasksService.getTaskList$()"
      -remove()
        +should remove given task from "tasksList[]" param elements
      -done()
        +should call "taskService.done()" method with "task" in params to mark it as done
      -setSelector()
        +should return "green" or "red" if the number of "tasksList" elements is equal or greater than 5 or less
    >Template/ShallowUnitTest
      -Tasks "ToDo" and "Done" Exist
        +should render div "#tasksToDoTemplate" if "tasksExists" property is true
      -Paragraph with number of TO-DO tasks
        +should render info about number of Uncompleted Tasks
        +should have style changed with [ngStyle] condition if it has equal or greater than 5 or less
      -TaskList ToDo
        +should render "ol#taskToDoList" with the same number of <li> elements as the number of Uncompleted tasks
        +should in <li> render <p> with name property content of tasks if "task" has "created" property which is used in [appDate] pipe
        +should change class with [ngClass] condition if it is odd or last of list element
        +should render "Remove" button with defined class and "click" event which handle "remove()" method for each
        +should render "Done" button with defined class and "click" event which handle "done()" method for each

=HttpService
  -getTasks()
    +should send expected body to get expected response from API when "getTasks()" is called
  -saveOneTask()
    +should send expected body with the task to API to save it and receive "_id" value for it
  -removeDoneTasksFromDB()
    +should send expected body to remove all Completed Tasks in API
  -updateOneTaskToDone()
    +should send expected body with the task marking it as completed in API
  -removeOneTask()
    +should send expected body to remove one task from API

=TasksService
  >Isolated Unit Tests
    -constructor()
      +should call private method "getTasksFromDB()" when is initialized
    -getTasksFromDB()
      +should pass received Array Tasks into private BehaviorSubject "tasksList$"
    -getTaskList$()
      +should return an array from the private property "taskList$"
    -add()
      +should call "httpService.saveOneTask()" method only one time with given Param
      +should add a new Task to The Existing "taskList$" property
    -remove()
      +should call "httpService.removeOneTask()" method only one time with given Param
      +should remove element which was given in Param from "taskList$" property
    -done()
      +should call "httpService.updateOneTaskToDone()" method only one time with given Param
      +should update the "isDone" to true for the element in "taskList$" property
      +should set string data in the "end" property for the element in "taskList$" property
      +should be string date created from Date type using "toLocaleString()" method
    -clearDoneTaskInDB()
      +should call "httpService.removeDoneTasksFromDB()" only one time without Params"
      +should also remove only completed tasks from "tasksList$"
  >Integration Tests
    -constructor()
      +should call private method "getTasksFromDB()" when is initialized to send "POST" method
    -getTasksFromDB()
      +should pass received Array Task into private BehaviorSubject "tasksList$"
    -getTaskList$()
      +should return an array from the private property "taskList$"
    -add()
      +should call "httpService.saveOneTask() to send "POST" method"
      +should add a new Task to The Existing "taskList$" property with received ID from response
    -remove()
      +should call "httpService.removeOneTask()" to send "POST" method
      +should remove element which was given in Param from "taskList$" property
    -done()
      +should call "httpService.updateOneTaskToDone() to send "POST" method"
      +should update the "isDone" to true for the element in "taskList$" property
      +should set string data in the "end" property for the element in "taskList$" property
      +should be string date created from Date type using "toLocaleString()" method
    -clearDoneTaskInDB()
      +should call "httpService.removeDoneTasksFromDB()" to send "POST" method
      +should remove only completed tasks from "tasksList$"

=CheckedDirective
  >Isolated Unit Tests
    +should attach the "appChecked" directive to the element as an attribute
    +should add defined CSS styles to mark "li" items from "Task[]" as done
  >Integration Tests
    +should attach the "appChecked" directive to the element as an attribute
    +should add defined CSS styles to mark "li" items from "Task[]" as done

=DateDirective
  >Isolated Unit Tests
    +should not append the "Paragraph" if element was initialized
    -mouseEnter()
      +should append a "Paragraph" child when element is hovered
      +should set a "Date: " with string value into "Paragraph" from "appDate" Attribute Property
      +should contain defined CSS styles
    -mouseLeave()
      +should remove a "Paragraph" child when mouse leave an element
  >Integration Tests
    +should not append the "Paragraph" if element was initialized
    -mouseEnter()
      +should append a "Paragraph" child when element is hovered
      +should set a "Date: " with string value into "Paragraph" from "appDate" Attribute Property
      +should contain defined CSS styles
    -mouseLeave()
      +should remove a "Paragraph" child when mouse leave an element

=SortNamePipe
  +should create an instance
  +should sort Task[] by name

=TransformTaskPipe
  +should create an Instance
  +should change the first letter to uppercase and append the optional string parameter to the end of the string