import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ProjectComponent } from './project/project.component';
import { TaskEditComponent } from './project/tasks/task-edit/task-edit.component';
import { TasksComponent } from './project/tasks/tasks.component';

const routes: Routes = [
  
  {path : 'projects', component : ProjectComponent, children :
     [{path : ':id/tasks', component : TasksComponent },
      {path : ':id/tasks/:tId/edit', component : TaskEditComponent },
      {path : ':id/tasks/new', component : TaskEditComponent }
     ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
