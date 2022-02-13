import mongoose  from "mongoose";
const {Schema} = mongoose;

let userSchema = new Schema({
    Username: {
        type: String,
        require: true
    },
    api_key: {
        type: String,
        require: true
    },
    canAddTrade: {
        type: Boolean,
        require: true,
        default: false
    },
    canAddUser: {
        type: Boolean,
        require: true,
        default: false
    }
})

export default mongoose.model('User', userSchema);