import * as Yup from 'yup';

const signUpSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  address: Yup.string().required('Required'),
  phone: Yup.string().matches(/^[0-9]{10}$/, 'Invalid phone number').required('Required'),
  password: Yup.string().min(8, 'Must be at least 8 characters').required('Required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), 'Passwords must match'], 'Passwords must match').required('Required'),
});

export default signUpSchema