import { Component, ElementRef } from '@angular/core';
import { ProjectService } from './project/projects.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers : [ProjectService]
})
export class AppComponent {
  title = 'projectMngt';
  constructor(private elementRef: ElementRef){

  }
  ngAfterViewInit(){
   // this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'rgb(88, 92, 92)' ;
 }
}
