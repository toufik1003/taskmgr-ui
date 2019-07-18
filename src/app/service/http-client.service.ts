import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Task {
  constructor(
    public taskId: String = "0",
    public taskName: String = "default",
    public parentTaskId: String = "0",
    public parentTaskName: String = "parent_default",
    public priority: String = "0",
    public startDate: String = "1901-01-01",
    public endDate: String = "2099-01-01",
    public taskEnded?: Boolean,
    public parentTask?: ParentTask
  ) { }
}

export class ParentTask {
  constructor(
    public parentTaskId: String = "0",
    public parentTaskName: String = "default",
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient) { }

  getAllTasks(task: Task) {
    //console.log("get all tasks : ", task);
    return this.httpClient.post<Task[]>('http://localhost:8081/taskmanager-srv/searchTask', task);
  }

  getAllParentTasks() {
    return this.httpClient.get<ParentTask[]>('http://localhost:8081/taskmanager-srv/getAllParentTask');
  }

  createTask(task: Task) {
    //console.log("creating task : ", task);
    return this.httpClient.post<Task>('http://localhost:8081/taskmanager-srv/saveTask', task);
  }

  getTaskById(id: String) {
    //console.log("get task by id : ", id);
    return this.httpClient.get<Task>('http://localhost:8081/taskmanager-srv/getTaskById/' + id);
  }

  endTask(id: String) {
    //console.log("end task by id : ", id);
    return this.httpClient.get('http://localhost:8081/taskmanager-srv/endTask/' + id);
  }

}
