import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import getHash from './generateHash.js';
const app = express()
const PORT = 5000


app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.send("Working")
})

app.post('/updateData', function(req, res){
    const data = req.body
    console.log("Adding data to the MongoDB") //Add steps here
    let hash = getHash(data)
    console.log("Hashing the data", hash)
    console.log("Storing the hash on the Blockchain") // add steps here
    let response = {"message": "success", "hash": hash}
    res
    .status(200)
    .send(response)

})

//Listening to the port
app.listen(PORT, ()=>{
    console.log("Server is mapped on the port http://localhost:5000/updateData")
});