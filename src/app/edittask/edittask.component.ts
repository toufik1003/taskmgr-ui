import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task, HttpClientService } from '../service/http-client.service';

@Component({
  selector: 'app-edittask',
  templateUrl: './edittask.component.html',
  styleUrls: ['./edittask.component.css']
})
export class EdittaskComponent implements OnInit {

  task: Task = new Task("0", "", "0", "", "0", "", "");
  parentTaskList: String[];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private httpClientService: HttpClientService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      //console.log("task-id => ", params['id']);
      this.getTaskById(params['id']);
    });

    this.httpClientService.getAllParentTasks().subscribe(
      response => this.populateDropDown(response),
    );
  }

  populateDropDown(response) {
    //console.log(response);
    this.parentTaskList = response;
  }

  getTaskById(id: String): void {
    this.httpClientService.getTaskById(id)
      .subscribe(response => {
        //console.log(response);
        var isTaskEnd = response.taskEnded;
        //console.log("isTaskEnd : ", isTaskEnd);
        if (isTaskEnd) {
          alert("The Task is ended! You can't edit this Task");
        } else {
          this.task = response;
          if (this.task.parentTask != null) {
            //preselect the drop-down
            this.task.parentTaskId = this.task.parentTask.parentTaskId;
          }
          //console.log("value retreived from server : ", this.task);
        }
      })
  }

  createTask(): void {
    this.httpClientService.createTask(this.task)
      .subscribe(
        response => {
          alert("Task updated successfully !");
        },
        error => {
          alert("Error in Task updation !!!");
        }
      );
  };

}
