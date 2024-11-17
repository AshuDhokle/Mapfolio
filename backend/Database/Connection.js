import Mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();
const server = process.env.MONGODB_CONNECTION_URL;
class Database{
    constructor(){
        this._connection();
    }

    _connection(){
        Mongoose.connect(server)
        .then(()=>{
            console.log('Database connnected');
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}

const Connection = new Database();
export {Connection}
