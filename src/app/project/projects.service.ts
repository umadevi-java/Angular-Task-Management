
import { Subject } from "rxjs";
import { Project } from "./project.model";
import { Task } from "./task.model";
import { TasksComponent } from "./tasks/tasks.component";
import { User } from "./user.model";
export class ProjectService {
tasks : Task[];
tasksChanged = new Subject<Task[]>();
projects : Project[] = [
    new Project('CRM',
                 [new Task('CRM-Reqt Analysis',new Date('August 19, 2020 23:15:30 UTC20'),new Date('August 29, 2021 23:15:30 UTC'),140,20,
                            [ 
                              new User(1,'Max',35),
                              new User(3,'Santos',35)
                            ]
                          ),
                 new Task('Design',new Date(),new Date(),240,0,
                            [
                              new User(1,'Max',20),
                              new User(2,'Annee',15)
                            ]
                        )  
                ]

            ),
     new Project('Dashboard',
            [new Task('DReqt Analysis',new Date(),new Date(),140,30,
                       [ 
                         new User(1,'Max',35),
                         new User(3,'Santos',35)
                       ]
                     ),
            new Task('Design',new Date(),new Date(),240,0,
                       [
                         new User(1,'Max',20),
                         new User(2,'Annee',15)
                       ]
                   )  
           ]

       )
];

basicProjDetails(){
 return this.projects.slice();
}

getProject(projId : number){
  
  const specProject =this.projects[projId];
  //const specProject =  this.projects
  console.log('whats the name' +specProject.projName);
  return specProject
  }

getTask(projId:number, taskId : number){
  console.log('Task details'+taskId);
  const specProject =this.projects[projId];
     return specProject.tasks[taskId]
  }

getTasks(projId : number){
  //const specProject =this.projects[Project[projId]];
  const specProject =this.projects[projId];
  if(specProject.tasks != null){
    // in order to update the list of tasks as and when changed, dont use slice just as below
    //return specProject.tasks
    // but for learning we will use slice and then use Subject and next to reflect there
   
   return specProject.tasks.slice();
  }
}

addTask(projId : number, task : Task){
  const specProj = this.projects[projId];
  specProj['tasks'].push(task);
  this.tasksChanged.next(specProj['tasks']);
}

updateTask(projIndex : number, taskIndex: number, task){
  const selectedProject = this.projects[projIndex];
  selectedProject['tasks'][taskIndex] = task;
  this.tasksChanged.next(selectedProject['tasks']);
}

deleteTask(projIndex : number, taskIndex: number){
  const selectedProj = this.projects[projIndex];
  selectedProj.tasks.splice(taskIndex,1);
  this.tasksChanged.next(selectedProj['tasks']);
}

}