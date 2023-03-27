import { Text, Flex, Button } from '@chakra-ui/react';
import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const Login = () => {
  const [hasUser, setHasUser] = useState(true);

  return (
    <Flex direction={'column'} mt={20}>
      {hasUser ? <LoginForm /> : <SignupForm />}
      {hasUser ? (
        <Flex mt={5} justifyContent={'center'} alignItems="center">
          <Text mr={5}>Don't have a user?</Text>
          <Button onClick={() => setHasUser(false)}>Sign up</Button>
        </Flex>
      ) : (
        <Flex mt={5} justifyContent={'center'} alignItems="center">
          <Text mr={5}>Already have a user?</Text>
          <Button onClick={() => setHasUser(true)}>Log in</Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Login;
