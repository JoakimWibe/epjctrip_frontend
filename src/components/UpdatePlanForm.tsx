import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormLabel, Input, NumberInput, NumberInputField } from '@chakra-ui/react'
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { updatePlan } from '../constants/api';
import { SavedPlan } from '../pages/Plan';

interface UpdatePlanFormProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  plan: SavedPlan;
  setPlan: (value: SavedPlan) => void;
}

const UpdatePlanForm = ({ isOpen, onClose, plan, setPlan}: UpdatePlanFormProps) => {

  const {
    register,
    handleSubmit,
  } = useForm();

  const submitUpdate = async (data: any, e: any) => {

      const request = {
        id: plan.id,
        name: data.name,
        departure: data.departure,
        destination: data.destination,
        startDate: data.startDate,
        endDate: data.endDate,
        participants: data.participants,
        budget: parseInt(data.budget),
        userId: plan.userId,
        activities: plan.activities
      }

      const response = await updatePlan(plan.id, request);
      console.log(response)

      setPlan(response)
  }

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Update your plan</DrawerHeader>
          <DrawerBody pt={20}>
            <form onSubmit={handleSubmit(submitUpdate)} id="my-form">
              <Box>
                <FormLabel>Plan name</FormLabel>
                <Input defaultValue={plan.name} {...register('name')} placeholder="Plan name" />
              </Box>
              <Box>
                <FormLabel>Departure</FormLabel>
                <Input defaultValue={plan.departure} {...register('departure')} placeholder="city of departure" />
              </Box>
              <Box>
                <FormLabel>Destination</FormLabel>
                <Input defaultValue={plan.destination} {...register('destination')} placeholder="destination" />
              </Box>
              <Box>
                <FormLabel>Start Date</FormLabel>
                <Input defaultValue={moment(plan.startDate).format('YYYY-MM-DD')} {...register('startDate')} type="date" />
              </Box>
              <Box>
                <FormLabel>End Date</FormLabel>
                <Input defaultValue={moment(plan.endDate).format('YYYY-MM-DD')} {...register('endDate')} type="date" />
              </Box>
              <Box>
                <FormLabel>Number of participants</FormLabel>
                <NumberInput defaultValue={plan.participants} >
                  <NumberInputField {...register('participants')} />
                </NumberInput>
              </Box>
              <Box>
                <FormLabel>Planned budget</FormLabel>
                <Input defaultValue={plan.budget} {...register('budget')} placeholder="€ " />
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
  )
}

export default UpdatePlanForm