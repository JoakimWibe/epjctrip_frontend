import { Heading, Divider, Button, useDisclosure, Flex } from '@chakra-ui/react';
// import moment from 'moment';
import { useContext, useEffect } from 'react';
import PlanForm from '../components/PlanForm';
import { postPlan, userUrl } from '../constants/api';
// import AddedActivitiyCard from '../components/AddedActivitiyCard';
import axios from 'axios';
import PlanCard from '../components/PlanCard';
import { TripContext } from '../context/Context';
import { NewPlan } from '../App';

export interface SavedPlan {
  id: number;
  name: string;
  departure: string;
  destination: string;
  startDate: string;
  endDate: string;
  participants: number;
  budget: number;
  activities: [];
  userId: number;
}

const Plan = () => {
  const { setPlans, plans }: any = useContext(TripContext);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId !== null) {
      getPlans();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPlans = async () => {
    try {
      const response = await axios.get(userUrl + '/' + userId);
      setPlans(response.data.plans);
    } catch (error) {
      console.log(error);
    }
  };

  // const [plans, setPlans] = useState<SavedPlan[]>([]);
  // const [selectedPlan, setSelectedPlan] = useState<SavedPlan | undefined>(undefined);

  const savePlan = async (plan: NewPlan) => {
    const saveAPlan = await postPlan(plan);
    if (saveAPlan) {
      setPlans([...plans, saveAPlan]);
    }
  };

  const { onOpen, onClose, isOpen } = useDisclosure();

  // const handleOnClick = (plan: SavedPlan) => {
  //   setSelectedPlan(plan);
  //   onOpen();
  // };

  return (
    <Flex pt={40} direction={'column'} maxW={'3xl'} mx={{ sm: 5, md: 'auto' }}>
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <Heading color={'gray.700'} py={4}>
          Travel Planner
        </Heading>
        <Button colorScheme="blue" onClick={onOpen}>
          Create plan
        </Button>
      </Flex>

      <Divider mb={4} />

      <Flex direction={'column'}>
        {plans.filter((planByUser: any) => planByUser.userId === userId).map((plan: any) => (
          <PlanCard plan={plan} />
        ))}
      </Flex>
      <PlanForm savePlan={savePlan} isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default Plan;
