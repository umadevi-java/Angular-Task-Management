import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProjectService } from '../../projects.service';
import { Task } from '../../task.model';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  
  
  projIndex : number;
  taskIndex : number;
  editMode = false;

  taskForm : FormGroup;

  constructor(private route : ActivatedRoute, 
              private projSvc : ProjectService,
              private router : Router) { }

  ngOnInit() {
    
     this.route.params.subscribe(
     (params : Params) => {
     
          this.projIndex = +this.route.parent.snapshot.params['id'];
          console.log('halooo proj id'+this.projIndex);
          this.taskIndex = +params['tId'];
          this.editMode = params['tId'] != null
          this.initForm();
     }
   );
  }

initForm(){
  
 let taskName : String;
 let startDate : Date;
 let endDate :Date;
 let completion : number;
 let taskUsers = new FormArray([]);

    if(this.editMode){
      console.log('in task edit component' +this.projIndex);
      const taskObj = this.projSvc.getTask(this.projIndex, this.taskIndex);
      taskName = taskObj.taskName;
      startDate = taskObj.startDate;
      endDate = taskObj.endDate;
      completion = taskObj.completion;
      if(taskObj.users){
        for(let user of taskObj.users){
          
          taskUsers.push(new FormGroup({
              userName : new FormControl(user.userName, Validators.required),
              allocatedHours : new FormControl(user.allocatedHours, Validators.required) })
              );
        }
      }
      this.taskForm = new FormGroup({
        'taskName' : new FormControl(taskName, Validators.required),
        'startDate' : new FormControl(startDate.toISOString().substring(0,10), Validators.required),
        'endDate'  : new FormControl(endDate.toISOString().substring(0,10), Validators.required),
        'completion' : new FormControl(completion, Validators.required),
        'users' : taskUsers
      });

    }
    else{
      this.taskForm = new FormGroup({
        'taskName' : new FormControl('', Validators.required),
        'startDate' : new FormControl(null, Validators.required),
        'endDate'  : new FormControl(null, Validators.required),
        'completion' : new FormControl('', Validators.required),
        'users' : taskUsers
      });
    }
    
  }

  get controls(){
    return (<FormArray>this.taskForm.get('users')).controls;
  }

  onAssignTask(){
    (<FormArray>this.taskForm.get('users')).
            push(new FormGroup({
              userName : new FormControl(null),
              allocatedHours : new FormControl(null)
            }))
  }

  onSubmit(){
  
    const updatedTask = new Task(
      this.taskForm.value['taskName'],
      new Date(this.taskForm.value['startDate'] + "Z"),
      new Date(this.taskForm.value['endDate'] + "Z"),
      100,
      this.taskForm.value['completion'],
      this.taskForm.value['users']
    );
    
    if(this.editMode){
      this.projSvc.updateTask(this.projIndex,this.taskIndex, updatedTask);
    }else{
    //when the html names matches with the model name , just pass the form values, 
    //but here we need tochange the date format
    //this.projSvc.addTask(this.projIndex, this.taskForm.value)
      this.projSvc.addTask(this.projIndex, updatedTask);
    }
    this.navigateBack();
  }

  onCancel(){
      this.navigateBack();
  }
  navigateBack(){
      this.router.navigate(['/projects',this.projIndex,'tasks']);
  }

  onDelUser(index : number){
    (<FormArray>this.taskForm.get('users')).removeAt(index);
  }

}
