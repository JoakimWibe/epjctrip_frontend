import { Button, Flex, Heading, Input, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { loginUrl } from '../constants/api';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { TripContext } from '../context/Context';


const LoginForm = () => {
 const { setLoggedIn }: any = useContext(TripContext);


 const {
   register,
   handleSubmit,
   reset,
   formState: { errors },
 } = useForm();


 const navigate = useNavigate();


 const login = async (data: any, e: any) => {
   e.preventDefault();


   const loginRequest = {
     email: data.email,
     password: data.password,
   };


   try {
     const response = await axios.post(loginUrl, loginRequest);
     localStorage.setItem('token', response.data.token);
     localStorage.setItem('name', response.data.name);
     localStorage.setItem('email', response.data.email);
     localStorage.setItem('userId', response.data.id);


     setLoggedIn(true);
     navigate('/travelplanner');
     reset();
   } catch (error) {
     console.log(errors);
   }
 };


 return (
   <form onSubmit={handleSubmit(login)}>
     <Flex direction={'column'} maxW="md" m={{ base: 5, md: 'auto' }}>
       <Heading color={'gray.700'} mb={5} fontSize="lg">
         Log in
       </Heading>


       <Input defaultValue="" {...register('email', { required: true })} variant="flushed" type="email" placeholder="Email..." mb={5}/>
       {errors.email && <Text mb={5} color={'red.400'}>This field is required</Text>}
       <Input my={5} defaultValue="" {...register('password', { required: true })} variant="flushed" type="password" placeholder="Password..."mb={5} />
       {errors.password && <Text mb={5} color={'red.400'}>This field is required</Text>}
       <Button colorScheme="blue" type="submit">
         Log in
       </Button>
     </Flex>
   </form>
 );
};


export default LoginForm;
