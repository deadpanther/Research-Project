import Mongoose from 'mongoose';
import Trade from '../Models/trade.js';
import dotenv from 'dotenv';
dotenv.config();


let url = process.env.DATABASE_URL

Mongoose.connect(url, {useNewUrlParser: true}, () =>{
    console.log("Connected to the database")
})

let addData =  async function(data){

    let message, error;

    let post = new Trade({
        ticker: data.ticker,
        price: data.order_price,
        date: data.order_date
    })

    try
    {
        await post.save()
        .then(data =>{
            error = false
            message = data["_id"]
        })
    }
    catch(err)
    {
        error = true
        message = err;
    }

    return {"error": error, "message": message}
}

export default addData;