import sha256 from "sha256";

let getHash = function(data){
    let hashString = ""
    let key, value
    for([key, value] of Object.entries(data))
    {
        hashString = hashString+key+":"+value+","
    }
    let hash = sha256(hashString)
    
    return hash
}

export default getHash;