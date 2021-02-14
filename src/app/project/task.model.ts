import { User } from "./user.model";

export class Task{
    constructor(
                public taskName : string,
                public startDate : Date,
                public endDate : Date,
                public taskDuration : number,
                public completion : number,
                public users : User[],
                public taskId?: number,
                ){}
}
