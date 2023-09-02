import React from 'react'
import Errorr from './Error.png'
import Typography from '@mui/material/Typography'
import { useNavigate } from "react-router-dom";
import './Error.css'


const Error = () => {
    const navigate = useNavigate(); 
  return (
    <div>
        <img src={Errorr} className="error-img" style={{height:"70vh"}}/>
        <Typography sx={{fontFamily:"League Spartan",fontWeight:"bold",fontSize:"1.3rem",color:"gray"}}>
            Oops ! Something went wrong. <br/>
            <button className="btn-error" onClick={() => {
                      navigate("/register");
                    }}>Back to Signup</button>
        </Typography>
    </div>

  )
}

export default Error