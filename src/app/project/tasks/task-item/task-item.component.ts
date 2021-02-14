import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProjectService } from '../../projects.service';
import { Task } from '../../task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() task : Task;
  @Input() index : number;
  projIndex : number;

  constructor(private router: Router,
              private route : ActivatedRoute,
              private projectService : ProjectService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params : Params) => {
        this.projIndex = +params['id'];

      }
    );
    
  }
  onDeleteTask(){
    this.projectService.deleteTask(this.projIndex, this.index);
  }
  onEditTask(){
    this.router.navigate([this.index,'edit'],{relativeTo:this.route,  queryParamsHandling: 'preserve'});
  }


}
