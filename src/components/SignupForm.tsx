import { Flex, Heading, Input, Button, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { registerUrl } from '../constants/api';


const SignupForm = () => {
 const [success, setSuccess] = useState(false);
 const [error, setError] = useState<string | null>(null);


 const {
   register,
   handleSubmit,
   reset,
   formState: { errors },
 } = useForm();


 const registerUser = async (data: any, e: any) => {
   e.preventDefault();


   const registerRequest = {
     name: data.name,
     email: data.email,
     password: data.password,
   };


   if (data.password === data.rePassword) {
     try {
       await axios.post(registerUrl, registerRequest);
       setSuccess(true);
       reset();
     } catch (error) {
       console.log(errors);
     }
   } else {
     setError('Passwords do not match');
   }
 };

 return (
   <form onSubmit={handleSubmit(registerUser)}>
     <Flex direction={'column'} maxW="md" m={{ base: 5, md: 'auto' }}>
       <Heading color={'gray.700'}  mb={5} fontSize="lg">
         Sign up
       </Heading>
       <Input defaultValue="" {...register('name', { required: true })} mb={5} variant="flushed" type="text" placeholder="Name..." />
       {errors.name && <Text mb={5} color={'red.400'}>This field is required</Text>}


       <Input defaultValue="" {...register('email', { required: true})}  mb={5} variant="flushed" type="email" placeholder="Email..." />
       {errors.email && <Text mb={5} color={'red.400'}>This field is required</Text>}
       <Input defaultValue="" {...register('password', { required: true })} mb={5} variant="flushed" type="password" placeholder="Password..." />
       {errors.password && <Text mb={5} color={'red.400'}>This field is required</Text>}
       <Input defaultValue="" {...register('rePassword', { required: true })} mb={5} variant="flushed" type="password" placeholder="Repeat password..." />
       {errors.rePassword && <Text mb={5} color={'red.400'}>This field is required</Text>}


       {error && (
         <Text mb={5} color={'red.500'}>
           {error}
         </Text>
       )}
       <Button type="submit" colorScheme="blue">
         Sign up
       </Button>
       {success && (
         <Text mt={5} color={'green.500'}>
           User created! You can now log in
         </Text>
       )}
     </Flex>
   </form>
 );
};


export default SignupForm;

