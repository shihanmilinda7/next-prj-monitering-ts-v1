export type CategoryDetailObj = {
    categorydetailid?:number;
    categoryid?:number ;  
    categorydetailname?:string ;  
}

export type CategoryObj = {
    categoryid?:number;
    categoryname?:string ;  
    categoryValues?: CategoryDetailObj[];
}

export type CategoryObjMap = {
    categoryid?:number;
    categoryname?:string ;  
    categoryValues: CategoryDetailObj[];
}
