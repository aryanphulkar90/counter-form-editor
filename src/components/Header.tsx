import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAppSelector, useAppDispatch } from '../utils/hooks';
import { removeUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';

const Header = () =>{
  const currentUser = useAppSelector((store)=>store.user.currentUser)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const logout = () =>{
     dispatch(removeUser())
     navigate("/")
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Notes App
          </Typography>
           
          {currentUser&&<Button color="inherit"
                   onClick={logout}>
                    Logout
            </Button>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header