import { Component } from '@angular/core';
import { Todo } from 'src/app/model/todo';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  //Create variables for hold value
  taskObj: Todo = new Todo();
  taskArr: Todo[] = [];
  addTaskData: string = '';
  editTaskData: string = '';

  constructor(private api: TaskService) {}

  ngOnInit(): void {
    this.editTaskData=''
    this.addTaskData=''
    this.taskObj = new Todo();
    this.taskArr = [];
    this.getAllTask();
  }
  //create Task Data
  addTask() {
    this.taskObj.task = this.addTaskData;
    this.api.addTask(this.taskObj).subscribe(
      (result) => {
        console.log(result)
        this.ngOnInit();
        this.addTaskData = '';
      },
      (err) => {
        alert(err);
      }
    );
  }
  //Get All Task Data
  getAllTask() {
    this.api.getAllTask().subscribe(
      (result) => {
        this.taskArr = result;
      },
      (err) => {
        alert('unable to find task');
      }
    );
  }

  //Edit Todo
  editTask() {
    this.taskObj.task = this.editTaskData;
    this.api.editTask(this.taskObj).subscribe(
      (result) => {
        this.ngOnInit();
      },
      (err) => {
        alert('unable to edit task');
      }
    );
  }

  //Delete Task after complete

  deleteTask(task: Todo) {
    this.api.deleteTask(task).subscribe(
      (result) => {
        this.ngOnInit();
      },
      (err) => {
        alert('failed to delete');
      }
    );
  }
  //update property
  callEdit(task:Todo){
    this.taskObj = task;
    this.editTaskData = task.task;
  }
}
