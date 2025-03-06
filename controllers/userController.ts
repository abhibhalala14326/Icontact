import { Request, Response } from "express";
import { IUser } from "../model/IUser";
import { User } from "../DataBase/userSchema";
import { validationResult } from "express-validator";
import bcryptjs from 'bcryptjs'
import gravatar from 'gravatar'
import jwt from 'jsonwebtoken'

/**
@usage :  Get all user
@method : GET
@params : not - params
@url : http://127.0.0.1:9977/user
 **/

export const getAllUsers = async (req: Request, res: Response) => {

    try {
        let user: IUser[] | undefined = await User.find();

        if (user) {
            return res.json({
                data: user,
                success: true
            })
        }

    } catch (error: any) {
        console.error("Error retrieving group:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }


}


/**
@usage :  Get a user
@method : GET
@params : UserID
@url : http://127.0.0.1:9977/user/userId
 */

export const getUsers = async (req: Request, res: Response) => {

    try {
        let { id } = req.params
        let user: IUser[] | null | undefined = await User.findById(id);

        if (user) {
            return res.json({
                data: user,
                success: true,

            })
        }

    } catch (error) {
        console.error("Error retrieving group:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
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
                msg: 'create a user',
                success: true


            })
        }

    } catch (error) {
        console.error("Error retrieving group:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
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
                msg: "user updated successfully",
                success: true

            })
        }
    } catch (error) {
        console.error("Error retrieving group:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }

}

/**
@usage :  Delete a user
@method : Delete
@params :UserId
@url : http://127.0.0.1:9977/user/UserId
 */


export const UserDelete = async (req: Request, res: Response) => {
    try {
        let { id } = req.params;

        const userDelete: IUser | null | undefined = await User.findByIdAndDelete(id)

        if (!userDelete) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: userDelete,
            msg: "User deleted successfully",
        });
    } catch (error) {
        console.error("Error retrieving group:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }

}




export const userRegister = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let { username, email, password, isAdmin } = req.body;

        // Check if the user already exists
        const userObj = await User.findOne({ email });
        if (userObj) {
            return res.status(409).json({
                data: null,
                msg: "The user already exists"
            });
        }

        // Password encryption
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        // Generate avatar image URL
        const imageUrl = gravatar.url(email, {
            size: "200",
            rating: "pg",
            default: "mm"
        });

        // Create new user object
        const newUser = new User({
            username,
            email,
            password: hashPassword,
            imageUrl,
            isAdmin
        });

        // Save user to database
        const theUserObj = await newUser.save();

        return res.status(201).json({
            data: theUserObj,
            msg: "Registration is successfull"
        });

    } catch (e) {
        return res.status(500).json({
            data: null,
            error: e || "Internal Server Error"
        });
    }
};




export const userLogin = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let { email, password } = req.body;

        // Check if the user already exists
        const userObj = await User.findOne({ email });
        if (!userObj) {
            return res.status(409).json({
                data: null,
                msg: "The user already exists"
            });
        }


        // Password compare
        const IsMatch: boolean = await bcryptjs.compare(password, userObj.password)

        if (!IsMatch) {

            return res.status(500).json({
                data: null,
                error: "Invalid Password"
            })
        }

        // create a token 

        const secretKey: string | undefined = process.env.JWR_SECRET_KEY;
        const payload: any = {
            user: {
                id: userObj._id,
                email: userObj.email
            }
        }

        if (secretKey && payload) {
            jwt.sign(payload, secretKey, {
                expiresIn: 100000000000
            }, (error, encoded) => {
                if (error) throw error
                if (encoded) {
                    return res.status(200).json({
                        data: userObj,
                        token: encoded,
                        msg: 'Login is Success!'
                    })
                }
            })
        }
        

    } catch (e) {
        return res.status(500).json({
            data: null,
            error: e || "Internal Server Error"
        });
    }
};