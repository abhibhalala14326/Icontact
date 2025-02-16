import { Request, Response } from "express";
import { IContact } from "../model/IContact";
import { ContectTable } from "../DataBase/ContactSchema";


/**
@usage :  get all contacts
@method : GET
@params : not - params
@url : http://127.0.0.1:9977/contect
 */


export const getAllContact = async (req: Request, res: Response) => {
    let group: IContact[] | null | undefined = await ContectTable.find()

    if (group) {
        return res.json({
            data: group,
            msg: "get a all contect"
        })
  
    }
}

/**
 @usage :  get a contacts
@method : GET
@params : contectId
@url : http://127.0.0.1:9977/contect/contactId
 */

export const getContact = async (req: Request, res: Response) => {
    let {id} = req.params
    let group: IContact[] | null | undefined = await ContectTable.findById(id)

    if (group) {
        return res.json({
            data: group,
            msg: "get a  contect"
        })
    }
}


/**
@usage :  Create a Contact
@method : POST
@params :  user, name, imageUrl, mobile, company, email, title, groupId 
@url : http://127.0.0.1:9977/contect
 */

export const createContact = async (req: Request, res: Response) => {
    let { user, name, imageUrl, mobile, company, email, title, groupId } = req.body;

    const thecontact: IContact | null | undefined = await new ContectTable({
        user:user,
        name: name,
        imageUrl: imageUrl,
        mobile: mobile,
        company: company,
        email: email,
        title: title,
        groupId:groupId
    }).save()

    if (thecontact) {
        return res.json({
            data:thecontact,
            msg:"update a data "
        })
    }

}


/**  
@usage :  Update a Contact
@method : PUT
@params : contactId
@url : http://127.0.0.1:9977/contect/contactId
 */


export const updateContact = async(req:Request , res:Response)=>
{
    let {id} = req.params;
    let { user, name, imageUrl, mobile, company, email, title, groupId } = req.body;

    const thecontact:IContact | null | undefined = await  ContectTable.findByIdAndUpdate(
        id,
        { user, name, imageUrl, mobile, company, email, title, groupId },
       {new:true}
    )
    if (thecontact) {
        return res.json({
            data:thecontact,
            msg:"update a data"
        })
    }
}


/**
 @usage :  Delete a Contact
@method : Delete
@params : contactId
@url : http://127.0.0.1:9977/contect/contactId
 */

export const deleteContact = async (req: Request, res: Response) => {
    let { id } = req.params;



    const thecontact: IContact | null | undefined = await ContectTable.findByIdAndDelete(
        id
    )

    if (thecontact) {
        return res.json({
            data: thecontact,
            msg: "update a data"
        })
    }
}