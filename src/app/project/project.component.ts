import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from './project.model';
import { ProjectService } from './projects.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
projects : Project[];

  constructor(private projSvc : ProjectService,
              private route : ActivatedRoute,
              private router : Router ) { }

  ngOnInit(): void {
    this.projects = this.projSvc.basicProjDetails();

  }

  clickLink(index : number){
    this.router.navigate(['/projects',index,'tasks'], {relativeTo : this.route,  queryParamsHandling: 'preserve'});
  }

}
