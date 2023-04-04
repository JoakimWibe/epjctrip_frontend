import { Button, Card, CardBody, Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { planUrl } from '../constants/api';
import { useContext } from 'react';
import { TripContext } from '../context/Context';
import { DeleteIcon } from '@chakra-ui/icons';

const PlanCard = ({ plan }: any) => {
  const { setPlans, plans }: any = useContext(TripContext);

  const deletePlan = async (id: number) => {
    try {
      await axios.delete(planUrl + '/' + id);
      setPlans(plans.filter((plan: any) => plan.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card w={'full'} p={5}>
      <CardBody>
        <Heading mb={4}>{plan.name}</Heading>
        <Text mb={4}>Destination: {plan.destination}</Text>
        <Flex alignItems={'center'}>
          <IconButton
            onClick={() => {
              deletePlan(plan.id);
              return;
            }}
            mr={6}
            icon={<DeleteIcon />}
            aria-label="delete plan"
          />

          <Link to={`/travelplanner/${plan.id}`}>
            <Button colorScheme="blue">Go to plan</Button>
          </Link>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default PlanCard;
