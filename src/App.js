import { useState } from 'react';
import './App.css';
import axios, * as other from "axios"
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import img from './img/office.jpg'
import { Alert, Box, IconButton, Collapse, Button } from '@mui/material';
import {Close} from '@mui/icons-material'

function App() {

  const [toggle, setToogle] = useState(false)
  const [inputType, setInputType] = useState('Password')
  const [mail, setMail] = useState()
  const [password, setPassword] = useState()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('usuario')))
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false)

  const handleLogin = async (e) =>{
    
    e.preventDefault(e)
    try{

      const response = await axios.post('http://localhost:5000/api/users/login',
      JSON.stringify({mail, password}),
      {
        headers: {'content-type' : 'application/JSON'}
      })

      setUser(response.data)  

    }catch(err){
      setOpen(true)
      
      if(err.response){

        setError('Failed to access server');

      } else if(err.response.status === 404){

        setError('User not found!')
      }
    
    }
    if(error !== null){
    }
  }
  
  localStorage.setItem('usuario', JSON.stringify(user))
  
  
  const handleToogle = (e) =>{
    e.preventDefault()
    
    setToogle(!toggle)

    if(toggle === false){
    
      setInputType('Text')
    
    }else{
    
      setInputType('Password')
    }
  }


  const handleLogout = async () =>{  
      
    setUser(null)

    localStorage.setItem('usuario', JSON.stringify(user));

    window.location.reload()

  }

  return (
    <>
      {error !== null ?(
          <>
          <Box>
            <Collapse in={open}>
              <Alert 
              severity='error'
              action={
                <IconButton
                  aria-label='close'
                  color='inherit'
                  onClick={()=>setOpen(false)}>
                    <Close></Close>
                  </IconButton>
              }>
                User not found!
              </Alert>
            </Collapse>
          </Box>
          </>
        ):(
          <>
          </>
        )
      }
      {user===null ? (
        <main className='body-container'>
          <div className='login-section'>
            <h1>Welcome back!</h1>
            <h5>Enter your credentials to have access of your account</h5>
            <span className='border-span'/>
            <form>
              <input 
                type="text" 
                placeholder='Enter your mail'
                onChange={(e)=>setMail(e.target.value)}></input>

              <input 
                type={inputType} 
                placeholder='Password'
                onChange={(e)=>setPassword(e.target.value)}></input>

              <span className='tooglepass-span'>
                <a href="https://google.com">Forgot password?</a>
                <button className='pass-btn' onClick={(e)=>handleToogle(e)}>
                  {toggle ? (
                    <>
                      <FaEyeSlash/>
                    </>
                  ):(
                    <>
                      <FaEye/>
                    </>
                  )}
                </button>
              </span>
              <button className='login-btn' onClick={(e)=>handleLogin(e)}>Continue</button>
            </form>
            <footer>
              @2023 ThatsVinnie. Based on <a href='https://joinditto.in/'>Ditto's</a> UI
            </footer>
          </div>
          <div className='pic-section'>
            <img src={img} alt='office'>
            </img>
            <a className='pic-ref' href="http://www.freepik.com">Designed by pch.vector / Freepik</a>
          </div>
        </main>
      ):(
        <main className='body-container'>
          <div className='user-ui'>          
            <span className='user-greet'>Welcome back, {user.user[0].name}.</span>
            <button className='logout-btn' onClick={()=>handleLogout()}>Sair</button>
          </div>

        </main>
      )}
    </>
  );
}

export default App;
