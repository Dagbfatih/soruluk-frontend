import { Branch } from "../entities/branch";

export interface CustomerDetailsDto{
    customerId:number;
    userId:number;
    roleId:number;
    roleName:string;
    firstName:string;
    lastName:string;
    email:string;
    status:boolean;
    isConfirmed:boolean;
    branch:Branch;
}