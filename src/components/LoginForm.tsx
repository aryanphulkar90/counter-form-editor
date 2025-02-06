import { useState } from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Box, Container, Paper, Typography } from '@mui/material';
import { useAppDispatch } from '../utils/hooks';
import { createUser, setUser } from '../utils/userSlice';
import { v4 as uuidv4 } from 'uuid';
import signUpSchema from '../schemas/signUpSchema';
import signInSchema from '../schemas/signInSchema';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
  const dispatch = useAppDispatch();
  const [isSignUpForm, setIsSignUpForm] = useState(true)
  const navigate = useNavigate()
  const toggleForm = () =>{
    setIsSignUpForm(!isSignUpForm);
  }
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      address: '',
      phone: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: (isSignUpForm) ? (signUpSchema) : (signInSchema),
    onSubmit: () => {
      if(isSignUpForm){
        dispatch(createUser({
            id : uuidv4(),
            name : formik.values.name,
            email : formik.values.email,
            address : formik.values.address,
            phone : formik.values.phone,
            password: formik.values.password,
            count: 0,
            notes: [],
            currentNote: "",    
        }));
        formik.resetForm();
        navigate("/notes");
      }
      else
      {
         dispatch(setUser({
            email : formik.values.email,
            password: formik.values.password 
         }))
         formik.resetForm();
         navigate("/notes");
      }
    },
  });

  return (
    <>
    <Header/>
    <Container
       sx={{
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
       }}
    >
       <Paper elevation={3}
         sx={{
            width: '300px',
            padding: '50px',
            margin: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
         }}
       >
        <form onSubmit={(e)=>{
          e.preventDefault()
          formik.handleSubmit()
        }}>
            <Box sx={{ 
                display: 'grid',
                gap: 2,
                maxWidth: 500,
            }}>
                <Typography sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                  {(isSignUpForm ? "Sign Up" : "Sign In")}
                </Typography>
                {isSignUpForm && <TextField
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={(formik.touched.name && Boolean(formik.errors.name)) ? formik.errors.name : ""}
                name="name"
                label="Name"
                size="small"
                value={formik.values.name}
                onChange={formik.handleChange}
                sx={{
                    width: '300px'
                }}
                />}
                <TextField
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={(formik.touched.email && Boolean(formik.errors.email)) ? formik.errors.email : ""}
                name="email"
                label="Email"
                size="small"
                value={formik.values.email}
                onChange={formik.handleChange}
                sx={{
                    width: '300px'
                }}
                />
                {isSignUpForm && <TextField
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={(formik.touched.address && Boolean(formik.errors.address)) ? formik.errors.address : ""}
                name="address"
                label="Address"
                size="small"
                value={formik.values.address}
                onChange={formik.handleChange}
                sx={{
                    width: '300px'
                }}
                />}
                {isSignUpForm && <TextField
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={(formik.touched.phone && Boolean(formik.errors.phone)) ? formik.errors.phone : ""}
                name="phone"
                label="Phone Number"
                size="small"
                value={formik.values.phone}
                onChange={formik.handleChange}
                sx={{
                    width: '300px'
                }}
                />}
                <TextField
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={(formik.touched.password && Boolean(formik.errors.password)) ? formik.errors.password : ""}
                name="password"
                label="Password"
                size="small"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                sx={{
                    width: '300px'
                }}
                />
                {isSignUpForm && <TextField
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={(formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)) ? formik.errors.confirmPassword : ""}
                name="confirmPassword"
                label="Confirm Password"
                size="small"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                sx={{
                    width: '300px'
                }}
                />}
                <Button 
                type="submit" 
                size="small" 
                variant="contained"
                sx={{
                    width: '300px'
                }}
                >
                Submit
                </Button>
                <Typography sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '12px'
                }}
                onClick={toggleForm}
                >
                { (isSignUpForm) ? "Already Registered?" : "New User?"}
                </Typography>
            </Box>
        </form>
       </Paper>
    </Container>
    </>
  );
};

export default UserForm;