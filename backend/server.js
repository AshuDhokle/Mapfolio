import Express from "express";
import AdminRouter from './Routes/adminRouter.js'
import { Connection } from './Database/Connection.js';
import cors from 'cors'
import bodyParser from "body-parser";
const app = Express();

app.use(cors());
app.use(Express.json());
app.use(Express.static('public'));
app.use(Express.static('uploads'));
app.use(bodyParser.urlencoded({extended:true}))
//Database Connection
Connection._connection();

app.use('/admin',AdminRouter)

const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`App listening on Port 3000`);
})