import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Project } from '../project.model';
import { ProjectService } from '../projects.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  projId : number;
  tasks : Task[];
  projName : string = null;
  index : number;
  
  taskListForm : FormGroup;



  constructor(private projSvc: ProjectService,
              private route: ActivatedRoute,
              private router : Router
              ) { }

  ngOnInit() {
    console.log('loading first time');
    this.route.params.
    subscribe(
      (params : Params) => {
    
        this.projId = +params['id'];
        this.initForm();

     }
    );
 
  }

  initForm(){
    
      const projObj = this.projSvc.getProject(this.projId);
      this.projName = projObj.projName;
     
      if(projObj.tasks != null){
        this.tasks = this.projSvc.getTasks(this.projId);

        //get the list of tasks whenever there is a change
        this.projSvc.tasksChanged.
        subscribe(
          (tasks : Task[]) => {
              this.tasks = tasks;
          }
        );
      }
    
  }
  onCreateTask(){
    this.router.navigate(['new'],{relativeTo : this.route})
  }
  
 
}


