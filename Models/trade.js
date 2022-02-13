import mongoose  from "mongoose";
const {Schema} = mongoose;

let tradeSchema = new Schema({
    ticker: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    date: {
        type: Date,
        require: true
    }
})

export default mongoose.model('Trade', tradeSchema);