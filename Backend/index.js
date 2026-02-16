import dotenv from 'dotenv';
import {app} from './app.js';
import { connectDB } from './db/index.js';

dotenv.config({path: './.env'});

connectDB()
 .then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`server is runnig on the port ${process.env.PORT || 8000}`);
    })
 })
 .catch((err)=>{
    console.log(`error in db connection: ${err.message}`);
    process.exit(1);
 })
