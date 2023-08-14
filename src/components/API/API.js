import React,{useState ,useEffect} from 'react'
import Navbar from "../Navbar/Navbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from '@mui/material/Divider';
import './API.css'
import copy from "copy-to-clipboard";
import Tooltip from '@mui/material/Tooltip';
import Modal from '@mui/material/Modal';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const style_modal_popup = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius:"15px",
  border:"none !important",
  transition:" all .4s"
};


const API = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [api, setApi] = useState([]);
  const [open_modal_popup, setOpen_modal_popup] = React.useState(false);
  const [validate,setValidate]=useState('');
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState('')

  // const [copy,setCopy]=useState(false)
  const copyToClipboard = () => {
    copy(api);
    setOpen(true);
    setTimeout(() => {
      setOpen(false)
    }, 1000);
    // setCopy(true)
}

useEffect(()=>{
  const fetchData = async()=>{
    try{
      const token = localStorage.getItem('token')
      const result = await axios.get("http://localhost:8000/userDB/getApiById?_id="+id,{
          headers: {
            'authentication':token,
          }
      });
      // console.log(result.data.APIs)
      setApi(result.data.APIs)
      setName(result.data.name)
    }catch(err){
      setValidate('unknown')
      setOpen_modal_popup(true)
      setTimeout(() => {
        setOpen_modal_popup(false);
      }, 2000);
    }
  }

  fetchData();
},[])


  const handleTooltipClose = () => {
    setOpen(false);
  };

  // const handleTooltipOpen = () => {
  //   setOpen(true);
  // };
  return (
    <>
    <Navbar/>
    <div>
    <Typography
          align="center"
          variant="body1"
          color="initial"
          className="create_head-1"
          sx={{ fontSize: "2rem", fontWeight: "bold", paddingLeft: "10vw",fontFamily:"League Spartan" }}
        >
          Use <span style={{ color: "#37BEC1" }}>quikAPI</span>
      </Typography>
      <Typography className='note-head' variant="body1" color="initial" align='left' sx={{marginLeft:"46vw",fontFamily:"League Spartan"}}>
        NOTE: only use the mentioned crud methods.
      </Typography>
      <Grid container className='firstt'>
        <Grid item xs={10} lg={10} md={10}>
              <Typography align="left" className="secondd" sx={{fontFamily: "League Spartan",
                  color:"	#5A5A5A",
                  fontWeight: "bold",
                  fontSize: "1.8rem",}} >
                <i
                  className="fas fa-paper-plane"
                  style={{
                    color: "orange",
                    fontSize: "1.1rem",
                    marginRight: "0.5vw",
                  }}
                ></i>    
                {name}
              </Typography>
        </Grid>

        <Grid item xs={10} lg={10} md={10}>
        <Typography align="left" className="api_heading" sx={{fontFamily: "League Spartan",
                  color:"#5A5A5A",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  marginTop:"1rem",
                  marginLeft:"2rem",
                  marginBottom:"0rem"}} >   
                  Add Data API
              </Typography>
        </Grid>
        
        <Grid container className="thirdd" >    
                 <Grid  item xs={2} lg={2} md={2} sx={{padding:"10px",paddingLeft:"4vw",borderRight: "2px solid #D3D3D3",borderRadius:"10px 0px 0px 10px"}}>
                  <Typography className="operation" align="left" sx={{color:'#ca9d4c',fontSize:"17px",fontWeight:"bold"}}>
                    POST
                  </Typography>
                 </Grid>
                 <Grid item xs={9} lg={9} md={9} sx={{padding:"10px",borderRight: "2px solid #D3D3D3" }}>
                  <Typography  color="initial" className='link-api' sx={{color:"black",fontFamily:"League Spartan"}}>
                  {api.Add}
                  </Typography>
                 </Grid> 
                 <Tooltip 
                 PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={open}
                arrow
                placement="top"
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title="Copied"
                 >
                 <Grid item onClick={copyToClipboard} className="fourthh" xs={1} lg={1} md={1} sx={{padding:"10px",paddingLeft:"1.6vw",borderTopRightRadius:"10px",borderBottomRightRadius:"10px"}}>
                 <i className="fas fa-paper-plane"  id="clipboard-icon" style={{color:"orange",fontSize: "1.1rem"}}></i>
                 </Grid>
                 </Tooltip>
        </Grid>
        
        {/* <Chip label="success" color="success" variant="outlined" sx={{backgroundColor:"red"}}/> */}

        <Grid item xs={10} lg={10} md={10}>
              <Typography align="left" className="api_heading" sx={{fontFamily: "League Spartan",
                  color:"#5A5A5A",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  marginTop:"1rem",
                  marginLeft:"2rem",
                  marginBottom:"0rem"}} >   
                  Get Data API
              </Typography>
        </Grid>
        
        <Grid container className="thirdd" >     
                 <Grid  item xs={2} lg={2} md={2} sx={{padding:"10px",paddingLeft:"4vw",borderRight: "2px solid #D3D3D3",borderRadius:"10px 0px 0px 10px"}}>
                  <Typography className="operation" align="left" sx={{color:'#58ac7b',fontSize:"17px",fontWeight:"bold"}}>
                    GET
                  </Typography>
                 </Grid>
                 <Grid item xs={9} lg={9} md={9} sx={{padding:"10px",borderRight: "2px solid #D3D3D3"}}>
                  <Typography  color="initial" className='link-api' sx={{color:"black",fontFamily:"League Spartan"}}>
                  {api.Get}
                  </Typography>
                 </Grid> 
                 <Tooltip 
                 PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={open}
                arrow
                placement="top"
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title="Copied"
                 >
                 <Grid item onClick={copyToClipboard} className="fourthh" xs={1} lg={1} md={1} sx={{padding:"10px",paddingLeft:"1.6vw",borderTopRightRadius:"10px",borderBottomRightRadius:"10px"}}>
                 <i className="fas fa-paper-plane"  id="clipboard-icon" style={{color:"orange",fontSize: "1.1rem"}}></i>
                 </Grid>
                 </Tooltip>
        </Grid>

        <Grid item xs={10} lg={10} md={10}>
        <Typography align="left" className="api_heading" sx={{fontFamily: "League Spartan",
                  color:"#5A5A5A",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  marginTop:"1rem",
                  marginLeft:"2rem",
                  marginBottom:"0rem"}} >   
                  Get Data By Id API
              </Typography>
        </Grid>

        <Grid container className="thirdd" >     
                 <Grid  item xs={2} lg={2} md={2} sx={{padding:"10px",paddingLeft:"4vw",borderRight: "2px solid #D3D3D3",borderRadius:"10px 0px 0px 10px"}}>
                  <Typography className="operation" align="left" sx={{color:'#58ac7b',fontSize:"17px",fontWeight:"bold"}}>
                    GET
                  </Typography>
                 </Grid>
                 <Grid item xs={9} lg={9} md={9} sx={{padding:"10px",borderRight: "2px solid #D3D3D3"}}>
                  <Typography  color="initial" className='link-api' sx={{color:"black",fontFamily:"League Spartan"}}>
                  {api.GetById}
                  </Typography>
                 </Grid> 
                 <Tooltip 
                 PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={open}
                arrow
                placement="top"
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title="Copied"
                 >
                 <Grid item onClick={copyToClipboard} className="fourthh" xs={1} lg={1} md={1} sx={{padding:"10px",paddingLeft:"1.6vw",borderTopRightRadius:"10px",borderBottomRightRadius:"10px"}}>
                 <i className="fas fa-paper-plane"  id="clipboard-icon" style={{color:"orange",fontSize: "1.1rem"}}></i>
                 </Grid>
                 </Tooltip>
        </Grid>

        <Grid item xs={10} lg={10} md={10}>
        <Typography align="left" className="api_heading" sx={{fontFamily: "League Spartan",
                  color:"#5A5A5A",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  marginTop:"1rem",
                  marginLeft:"2rem",
                  marginBottom:"0rem"}} >   
                  Update Data By Id API
              </Typography>
        </Grid>

        <Grid container className="thirdd" >     
                 <Grid  item xs={2} lg={2} md={2} sx={{padding:"10px",paddingLeft:"4vw",borderRight: "2px solid #D3D3D3",borderRadius:"10px 0px 0px 10px"}}>
                  <Typography className="operation" align="left" sx={{color:'#5a81b2',fontSize:"17px",fontWeight:"bold"}}>
                    PUT
                  </Typography>
                 </Grid>
                 <Grid item xs={9} lg={9} md={9} sx={{padding:"10px",borderRight: "2px solid #D3D3D3"}}>
                  <Typography  color="initial" className='link-api'  sx={{color:"black",fontFamily:"League Spartan"}}>
                    {api.UpdateById}
                  </Typography>
                 </Grid> 
                 <Tooltip 
                 PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={open}
                arrow
                placement="top"
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title="Copied"
                 >
                 <Grid onClick={copyToClipboard} item className="fourthh" xs={1} lg={1} md={1} sx={{padding:"10px",paddingLeft:"1.6vw",borderTopRightRadius:"10px",borderBottomRightRadius:"10px"}}>
                 <i className="fas fa-paper-plane"  id="clipboard-icon" style={{color:"orange",fontSize: "1.1rem"}}></i>
                 </Grid>
                 </Tooltip>
        </Grid>
        
        <Grid item xs={10} lg={10} md={10}>
        <Typography align="left" className="api_heading" sx={{fontFamily: "League Spartan",
                  color:"#5A5A5A",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  marginTop:"1rem",
                  marginLeft:"2rem",
                  marginBottom:"0rem"}} >   
                  Delete Data By Id API
              </Typography>
        </Grid>

        <Grid container className="thirdd" >     
                 <Grid  item xs={2} lg={2} md={2} sx={{padding:"10px",paddingLeft:"3.5vw",borderRight: "2px solid #D3D3D3",borderRadius:"10px 0px 0px 10px"}}>
                  <Typography className="operation" align="left" sx={{color:'#c07b71',fontSize:"17px",fontWeight:"bold"}}>
                    DELETE
                  </Typography>
                 </Grid>
                 <Grid item xs={9} lg={9} md={9} sx={{padding:"10px",borderRight: "2px solid #D3D3D3"}}>
                  <Typography  color="initial" className='link-api' sx={{color:"black",fontFamily:"League Spartan"}}>
                  {api.DeleteById}
                  </Typography>
                 </Grid> 
                 <Tooltip 
                 PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={open}
                arrow
                placement="top"
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title="Copied"
                 >
                 <Grid item onClick={copyToClipboard} className="fourthh" xs={1} lg={1} md={1} sx={{padding:"10px",paddingLeft:"1.6vw",borderTopRightRadius:"10px",borderBottomRightRadius:"10px"}}>
                 <i className="fas fa-paper-plane"  id="clipboard-icon" style={{color:"orange",fontSize: "1.1rem"}}></i>
                 </Grid>
                 </Tooltip>
        </Grid>
        <Grid item xs={10} lg={10} md={10}>
        <Typography align="centre" className="api_heading" sx={{fontFamily: "League Spartan",
                  color:"black",
                  // fontWeight: "bold",
                  fontSize: "1rem",
                  marginTop:"1rem",
                  marginLeft:"12rem",
                  marginBottom:"2rem"}} >   
                  APIs giving you a hard time? <span style={{color:"#37BEC1" , cursor:"pointer"}} onClick={()=>{navigate('/profile')}}>Click here</span> to learn more about quikAPIs!
              </Typography>
        {/* <Typography className='note-head' variant="body1" color="initial" align='centre' sx={{fontFamily:"League Spartan"}}>
        APIs giving you a hard time? Click here to unlock the simplicity of quikAPIs!
      </Typography> */}
        </Grid>
      </Grid>
        {validate=='unknown'&&<Modal
          open={open_modal_popup}
          sx={{border:"none !important"}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style_modal_popup}>
            <Typography id="modal-modal-title" variant="h6" component="h3" sx={{margin:"1vh",fontSize:"1.1rem"}}>
            <i class="fa-regular fa-circle-xmark" style={{color: "#37bec1",marginRight:"1vw"}}></i>
            Oops! An Error Occurred  <span style={{marginRight:"1vw !important"}}></span>
            </Typography>
          </Box>
        </Modal>} 
    </div>
    </>
  )
}

export default API