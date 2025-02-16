import { Router, Request, Response } from "express";
import { body } from "express-validator";
import * as UserController from '../controllers/userController'

// Create a router
const userRouter: Router = Router()

/**
@usage :  Get all user
@method : GET
@params : Not - Params
@url : http://127.0.0.1:9977/user
 **/

userRouter.get('/', async (req: Request, res: Response) => {
    await UserController.getAllUsers(req, res)
})


/**
@usage :  Get a User
@method : GET
@params : UserID
@url : http://127.0.0.1:9977/user/userId
 */

userRouter.get('/:id', async (req: Request, res: Response) => {
    await UserController.getUsers(req, res)
})



/**
@usage :  create a user
@method : POST
@params :username, email, password, ImageUrl, isAdmin
@url : http://127.0.0.1:9977/user
 */

userRouter.post('/', async (req: Request, res: Response) => {
    await UserController.createUsers(req, res)
})


/**
@usage :  Update a user
@method : PUT
@params :userID
@url : http://127.0.0.1:9977/user/userID
 */

userRouter.put('/:id', async (req: Request, res: Response) => {
    await UserController.UserUpdate(req, res)
})


/**
@usage :  Delete a user
@method : Delete
@params :UserId
@url : http://127.0.0.1:9977/user/UserId
 */

userRouter.delete('/:id', async (req: Request, res: Response) => {
    await UserController.UserDelete(req, res)
})



export default userRouter;