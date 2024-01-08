import React, { useState } from 'react'
import { Link ,useNavigate,useNavigation } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
      const history = useNavigate()

    const [formData, setFormData]= useState({
        name:"",
        email:"",
        password:""
    })

    const changeHandler=(e)=>{

        const {name, value} = e.target;

        setFormData((pre)=>{
           return{
            ...pre,
            [name]: value
           }
        })
    }
    console.log(formData)

    const submitHandler =async(event)=>{
        event.preventDefault();
        console.log(formData);

       try{
        const response = await axios.post("http://localhost:3001/api/v1/login", formData)

        

        
        const{success, data, message} = response.data;

        if(success){
           console.log("Data Entered Successfully")
           console.log(data.token);
           if(data.token){
            history("/homepage", {state :{id:data.token}})
           }
           else{
            console.log("Error while navigation")
           }
        }//navigate to the home Route
        else{
            console.log(message)
        }

       }catch(error){
        console.log("Error ocuured while connecting to backend")
        console.log(error);

       }

       setFormData({
        name:"",
        email:"",
        password:""
       })
    }

    
  return (
    <div>
      Login Page



        <form onSubmit={submitHandler}>
            <input 
            type = "text"
            name = "name"
            value = {formData.name}
            placeholder='Enter Name'
            onChange={changeHandler}
            required
            />
          <br />
          <br />
            <input 
            type = "email"
            name = "email"
            value = {formData.email}
            onChange={changeHandler}
            placeholder='Enter Email'
            required
            />
           <br />
           <br />
            <input 
            type = "password"
            name = "password"
            value = {formData.password}
            placeholder='Enter Password'
            onChange={changeHandler}
            required
            />
            <br/>
            <br/>

    <button>Login</button>
   
         


            <h5>New User : 

              <Link to="/signup">SignUp here</Link>
            </h5>

        </form>

    </div>
  )
}

export default Login
