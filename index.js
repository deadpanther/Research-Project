import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import addData from './Utilities/database.js';
import { addUser, authUserCanAddTrade, authUserCanAddUser } from './Utilities/auth.js';
import getHash from './Utilities/generateHash.js';
const app = express()
const PORT = 5000


app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', async function(req, res){ 
    res.send("Working")
})


app.post('/updateData', async function(req, res){
    let api_key = req.query.api_key
    let auth_user = await authUserCanAddTrade(api_key)
    if(auth_user.error)
    {
        res.send({"error": true, "message": auth_user.message})
    }
    else
    {
        const data = req.body
        let dbResponse = await addData(data)
        if(dbResponse.error){
            res.send({"error": true, "message": dbResponse.message})
        }
        let hash = getHash(data)
        console.log("Storing the hash on the Blockchain")
        let response = {"error": false, "message": {"_id": dbResponse.message, "data_hash": hash}}
        res
        .status(200)
        .send(response)
    }

})

app.post('/addUser', async function(req, res){
    let data = req.body
    let api_key = req.query.api_key
    let auth_user = await authUserCanAddUser(api_key)
    if(auth_user.error)
    {
        res.send({"error": true, "message": auth_user.message})
    }
    else
    {
        await addUser(data.username, data.apikey, data.addTrade, data.addUser)
        res.send({"error": false, "message":"User added"})
    }
    
})



//Listening to the port
app.listen(PORT, ()=>{
    console.log("Server is mapped on the port http://localhost:5000/updateData")
});