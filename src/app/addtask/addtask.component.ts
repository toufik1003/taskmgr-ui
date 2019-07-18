import { Component, OnInit } from '@angular/core';
import { Task, HttpClientService } from '../service/http-client.service';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {

  task: Task = new Task("0", "", "0", "", "0", "", "");
  parentTaskList: String[];

  constructor(private httpClientService: HttpClientService) { }

  ngOnInit() {
    this.httpClientService.getAllParentTasks().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
  }

  handleSuccessfulResponse(response) {
    //console.log(response);
    this.parentTaskList = response;
  }

  createTask(): void {
    //console.log("task to be created : ", this.task);
    this.httpClientService.createTask(this.task)
      .subscribe(
        response => {
          alert("Task created successfully !");
        },
        error => {
          alert("Error in Task creation !!!");
        }
      );

  };

}
