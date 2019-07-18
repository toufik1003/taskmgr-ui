import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasklistComponent } from './tasklist/tasklist.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { EdittaskComponent } from './edittask/edittask.component';

const routes: Routes = [
  { path: '', component: TasklistComponent },
  { path: 'add-task', component: AddtaskComponent },
  { path: 'edit-task/:id', component: EdittaskComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
