import express , {Request,Response,Application}  from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import groupRouter from './router/grupeRouter'
dotenv.config({path:'./.env'})

const port:number| string| undefined = process.env.PORT || 9999;
const dbUrl: any = process.env.MONGO_DB_CLOUD_URL;
const dbname: string | undefined = process.env.MONGO_DB_DATABASE;
const hostname: string = '127.0.0.1';

const app:Application = express()

app.use('/group' , groupRouter)

if (port) {
    app.listen(port, () => {

        if (dbUrl && dbname) {
            mongoose
                .connect(dbUrl, { dbName: dbname })
                .then(() => {
                    console.log('Connection Estabished....!');
                }).catch((error) => {
                    console.error(error)
                    process.exit(0)  // Froce stop express server
                }) 
        }
        console.log(`http://${hostname}:${port}`);

    }) 
}










// vishakha:7698766606 (send zipfile icontact)
