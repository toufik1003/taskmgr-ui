import { Component, OnInit } from '@angular/core';
import { HttpClientService, Task } from '../service/http-client.service';
import { TaskFilter } from './filter-task';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {

  tasks: String[]
  initData: String[]
  searchResult: String[]
  task: Task
  taskToSearch: Task = new Task("", "", "", "", "", "", "", false, null)

  constructor(private httpClientService: HttpClientService, private taskFilter: TaskFilter) { }

  ngOnInit() {
    this.task = new Task;
    this.httpClientService.getAllTasks(this.task).subscribe(
      response => this.handleSuccessfulResponse(response),
    );
  }

  handleSuccessfulResponse(response) {
    //console.log(response);
    this.tasks = response;
    this.initData = response;
    //console.log("all tasks : ", this.tasks);
  }

  searchTask(priFrm, priTo) {
    //console.log("inside searchTask -> ", this.taskToSearch);
    //console.log(priFrm, priTo);
    var sdate = this.taskToSearch.startDate;
    var edate = this.taskToSearch.endDate;
    if (this.taskToSearch.startDate === null || this.taskToSearch.startDate === '') {
      sdate = '1901-01-01';
    }
    if (this.taskToSearch.endDate === null || this.taskToSearch.endDate === '') {
      edate = '2099-12-31';
    }
    this.searchResult = this.taskFilter.transform(this.initData,
      this.taskToSearch.taskName,
      this.taskToSearch.parentTaskName,
      sdate,
      edate,
      priFrm,
      priTo);

    if (this.searchResult.length > 0) {
      //console.log("search result found");
      this.tasks = this.searchResult;
    } else {
      //console.log("no search result found !!!");
      this.tasks = [];
    }
  }

  endTask(task: Task): void {
    this.httpClientService.endTask(task.taskId)
      .subscribe(
        response => {
          alert("Task ended successfully !");
        },
        error => {
          alert("Error in Task updation !!!");
        }
      );
  }

}
