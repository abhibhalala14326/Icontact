import express, { Request, Response, Application } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config({ path: './.env' })
let cors = require('cors')


const port: number | string | undefined = process.env.PORT || 9999;
const dbUrl: any = process.env.MONGO_DB_CLOUD_URL;
const dbname: string | undefined = process.env.MONGO_DB_DATABASE;
const hostname: string = '127.0.0.1';


var corsOptions = {
    origin: 'http://localhost:5173',
    methods: "GET , PUT , DELETE , POST",
    Credentials: true

}



const app: Application = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false })) // pasing from data in the request body
app.use(cors(corsOptions))

// routers
import groupRouter from './router/grupeRouter'
import userRouter from './router/userRouter'
import contectRouter from './router/contactRouter'

app.use('/groups', groupRouter)
app.use('/user', userRouter)
app.use("/contect", contectRouter)


// MongoDB Connection
const connectDB = async () => {
    if (dbUrl && dbname) {
        try {
            await mongoose.connect(dbUrl, { dbName: dbname });
            console.log(' MongoDB Connection !');
        } catch (error) {
            console.error(' MongoDB Connection Failed:', error);
            process.exit(1);
        }
    }
};

// Start Server
if (port) {
    app.listen(port, async () => {
        await connectDB()

        console.log(`http://${hostname}:${port}`);

    })
}










