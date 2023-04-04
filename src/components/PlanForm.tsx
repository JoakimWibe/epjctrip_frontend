import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
// import moment from 'moment';
import { useState } from 'react';
import { NewPlan } from '../App';

import { SavedPlan } from '../pages/Plan';
import { useForm, SubmitHandler } from 'react-hook-form';


const defaultState = {
  name: '',
  departure: '',
  destination: '',
  startDate: '',
  endDate: '',
  participants: 0,
  cost: 0,
  userId: 0,
};

interface PlanFormProps {
  // plan?: SavedPlan;
  savePlan: (plan: NewPlan) => void;
  // saveUpdatedPlan: (id: number, plan: NewPlan) => void;
  isOpen: boolean;
  onClose: () => void;
}



const PlanForm = ({ savePlan, isOpen, onClose }: PlanFormProps) => {

  const [myPlan, setMyPlan] = useState(defaultState);

  const { name, departure, destination, startDate, endDate, participants, cost } = myPlan;

  // Use effect tracks the plan variable
  // useEffect(() => {
    // If the plan exists (is NOT udefined or null)
    // the set state will be called to update the form
    // if (plan) {
      // with this syntax you extract from plan the keys id and activities and keep all the
      // remaining keys / data in the variable planData
  //     const { id, activities, ...planData } = plan;

  //     planData.startDate = moment(plan.startDate).format('YYYY-MM-DD');
  //     planData.endDate = moment(plan.endDate).format('YYYY-MM-DD');
  //     setMyPlan(planData);
  //   }
  // }, [plan]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //form validation before implementing the logic
    handleSubmit(onSubmit);

    const userId = localStorage.getItem('userId');

    if (userId !== null) {
      const parsedUserId = parseInt(userId);
      // if (plan) {
      //   saveUpdatedPlan(plan.id, myPlan);
      // } else {
        myPlan.userId = parsedUserId;
        savePlan(myPlan);
        setMyPlan(defaultState);
      // }
    }
  };

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Your plan</DrawerHeader>
          <DrawerBody pt={20}>
            <form onSubmit={handleFormSubmit} id="my-form">
              <Box>
                <FormLabel>Plan name</FormLabel>
                <Input {...register("example")} value={name} onChange={e => setMyPlan({ ...myPlan, name: e.target.value })} placeholder="Plan name" />
              </Box>
              <Box>
                <FormLabel>Departure</FormLabel>
                <Input {...register("exampleRequired", { required: true })}
                {...errors.exampleRequired && <span>This field is required</span>}
                
                value={departure} onChange={e => setMyPlan({ ...myPlan, departure: e.target.value })} placeholder="city of departure" />
              </Box>
              <Box>
                <FormLabel>Destination</FormLabel>
                <Input value={destination} onChange={e => setMyPlan({ ...myPlan, destination: e.target.value })} placeholder="destination" />
              </Box>
              <Box>
                <FormLabel>Start Date</FormLabel>
                <Input value={startDate} onChange={e => setMyPlan({ ...myPlan, startDate: e.target.value })} type="date" />
              </Box>
              <Box>
                <FormLabel>End Date</FormLabel>
                <Input value={endDate} onChange={e => setMyPlan({ ...myPlan, endDate: e.target.value })} type="date" />
              </Box>
              <Box>
                <FormLabel>Number of participants</FormLabel>
                <NumberInput min={1}>
                  <NumberInputField value={participants} onChange={e => setMyPlan({ ...myPlan, participants: +e.target.value })} />
                </NumberInput>
              </Box>
              <Box>
                <FormLabel>Planned budget</FormLabel>
                <Input value={cost} onChange={e => setMyPlan({ ...myPlan, cost: +e.target.value })} placeholder="€ " />

              </Box>

            </form>
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">
            <Button
              _hover={{ bg: 'white', color: 'red.500' }}
              background={'red.500'}
              border={'1px'}
              color={'white'}
              borderColor={'red.500'}
              onClick={onClose}
              mr={3}
            >
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={onClose} type="submit" form="my-form">
              Save plan
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default PlanForm;
