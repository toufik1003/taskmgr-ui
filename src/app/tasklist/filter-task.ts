import { Injectable } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'taskFilterPipe'
})

@Injectable({
    providedIn: 'root'
})
export class TaskFilter implements PipeTransform {
    constructor(private dateTransformer: DatePipe) { }

    transform(tasks: any,
        taskName: String,
        parentTaskName: String,
        startDate: String,
        endDate: String,
        priorityFrom: Number,
        priorityTo: Number) {
        return tasks
            .filter(task => task.taskName.toLowerCase().indexOf(taskName.toLowerCase()) !== -1)
            .filter(task => {
                var pTaskObj = task.parentTask;
                //console.log(pTaskObj);
                if (parentTaskName === "") {
                    //console.log("this record matched because no input provided !", task);
                    return true;
                }
                else if (pTaskObj != null && pTaskObj.parentTaskName.toLowerCase().indexOf(parentTaskName.toLowerCase()) !== -1) {
                    //console.log("this record matched because parent task exists & it is matching with input !", task);
                    return true;
                } else {
                    return false;
                }
            })
            .filter(task => {
                var priorityFromN = Number(priorityFrom);
                var priorityToN = Number(priorityTo);
                //console.log(priorityFromN, priorityToN);
                if (priorityFromN === 0 && priorityToN === 0) {
                    //console.log("this record matched as none are provided");
                    return true;
                } else {
                    if (priorityFromN > 0 && priorityToN > 0) {
                        //console.log("both are provided");
                        return task.priority >= priorityFromN && task.priority <= priorityToN;
                    } else if (priorityFromN > 0 && priorityToN === 0) {
                        //console.log("priority from provided");
                        return task.priority >= priorityFromN;
                    } else {
                        //console.log("priority to provided");
                        return task.priority <= priorityToN;
                    }
                }
            })
            .filter(task => {
                var input_s_date = new Date(this.dateTransformer.transform(startDate, "MMM dd, yyyy"));
                var input_e_date = new Date(this.dateTransformer.transform(endDate, "MMM dd, yyyy"));
                var task_s_date = new Date(this.dateTransformer.transform(task.startDate, "MMM dd, yyyy"));
                var task_e_date = new Date(this.dateTransformer.transform(task.endDate, "MMM dd, yyyy"));
                if (input_s_date === null && input_e_date === null) {
                    //console.log("this record matched as none are provided");
                    return true;
                } else {
                    if (input_s_date != null && input_e_date != null) {
                        //console.log("both are provided");
                        return task_s_date >= input_s_date && task_e_date <= input_e_date;
                    } else if (input_s_date != null && input_e_date === null) {
                        //console.log("start-date provided");
                        return task_s_date >= input_s_date;
                    } else {
                        //console.log("end-date provided");
                        return task_e_date <= input_e_date;
                    }
                }
            });
    }
}