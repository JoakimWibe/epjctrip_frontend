import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { planUrl } from '../constants/api';
import axios from 'axios';
import { Button, Divider, Flex, Heading, Text, useDisclosure } from '@chakra-ui/react';
import AddedActivitiyCard from '../components/AddedActivitiyCard';
import moment from 'moment';
import { TripContext } from '../context/Context';
import { ArrowBackIcon } from '@chakra-ui/icons';
import UpdatePlanForm from '../components/UpdatePlanForm';


const PlanDetails = () => {
  let { id } = useParams();
  const [plan, setPlan]: any = useState({});
  const { setPlanActivities, planActivities }: any = useContext(TripContext);

  useEffect(() => {
    getPlan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPlan = async () => {
    try {
      const response = await axios.get(planUrl + '/' + id);
      setPlan(response.data);
      setPlanActivities(response.data.activities);
    } catch (error) {
      console.log(error);
    }
  };

  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <Flex direction={'column'} w={'3xl'} pt={40} mx={'auto'} justifyContent={'center'}>
      <Link to="/travelplanner">
        <Flex alignItems={'center'}>
          <ArrowBackIcon mr={2} />
          <Text>Back to dashboard</Text>
        </Flex>
      </Link>

      <Flex my={6} w={'full'} justifyContent={'space-between'}>
        <Heading>{plan.name}</Heading>
        <Button colorScheme="blue" onClick={onOpen}>Edit plan</Button>
      </Flex>

      <Divider mb={6} />

      <Flex fontWeight={'bold'} mb={6} shadow={'md'} borderRadius={10} p={5} direction={'column'}>
        <Text mb={4}>Departure: {plan.departure}</Text>
        <Text mb={4}>Destination: {plan.destination}</Text>
        <Text mb={4}>Start date: {moment(plan.startDate).format('YYYY-MM-DD')}</Text>
        <Text mb={4}>End date: {moment(plan.endDate).format('YYYY-MM-DD')}</Text>
        <Text mb={4}>Participants: {plan.participants}</Text>
        <Text mb={4}>Budget: €{plan.budget}</Text>
      </Flex>

      <Flex mb={6}>CARBON FOOTPRINT CHART</Flex>

      <Heading fontSize={'3xl'} mb={6}>
        Activities
      </Heading>
      <Flex>
        {planActivities ? (
          <Flex direction={'column'}>
            {planActivities.map((activity: any) => (
              <AddedActivitiyCard activity={activity} />
            ))}
          </Flex>
        ) : (
          <Text>No activities added yet</Text>
        )}
      </Flex>
      <UpdatePlanForm plan={plan} setPlan={setPlan} isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </Flex>
  );
};

export default PlanDetails;
