import express, { Request, Response, Application, Router, } from 'express'
import * as groupContoller from '../controllers/groupController'
import { body } from 'express-validator'
import { log } from 'console'

const groupRouter: Router = Router()

// @usage : to get all contacts
// @method : GET
// @params : not - params
// @url : http://127.0.0.1:9999/contacts

groupRouter.get('/', async (req: Request, res: Response) => {
    await groupContoller.getAllGroup(req, res)
})


groupRouter.post('/',
    [body('name').not().isEmpty().withMessage("name is Required")],
    async (req: Request, res: Response) => {
  console.log("post");
  
        await groupContoller.createGroup(req, res)
    })

export default groupRouter;
