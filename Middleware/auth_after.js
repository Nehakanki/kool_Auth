
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth =(req, res, next)=>{

   // extract token from Header
 
    const authorizationHeader = req.header("Authorization");

    if (!authorizationHeader) {
        return res.status(401).json({ message: 'No token is provided' });
    }

    const token = authorizationHeader.replace("Bearer ", "");
      
        try{

             if(token){
                //verify the token & go to next step
             const verified_token= jwt.verify(token, process.env.JWT_SECRET_KEY, (err, verified)=>{
                if(err){
                    return res.status(401).json({ message: 'Token verification failed' });
                }
                else {
                    // Token is valid
                    console.log('Decoded Token:', verified);
                   
                  }
             })

         }//if token is present

         //token is not there
         else{
            return res.status(401).json({ message: 'No token is provided' })

         }

        
         }catch(error){
            console.log("error while doing Authentication"+ error);
        }
        next();

}


