//programm to generate random string used for defining uniq id for tracks
const characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

const generateString = (length)=>{
    let result=''
    const characLength=characters.length
    for (let i =0; i<length; i++){
        result += characters.charAt(Math.floor(Math.random()*characLength))
    }
    return result
}

module.exports= generateString


