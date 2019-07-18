import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EdittaskComponent } from './edittask/edittask.component';
import { TaskFilter } from './tasklist/filter-task';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    TasklistComponent,
    AddtaskComponent,
    HeaderComponent,
    EdittaskComponent,
    TaskFilter
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
