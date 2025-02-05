import { useFormik } from 'formik';
import { TextField, Button, Box, Container, Paper, Typography } from '@mui/material';
import { useAppDispatch } from '../utils/hooks';
import { createUser } from '../utils/userSlice';
import { v4 as uuidv4 } from 'uuid';
import validationSchema from '../schemas';

const UserForm = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      address: '',
      phone: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(createUser({id:uuidv4(),...values}));
      formik.resetForm();
    },
  });

  return (
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
        <form onSubmit={formik.handleSubmit}>
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
                  Sign In
                </Typography>
                <TextField
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
                />
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
                <TextField
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
                />
                <TextField
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
                />
                <TextField
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
            </Box>
        </form>
       </Paper>
    </Container>
  );
};

export default UserForm;