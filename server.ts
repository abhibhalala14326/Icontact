import express , {Request,Response,Application}  from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config({path:'./.env'})

const port:number| string| undefined = process.env.PORT || 9999;
const dbUrl: any = process.env.MONGO_DB_CLOUD_URL;
const dbname: string | undefined = process.env.MONGO_DB_DATABASE;
const hostname: string = '127.0.0.1';

const app:Application = express()

mongoose
.connect(dbUrl , {dbName:dbname})
.then(()=>{console.log('database done');
}).catch(()=>{console.log(`err`);
})


app.listen(port,()=>
{
    console.log(`http://${hostname}:${port}`);
    
})