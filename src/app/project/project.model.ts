import { Task } from "./task.model";

export class Project{
    constructor(public projName : string,
               public tasks : Task[] ,
               public projId? : number){}
}
