import React from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';

const Register = () => {
  const navigate= useNavigate();

 //state
  const [inputs, setInputs]= useState({
    name:"",
    email:"",
    password:"",
  });

  // handle input change
  const handleChange = (e)=> {
    setInputs( (prevState)=> ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

    //form handle
    const handleSubmit= async (e)=> {
      e.preventDefault();
      try{
        const {data}= await axios.post('http://localhost:8080/api/v1/user/register',{username:inputs.name, email:inputs.email, password:inputs.password});
        if(data.success){
          toast.success('user Register Successfully');
          navigate('/login');
        }
      }catch(error){
        console.log(error);
      }
    };
  
  return (
    <>  
      <form onSubmit={handleSubmit}>
        <Box 
        maxWidth={450}
        display="flex"
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        margin="auto"
        marginTop={5}
        boxShadow="10px 10px 20px #ccc"
        padding={3}
        borderRadius={5}
        >
          <Typography
            variant='h4' 
            sx={{textTransform:"uppercase"}} 
            padding={3} 
            textAlign="center"
          > Register</Typography>

          <TextField 
            type={'text'} 
            placeholder='name' 
            name='name' 
            value={inputs.name} 
            onChange={handleChange} 
            margin='normal' 
            required/>

          <TextField 
            type={'email'} 
            placeholder='email' 
            name='email' 
            value={inputs.email} 
            onChange={handleChange} 
            margin='normal' 
            required/>

          <TextField 
            type={"password"} 
            placeholder='password' 
            name="password" 
            value={inputs.password} 
            onChange={handleChange} 
            margin="normal" 
            required/>

          <Button 
            type="submit" 
            sx={{borderRadius:3, marginTop:3}} 
            variant="contained"
            color='primary' 
          > Submit</Button>

          <Button 
            sx={{borderRadius:3, marginTop:3}} 
            onClick={()=> navigate('/login')} 
          > Already Registered? Please Login </Button>
        </Box>
      </form>   
    </>
  )
}

export default Register;