import User from '../Models/user.js'

// Authenticate if user can add a trade to the database and the Blockchain
let authUserCanAddTrade = async function(api_key){
    let response
    try
    {
        let newuser = await User.find({"api_key": api_key})
        if(newuser[0]["canAddTrade"]){
            response = {"error": false, "message": "Authorized"}
        }
        else{
            response = {"error": true, "message": "Not Authorized"}
        }
    }catch(err){
        response = {"error": true, "message": "Key Not Found"}
    }
    return response 
}

// Authenticate if the user can add another user
let authUserCanAddUser = async function(api_key){
    let response
    try
    {
        let newuser = await User.find({"api_key": api_key})
        if(newuser[0]["canAddUser"]){
            response = {"error": false, "message": "Authorized"}
        }
        else{
            response = {"error": true, "message": "Not Authorized"}
        }
    }catch(err){
        response = {"error": true, "message": "Key Not Found"}
    }
    return response 
}

let addUser = async function(username, apikey, canAddTradePermission, canAddUserPremission){
    let user = new User({
        Username: username,
        api_key: apikey,
        canAddTrade: canAddTradePermission,
        canAddUser: canAddUserPremission
    })

    try{
        await user.save()
    }catch(err){
        console.log(err)
    }
}

export {authUserCanAddTrade, authUserCanAddUser, addUser};