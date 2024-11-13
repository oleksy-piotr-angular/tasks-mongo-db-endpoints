# # Tasks-list-example: Atlas Data API Endpoints(MongoDB)

App in Angular 14.2 was updated to 17.3.2 version, with mongoDB using the Atlas Data API and
stores the entered data and processes it thanks to internal logic. </br>
Many of the current features of this version have been used here like: </br>

<ul>
<li>Service Injection,</li>
<li>Pipes, Directives,</li>
<li>DataBinding,</li>
<li>RxJS,</li>
<li>HttpClientModule,</li>
<li>ng-container,</li>
<li>ng-template,</li>
<li>ng-content,</li>
</ul>

E2E tests were performed in the latest version of Cypress framework.</br>
Html Specs report for App ready to download and open in your browser:</br>
https://drive.google.com/file/d/1ez7eIb20FsdQw0vSid340b8-vFdcOQQu/view?usp=sharing</br>
Video recorded in Cypress for each spec file while running tests:</br>
https://drive.google.com/drive/folders/1pByXHSHOEjaGp0Y93RGN_S9YQ5Ul4gRh?usp=sharing</br>

Specifications(Unit Tests + Integration Tests) was verified using Jasmine 4.3.0</br>

<h1>Specification Details:</h1>

<div>
  <ol>
    <li>
      AppComponent
      <ul>
        <li>Isolated Unit Tests</li>
        <ul>
          <li>should create the app</li>
        </ul>
        <ul>
          <li>
            should have as title 'Tasks-list-example: Atlas Data API
            Endpoints(MongoDB) '
          </li>
        </ul>
        <ul>
          <li>clear()</li>
          <ul>
            <li>
              should call "taskService.clearDoneTasksInDB()" to clear the list
              of completed tasks
            </li>
          </ul>
        </ul>
        <ul>
          <li>Template/ShallowUnitTest</li>
          <ul>
            <li>should render title</li>
          </ul>
          <ul>
            <li>
              should render "button" with defined text and click event for
              method "clear()"
            </li>
          </ul>
          <ul>
            <li>
              should render 2 elements of "div.container" with Mock Child
              Components
            </li>
          </ul>
        </ul>
      </ul>
      <ul>
        <li>Deep Integration Tests</li>
        <ul>
          <li>clear()</li>
          <ul>
            <li>
              should call "taskService.clearDoneTasksInDB()" to clear the list
              of completed tasks from "tasksList$"
            </li>
          </ul>
        </ul>
        <ul>
          <li>Template</li>
          <ul>
            <li>
              should render 2 elements of "div.container" with Child Components
            </li>
          </ul>
          <ul>
            <li>should render Child Components templates content</li>
          </ul>
        </ul>
      </ul>
    </li>
    <li>
      AddTaskComponent
      <ul>
        <li>Isolated Unit Tests</li>
        <ul>
          <li>should create Component Instance and its defined Template</li>
        </ul>
        <ul>
          <li>add()</li>
          <ul>
            <li>should call "TaskService.add()"</li>
          </ul>
          <ul>
            <li>
              should create a new Task object and pass it to "TaskService.add()"
              as param
            </li>
          </ul>
          <ul>
            <li>
              should clear the content of the "newTask" property at the end of
              execution
            </li>
          </ul>
        </ul>
        <ul>
          <li>Template/ShallowUnitTest</li>
          <ul>
            <li>should render multiple slots with &lt;ng-content&gt;</li>
          </ul>
          <ul>
            <li>should render properly defined &lt;input&gt; element</li>
          </ul>
          <ul>
            <li>
              should render &lt;input&gt; element with [(ngModel)] two-way data
              Binding with property "newTask"
            </li>
          </ul>
          <ul>
            <li>
              should render button with event-binding "(click)" for method
              "add()"
            </li>
          </ul>
        </ul>
      </ul>
      <ul>
        <li>Integration Tests</li>
        <ul>
          <li>add()</li>
          <ul>
            <li>
              should call "TaskService.add()" which will add a new task with
              "_id" received after calling "HttpService.saveOneTask()" sending
              requests to API
            </li>
          </ul>
        </ul>
      </ul>
    </li>
    <li>
      DoneTaskComponent
      <ul>
        <li>Isolated Unit Tests</li>
        <ul>
          <li>should create Component Instance</li>
        </ul>
        <ul>
          <li>should be init with empty Array of "tasksDone" property</li>
        </ul>
        <ul>
          <li>should be init with false value for "tasksExist" property</li>
        </ul>
        <ul>
          <li>ngOnInit()</li>
          <ul>
            <li>
              should initialize the "Task[]" array as the value of the
              "tasksDone" property from the returned and filtered array from
              "Observable&lt;Task[]&gt;" when subscribing to
              "tasksService.getTaskList$()"
            </li>
          </ul>
        </ul>
        <ul>
          <li>Template/ShallowUnitTest</li>
          <ul>
            <li>Tasks Not Exist</li>
            <ul>
              <li>
                should not render div "#tasksDoneTemplate" if Tasks Behavior
                Subject has no Elements
              </li>
            </ul>
          </ul>
          <ul>
            <li>Tasks Exist</li>
            <ul>
              <li>
                should render div "#tasksDoneTemplate" if Tasks Behavior Subject
                has Elements
              </li>
            </ul>
            <ul>
              <li>
                should render Paragraph Element with info about number of
                Completed Tasks
              </li>
            </ul>
            <ul>
              <li>
                should render &lt;ol&gt; with the same number of &lt;li&gt;
                elements as the number of completed tasks
              </li>
            </ul>
            <ul>
              <li>
                should in &lt;li&gt; render &lt;div&gt; with name property
                content of tasks if "task" has "end" property which is used in
                [appDate] pipe
              </li>
            </ul>
          </ul>
        </ul>
      </ul>
      <ul>
        <li>Integration Tests</li>
        <ul>
          <li>ngOnInit()</li>
          <ul>
            <li>
              should initialize the "Task[]" array as the value of the
              "tasksDone" property from the returned and filtered array from
              "Observable&lt;Task[]&gt;" when subscribing to
              "tasksService.getTaskList$()"
            </li>
          </ul>
        </ul>
        <ul>
          <li>Template</li>
          <ul>
            <li>
              should render div "#tasksDoneTemplate" if Tasks Behavior Subject
              has Elements
            </li>
          </ul>
          <ul>
            <li>
              should render Paragraph Element with info about number of
              Completed Tasks
            </li>
          </ul>
          <ul>
            <li>
              should render &lt;ol&gt; with the same number of &lt;li&gt;
              elements as the number of completed tasks
            </li>
          </ul>
          <ul>
            <li>
              should in &lt;li&gt;render &lt;div&gt; with name property content
              of tasks if "task" has "end" property which is used in [appDate]
              pipe
            </li>
          </ul>
        </ul>
      </ul>
    </li>
    <li>
      TodoTaskComponent
      <ul>
        <li>Isolated Unit Tests</li>
        <ul>
          <li>should create Component Instance</li>
        </ul>
        <ul>
          <li>should be init with empty Array of "tasksList" property</li>
        </ul>
        <ul>
          <li>should be init with false value for "tasksExist" property</li>
        </ul>
        <ul>
          <li>Component Initialization:</li>
          <ul>
            <li>ngOnInit()</li>
            <ul>
              <li>
                should initialize the "Task[]" array as the value of the
                "tasksDone" property from the returned and filtered array from
                "Observable&lt;Task[]&gt;" when subscribing to
                "tasksService.getTaskList$()"
              </li>
            </ul>
          </ul>
          <ul>
            <li>remove()</li>
            <ul>
              <li>
                should call "taskService.remove()" method with "task" to remove
                in params
              </li>
            </ul>
          </ul>
          <ul>
            <li>done()</li>
            <ul>
              <li>
                should call "taskService.done()" method with "task" in params to
                mark it as done
              </li>
            </ul>
          </ul>
          <ul>
            <li>setSelector()</li>
            <ul>
              <li>
                should return "green" or "red" if the number of "tasksList"
                elements is equal or greater than 5 or less
              </li>
            </ul>
          </ul>
        </ul>
        <ul>
          <li>Template/ShallowUnitTest</li>
          <ul>
            <li>Tasks Not Exist</li>
            <ul>
              <li>
                should not render div "#tasksToDoTemplate" if Tasks Behavior
                Subject has no Elements
              </li>
            </ul>
          </ul>
          <ul>
            <li>Only Completed Tasks Exist</li>
            <ul>
              <li>
                should render only #noTask "TemplateRef" if all Tasks are
                completed
              </li>
            </ul>
          </ul>
          <ul>
            <li>Tasks "ToDo" and "Done" Exist</li>
            <ul>
              <li>
                should render div "#tasksToDoTemplate" if "tasksExists" property
                is true
              </li>
            </ul>
            <ul>
              <li>Paragraph with number of TO-DO tasks</li>
              <ul>
                <li>should render info about number of Uncompleted Tasks</li>
              </ul>
              <ul>
                <li>
                  should have style changed with [ngStyle] condition if it has
                  equal or greater than 5 or less
                </li>
              </ul>
            </ul>
            <ul>
              <li>TaskList ToDo</li>
              <ul>
                <li>
                  should render "ol#taskToDoList" with the same number of
                  &lt;li&gt; elements as the number of Uncompleted tasks
                </li>
              </ul>
              <ul>
                <li>
                  should in &lt;li&gt; render &lt;p&gt; with name property
                  content of tasks if "task" has "created" property which is
                  used in [appDate] pipe
                </li>
              </ul>
              <ul>
                <li>
                  should change class with [ngClass] condition if it is odd or
                  last of list element
                </li>
              </ul>
              <ul>
                <li>
                  should render "Remove" button with defined class and "click"
                  event which handle "remove()" method for each
                </li>
              </ul>
              <ul>
                <li>
                  should render "Done" button with defined class and "click"
                  event which handle "done()" method for each
                </li>
              </ul>
            </ul>
          </ul>
        </ul>
      </ul>
      <ul>
        <li>Integration Tests</li>
        <ul>
          <li>Component Initialization:</li>
          <ul>
            <li>ngOnInit()</li>
            <ul>
              <li>
                should initialize the "Task[]" array as the value of the
                "tasksDone" property from the returned and filtered array from
                "Observable&lt;Task[]&gt;" when subscribing to
                "tasksService.getTaskList$()"
              </li>
            </ul>
          </ul>
          <ul>
            <li>remove()</li>
            <ul>
              <li>
                should remove given task from "tasksList[]" param elements
              </li>
            </ul>
          </ul>
          <ul>
            <li>done()</li>
            <ul>
              <li>
                should call "taskService.done()" method with "task" in params to
                mark it as done
              </li>
            </ul>
          </ul>
          <ul>
            <li>setSelector()</li>
            <ul>
              <li>
                should return "green" or "red" if the number of "tasksList"
                elements is equal or greater than 5 or less
              </li>
            </ul>
          </ul>
        </ul>
        <ul>
          <li>Template</li>
          <ul>
            <li>Tasks "ToDo" and "Done" Exist</li>
            <ul>
              <li>
                should render div "#tasksToDoTemplate" if "tasksExists" property
                is true
              </li>
            </ul>
            <ul>
              <li>Paragraph with number of TO-DO tasks</li>
              <ul>
                <li>should render info about number of Uncompleted Tasks</li>
              </ul>
              <ul>
                <li>
                  should have style changed with [ngStyle] condition if it has
                  equal or greater than 5 or less
                </li>
              </ul>
            </ul>
            <ul>
              <li>TaskList ToDo</li>
              <ul>
                <li>
                  should render "ol#taskToDoList" with the same number of
                  &lt;li&gt; elements as the number of Uncompleted tasks
                </li>
              </ul>
              <ul>
                <li>
                  should in &lt;li&gt; render &lt;p&gt; with name property
                  content of tasks if "task" has "created" property which is
                  used in [appDate] pipe
                </li>
              </ul>
              <ul>
                <li>
                  should change class with [ngClass] condition if it is odd or
                  last of list element
                </li>
              </ul>
              <ul>
                <li>
                  should render "Remove" button with defined class and "click"
                  event which handle "remove()" method for each
                </li>
              </ul>
              <ul>
                <li>
                  should render "Done" button with defined class and "click"
                  event which handle "done()" method for each
                </li>
              </ul>
            </ul>
          </ul>
        </ul>
      </ul>
    </li>
    <li>
      HttpService
      <ul>
        <li>getTasks()</li>
        <ul>
          <li>
            should send expected body to get expected response from API when
            "getTasks()" is called
          </li>
        </ul>
      </ul>
      <ul>
        <li>saveOneTask()</li>
        <ul>
          <li>
            should send expected body with the task to API to save it and
            receive "_id" value for it
          </li>
        </ul>
      </ul>
      <ul>
        <li>removeDoneTasksFromDB()</li>
        <ul>
          <li>
            should send expected body to remove all Completed Tasks in API
          </li>
        </ul>
      </ul>
      <ul>
        <li>updateOneTaskToDone()</li>
        <ul>
          <li>
            should send expected body with the task marking it as completed in
            API
          </li>
        </ul>
      </ul>
      <ul>
        <li>removeOneTask()</li>
        <ul>
          <li>should send expected body to remove one task from API</li>
        </ul>
      </ul>
    </li>
    <li>
      TasksService
      <ul>
        <li>Isolated Unit Tests</li>
        <ul>
          <li>constructor()</li>
          <ul>
            <li>
              should call private method "getTasksFromDB()" when is initialized
            </li>
          </ul>
        </ul>
        <ul>
          <li>getTasksFromDB()</li>
          <ul>
            <li>
              should pass received Array Tasks into private BehaviorSubject
              "tasksList$"
            </li>
          </ul>
        </ul>
        <ul>
          <li>getTaskList$()</li>
          <ul>
            <li>
              should return an array from the private property "taskList$"
            </li>
          </ul>
        </ul>
        <ul>
          <li>add()</li>
          <ul>
            <li>
              should call "httpService.saveOneTask()" method only one time with
              given Param
            </li>
          </ul>
          <ul>
            <li>should add a new Task to The Existing "taskList$" property</li>
          </ul>
        </ul>
        <ul>
          <li>remove()</li>
          <ul>
            <li>
              should call "httpService.removeOneTask()" method only one time
              with given Param
            </li>
          </ul>
          <ul>
            <li>
              should remove element which was given in Param from "taskList$"
              property
            </li>
          </ul>
        </ul>
        <ul>
          <li>done()</li>
          <ul>
            <li>
              should call "httpService.updateOneTaskToDone()" method only one
              time with given Param
            </li>
          </ul>
          <ul>
            <li>
              should update the "isDone" to true for the element in "taskList$"
              property
            </li>
          </ul>
          <ul>
            <li>
              should set string data in the "end" property for the element in
              "taskList$" property
            </li>
          </ul>
          <ul>
            <li>
              should be string date created from Date type using
              "toLocaleString()" method
            </li>
          </ul>
        </ul>
        <ul>
          <li>clearDoneTaskInDB()</li>
          <ul>
            <li>
              should call "httpService.removeDoneTasksFromDB()" only one time
              without Params"
            </li>
          </ul>
          <ul>
            <li>should also remove only completed tasks from "tasksList$"</li>
          </ul>
        </ul>
      </ul>
      <ul>
        <li>Integration Tests</li>
        <ul>
          <li>constructor()</li>
          <ul>
            <li>
              should call private method "getTasksFromDB()" when is initialized
              to send "POST" method
            </li>
          </ul>
        </ul>
        <ul>
          <li>getTasksFromDB()</li>
          <ul>
            <li>
              should pass received Array Task into private BehaviorSubject
              "tasksList$"
            </li>
          </ul>
        </ul>
        <ul>
          <li>getTaskList$()</li>
          <ul>
            <li>
              should return an array from the private property "taskList$"
            </li>
          </ul>
        </ul>
        <ul>
          <li>add()</li>
          <ul>
            <li>
              should call "httpService.saveOneTask() to send "POST" method"
            </li>
          </ul>
          <ul>
            <li>
              should add a new Task to The Existing "taskList$" property with
              received ID from response
            </li>
          </ul>
        </ul>
        <ul>
          <li>remove()</li>
          <ul>
            <li>
              should call "httpService.removeOneTask()" to send "POST" method
            </li>
          </ul>
          <ul>
            <li>
              should remove element which was given in Param from "taskList$"
              property
            </li>
          </ul>
        </ul>
        <ul>
          <li>done()</li>
          <ul>
            <li>
              should call "httpService.updateOneTaskToDone() to send "POST"
              method"
            </li>
          </ul>
          <ul>
            <li>
              should update the "isDone" to true for the element in "taskList$"
              property
            </li>
          </ul>
          <ul>
            <li>
              should set string data in the "end" property for the element in
              "taskList$" property
            </li>
          </ul>
          <ul>
            <li>
              should be string date created from Date type using
              "toLocaleString()" method
            </li>
          </ul>
        </ul>
        <ul>
          <li>clearDoneTaskInDB()</li>
          <ul>
            <li>
              should call "httpService.removeDoneTasksFromDB()" to send "POST"
              method
            </li>
          </ul>
          <ul>
            <li>should remove only completed tasks from "tasksList$"</li>
          </ul>
        </ul>
      </ul>
    </li>
    <li>
      CheckedDirective
      <ul>
        <li>Isolated Unit Tests</li>
        <ul>
          <li>
            should attach the "appChecked" directive to the element as an
            attribute
          </li>
        </ul>
        <ul>
          <li>
            should add defined CSS styles to mark "li" items from "Task[]" as
            done
          </li>
        </ul>
      </ul>
      <ul>
        <li>Integration Tests</li>
        <ul>
          <li>
            should attach the "appChecked" directive to the element as an
            attribute
          </li>
        </ul>
        <ul>
          <li>
            should add defined CSS styles to mark "li" items from "Task[]" as
            done
          </li>
        </ul>
      </ul>
    </li>
    <li>
      DateDirective
      <ul>
        <li>Isolated Unit Tests</li>
        <ul>
          <li>should not append the "Paragraph" if element was initialized</li>
        </ul>
        <ul>
          <li>mouseEnter()</li>
          <ul>
            <li>should append a "Paragraph" child when element is hovered</li>
          </ul>
          <ul>
            <li>
              should set a "Date: " with string value into "Paragraph" from
              "appDate" Attribute Property
            </li>
          </ul>
          <ul>
            <li>should contain defined CSS styles</li>
          </ul>
        </ul>
        <ul>
          <li>mouseLeave()</li>
          <ul>
            <li>
              should remove a "Paragraph" child when mouse leave an element
            </li>
          </ul>
        </ul>
      </ul>
      <ul>
        <li>Integration Tests</li>
        <ul>
          <li>should not append the "Paragraph" if element was initialized</li>
        </ul>
        <ul>
          <li>mouseEnter()</li>
          <ul>
            <li>should append a "Paragraph" child when element is hovered</li>
          </ul>
          <ul>
            <li>
              should set a "Date: " with string value into "Paragraph" from
              "appDate" Attribute Property
            </li>
          </ul>
          <ul>
            <li>should contain defined CSS styles</li>
          </ul>
        </ul>
        <ul>
          <li>mouseLeave()</li>
          <ul>
            <li>
              should remove a "Paragraph" child when mouse leave an element
            </li>
          </ul>
        </ul>
      </ul>
    </li>
    <li>
      SortNamePipe
      <ul>
        <li>should create an instance</li>
      </ul>
      <ul>
        <li>should sort Task[] by name</li>
      </ul>
    </li>
    <li>
      TransformTaskPipe
      <ul>
        <li>should create an Instance</li>
      </ul>
      <ul>
        <li>
          should change the first letter to uppercase and append the optional
          string parameter to the end of the string
        </li>
      </ul>
    </li>
  </ol>
</div>
