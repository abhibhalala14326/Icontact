import { Router, Request, Response } from "express";
import * as contectController from '../controllers/contectController'

// Create a router
const contectRouter: Router = Router()

/**
@usage :  Get All Contats
@method : GET
@params : no - params
@url : http://127.0.0.1:9977/contect
 */

contectRouter.get('/', async (req: Request, res: Response) => {
    await contectController.getAllContact(req, res)
})


/**
 @usage :  Get a Contact
@method : GET
@params : ContectId
@url : http://127.0.0.1:9977/contect/contactId
 */

contectRouter.get('/:id', async (req: Request, res: Response) => {
    await contectController.getContact(req, res)
})


/**
 @usage :  Create a Contect
@method : POST
@params :  user, name, imageUrl, mobile, company, email, title, groupId 
@url : http://127.0.0.1:9977/contect
 */

contectRouter.post('/', async (req: Request, res: Response) => {
    await contectController.createContact(req, res)
})

/**  
 @usage :  Update a Contect
@method : PUT
@params : ContactId
@url : http://127.0.0.1:9977/contect/contactId
 */

contectRouter.put("/:id", async (req: Request, res: Response) => {
    await contectController.updateContact(req, res)
})

/**
 @usage :  Delete a contect
@method : Delete
@params : contactId
@url : http://127.0.0.1:9977/contect/contactId
 */


contectRouter.delete("/:id", async (req: Request, res: Response) => {
    await contectController.deleteContact(req, res)
})



export default contectRouter;
