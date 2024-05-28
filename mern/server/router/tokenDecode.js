const jwt = require("jsonwebtoken");

const decodeToken = (value) => {
    return new Promise((resolve, reject) => {
        jwt.verify(value, process.env.KEY, (err, decode) =>{
            if (err){
                console.log(err); // Log the error here
                reject(err);
            }else{
                console.log(decode); // Log the decoded token here
                resolve(decode);
            }
        });
    });
};

module.exports = {decodeToken}