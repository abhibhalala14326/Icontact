import { Request, Response } from "express";
import { IGroup } from "../model/IGroup";
import GroupsTable from "../DataBase/GroupSchema";
import mongoose from "mongoose";


/**
@usage :  get all contacts
@method : GET
@params : not-params
@url : http://127.0.0.1:9977/group
 */


export const getAllGroup = async (req: Request, res: Response) => {
    try {
        let groups: IGroup[] | undefined = await GroupsTable.find();
        if (groups) {
            return res.json(groups)
        }
    } catch (error: any) {
        return res.json({ 'msg': 'Data is Not Found' });
    }
}



/**
@usage:create group
@methods: POST
@params:name
@url:http://127.0.0.1:9977/groups

 */

export const createGroup = async (req: Request, res: Response) => {

    try {
        let { name } = req.body;
        console.log("create groupt", name);

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Group name is required",
            });
        }

        let theGroup: IGroup | null | undefined = await new GroupsTable({
            name: name,
        }).save();

        if (theGroup) {
            return res.status(200)
                .json({
                    data: theGroup,
                    msg: 'Group created successfully'
                })

        }
    } catch (error) {
        let { name } = req.body;
        console.log("create groupt", name);

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Group name is required",
            });
        }

        let theGroup: IGroup | null | undefined = await new GroupsTable({
            name: name,
        }).save();

        if (theGroup) {
            return res.status(200)
                .json({
                    data: theGroup,
                    msg: 'Group created successfully'
                })

        }
    }
   
}




/**
 * @usage  : get  a group
 * @methods: GET
 * @params: groupID
 * @url:http://127.0.0.1:9977/groups/groupID
*/


export const getGroup = async (req: Request, res: Response) => {
    try {
        let { groupId } = req.params;
        const mongoGroupId = new mongoose.Types.ObjectId(groupId);

        let theGroup: IGroup | undefined | null = await GroupsTable.findById(
            mongoGroupId
        )

        if (!theGroup) {
            return res.status(400).json({
                data: null,
                error: 'not Group id Found'
            })
        }

        return res.status(200).json(theGroup);

    } catch (error) {
        console.error("Error retrieving group:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
   }


