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

    try {
        let group: IContact[] | null | undefined = await ContectTable.find()

        if (group) {
            return res.json({
                success: true,
                data: group,
                message: "Fetch all contacts successfully"
            })

        }
    } catch (error) {
        console.error("Error fetching contacts:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }


}

/**
 @usage :  get a contacts
@method : GET
@params : contectId
@url : http://127.0.0.1:9977/contect/contactId
 */

export const getContact = async (req: Request, res: Response) => {
    try {
        let { id } = req.params
        let group: IContact[] | null | undefined = await ContectTable.findById(id)

        if (group) {
            return res.json({
                success: true,
                data: group,
                msg: "Fetch a contacts successfully"
            })
        }
    } catch (error) {
        console.error("Error fetching contacts:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
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

    const newContact: IContact | null | undefined = await new ContectTable({
        user: user,
        name: name,
        imageUrl: imageUrl,
        mobile: mobile,
        company: company,
        email: email,
        title: title,
        groupId: groupId
    }).save()

    const savedContact = newContact

    if (savedContact) {
        return res.json({
            data: newContact,
            msg: "Contact created successfully "
        })
    }

}


/**  
@usage :  Update a Contact
@method : PUT
@params : contactId
@url : http://127.0.0.1:9977/contect/contactId
 */


export const updateContact = async (req: Request, res: Response) => {

    try {
        let { id } = req.params;
        let { user, name, imageUrl, mobile, company, email, title, groupId } = req.body;
        const theContacID = await ContectTable.findById(id);

        if (!theContacID) {

            return res.status(404).json({
                success: false,
                message: "Contact not found",
            })
        }

        const theContactUpadate: IContact | null | undefined = await ContectTable.findByIdAndUpdate(
            id,
            { user, name, imageUrl, mobile, company, email, title, groupId },
            { new: true }
        )

        return res.status(200).json({
            success: true,
            data: theContactUpadate,
            message: "Contact updated successfully",
        });

    } catch (error) {
        console.error("Error updating contact:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }



}


/**
 @usage :  Delete a Contact
@method : Delete
@params : contactId
@url : http://127.0.0.1:9977/contect/contactId
 */

export const deleteContact = async (req: Request, res: Response) => {
    try {
        let { id } = req.params;
        const thecontact: IContact | null | undefined = await ContectTable.findByIdAndDelete(id)

        if (!thecontact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found",
            });
        }
    } catch (error) {

    }

}