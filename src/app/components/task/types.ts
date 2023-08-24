export type TaskObj = {
    taskid?:number;
    staffid?:number;
    clientname?:string ;  
    categoryid?:number;   
    location?:string;   
    visitcount?:string;
}

// Extending the existing type
export type TaskObjExtend = TaskObj & {
    staffname?: string;
    categoryname?: string;
    status?: string;
  };
