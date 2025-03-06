import express, { Request, Response, Application, Router, } from 'express'
import * as groupContoller from '../controllers/groupController'
import { body } from 'express-validator'
import { log } from 'console'

// Create a router
const groupRouter: Router = Router()

// @usage : to get all contacts
// @method : GET
// @params : not - params
// @url : http://127.0.0.1:9999/contacts

groupRouter.get('/', async (req: Request, res: Response) => {
    await groupContoller.getAllGroup(req, res)
})


groupRouter.post('/',
    [body('name').not().isEmpty().withMessage("name is Required")],//
    async (req: Request, res: Response) => {
  console.log("post");
  
        await groupContoller.createGroup(req, res)
    })


    /**
     usage  :to get  a group
     methods: GET
     params: groupID
     */

groupRouter.get('/:groupId', async (req: Request, res: Response) => {
    await groupContoller.getGroup(req, res)
})

/**  usage: delete a Group
 Methods:delete
 params:GroupID

*/


groupRouter.delete("/:id" , async(req:Request , res:Response)=>
{
    await groupContoller.groupDelete(req,res)
})

/**
 * usage : Update A Group
 * Methods:PUT
 * Params:GroupID
 */

groupRouter.put("/:id" , async(req:Request , res:Response)=>
{
    await groupContoller.UpdateGroup(req,res)
})
export default groupRouter;
