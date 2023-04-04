import { Text, Flex, Button } from '@chakra-ui/react';
import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const Login = () => {
  const [hasUser, setHasUser] = useState(true);

  return (
    <Flex direction={'column'} pt={40} mx={7}>
      {hasUser ? <LoginForm /> : <SignupForm />}
      {hasUser ? (
        <Flex mt={5} justifyContent={'center'} alignItems="center">
          <Text mr={5}>Are you not EPjC yet?</Text>
          <Button colorScheme="blue" onClick={() => setHasUser(false)}>
            Sign up
          </Button>
        </Flex>
      ) : (
        <Flex mt={5} justifyContent={'center'} alignItems="center">
          <Text mr={5}>Are you EPjC?</Text>
          <Button colorScheme="blue" onClick={() => setHasUser(true)}>
            Log in
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Login;
