import { Request, Response } from "express";
import { IUser } from "../model/IUser";
import { User } from "../DataBase/userSchema";



/**
@usage :  get all user
@method : GET
@params : not - params
@url : http://127.0.0.1:9977/user
 **/

export const getAllUsers = async (req: Request, res: Response) => {

    try {
        let user: IUser[] | undefined = await User.find();

        if (user) {
            return res.json(user)
        }

    } catch (error) {
        return res.json({
            data: error
        })
    }


}


/**
@usage :  get a user
@method : GET
@params : UserID
@url : http://127.0.0.1:9977/user/userId
 */

export const getUsers = async (req: Request, res: Response) => {

    try {
        let {id} = req.params
        let user: IUser[] | null  | undefined= await User.findById(id);

        if (user) {
            return res.json(user)
        }

    } catch (error) {
        return res.json({
            data: error
        })
    }


}


/**
@usage :  create a user
@method : POST
@params :username, email, password, ImageUrl, isAdmin
@url : http://127.0.0.1:9977/user
 */

export const createUsers = async (req: Request, res: Response) => {
 try {

        let { username, email, password, imageUrl, isAdmin } = req.body;

        const createUser: IUser | null | undefined = await new User({

            username: username,
            email: email,
            password: password,
            imageUrl: imageUrl,
            isAdmin: isAdmin

        }).save()

        if (createUser) {
            return res.json({
                data: createUser,
                msg: 'create a user'
            })
        }

    } catch (error) {
        return res.json({

            msg: "create data error"
        })
    }

}


/**
@usage :  Update a user
@method : PUT
@params :userID
@url : http://127.0.0.1:9977/user/userID
 */


export const UserUpdate = async (req: Request, res: Response) => {
    try {
        let { id } = req.params;

        const { username, email, password, imageUrl, isAdmin } = req.body;

        let updateUser: IUser | null | undefined = await User.findByIdAndUpdate(
            id,
            { username, email, password, imageUrl, isAdmin },
            { new: true }
        )
        if (updateUser) {
            return res.json({
                data: updateUser,
                msg: "update a data"
            })
        }
    } catch (error) {
        return res.json({
            msg: error
        })
    }

}

/**
@usage :  Delete a user
@method : Delete
@params :UserId
@url : http://127.0.0.1:9977/user/UserId
 */


export const UserDelete = async (req: Request, res: Response) => {
    let { id } = req.params;

    const userDelele: IUser | null | undefined = await User.findByIdAndDelete(id)

    res.json(userDelele)
}