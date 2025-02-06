import { Request, Response } from "express";
import { IGroup } from "../model/IGroup";
import GroupsTable from "../DataBase/GroupSchema";




export const getAllGroup = async(req:Request , res:Response)=>
{
try {
    let groups:IGroup[] | undefined = await GroupsTable.find();
    if (groups) {
        return res.json(groups)
    } 
    
} catch (error:any) {
    return res.json({'msg':'Data is Not Found'});
}
}  