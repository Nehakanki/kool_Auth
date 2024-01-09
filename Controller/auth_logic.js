//Sign Up and Login Logic

const User = require('../Model/auth_schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.Signup = async(req,res)=>{
    try{
        const {name,email, password } = req.body;
        //1. validate the required fields
        if(!name || !email || !password ){
            return res.status(400)
            .json({
                success:"false",
                message :"Enter all the required field"
            })
        }

        //2. check for email exist or not
        const existing_email = await User.findOne({ email });
        if(existing_email){
            return res.status(400)
            .json({
                success:"false",
                message :"User aldready Exist , Go for Login Process"
            })
        }
        //There exist new User , Hash the password and then enter into DB (using 10 salt round --> optimal one)
        const hashedPassword = await bcrypt.hash(password, 10);
        


        //3 Create User in Db

        try{
            const savedUser = await User.create({
                name, 
                email,
                 password:hashedPassword
            });
            res.status(200)
            .json({
                success:"true",
                data: savedUser,
                message:"SignUp Done SuccessFully"
            })
        }

        catch(error){
            console.log(error);
            return res.status(500)
            .json({
                success:"false",
                message:"Error while create entry in Db"
            })
        }

        }

        
        
     
    catch(error){
        console.log("Error Occoured during Signup"+ error);
        return res.status(500)
        .json({
            success:"false",
            message :"Error Occoured during Signup"
        })
    }
}

//Login User

exports.Login = async (req, res)=>{
    const {name, email, password} = req.body;
     //1. validate the required fields
     if(!name || !email || !password ){
        return res.status(400)
        .json({
            success:"false",
            message :"Enter all the required field"
        })
    }

     //2. check for email exist or not
     const existing_email = await User.findOne({ email });

     //if there is no existing user 
     if(!existing_email){
         return res.status(400)
         .json({
             success:"false",
             message :"User doesn't exist , Go For signUp first!!"
         })
     }

     //3. verify password and create JWT token passing using Header
   
     try{

        const payload ={
            name,
            email,
            password,
         }
         const options ={
            expiresIn: '15d'
         }
         
    
         //compare the password
        let verifiedPassword=  await bcrypt.compare(password,existing_email.password)
        if(!verifiedPassword){
         return res.status(400)
              .json({
                  success:"false",
                  message :"incorrect password"
              })
     
        }
        //if we have the verified Password

          try{
            const tokenPayload = { ...payload };
            delete tokenPayload.password;
            const token = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY, options);

                 // Set the token in the Authorization header
            res.setHeader('Authorization', `Bearer ${token}`);

            //make the password undefinef

        
                return res.status(200).json({
                    success: true,
                    data: {
                        tokenPayload,
                        
                        token
                    },
                    message: "Login successful",
             });
            
          }catch(err){
            console.log("error in creating the token", err);
          }
          

     }catch(error){
        console.log("Error Occoured during Login"+ error);
        return res.status(500)
        .json({
            success:"false",
            message :"Error Occoured during Login"
        })


     }
 
}

