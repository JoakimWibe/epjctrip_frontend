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
  Text,
} from "@chakra-ui/react";
import { NewPlan } from "../App";
import { useForm } from "react-hook-form";

interface PlanFormProps {
  savePlan: (plan: NewPlan) => void;
  isOpen: boolean;
  onClose: () => void;
}

const PlanForm = ({ savePlan, isOpen, onClose }: PlanFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleFormSubmit = async (data: any, e: any) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    const planRequest = {
      name: data.name,
      departure: data.departure,
      destination: data.destination,
      startDate: data.startDate,
      endDate: data.endDate,
      participants: data.participants,
      budget: data.budget,
      userId: 0,
    };

    console.log("this is the" + planRequest);

    if (userId !== null) {
      const parsedUserId = parseInt(userId);
      planRequest.userId = parsedUserId;
      savePlan(planRequest);
      reset();

      onClose();
    }
  };

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Create a plan</DrawerHeader>
          <DrawerBody pt={20}>
            <form onSubmit={handleSubmit(handleFormSubmit)} id="my-form">
              <Box>
                <FormLabel>Plan name</FormLabel>
                <Input
                  defaultValue=""
                  {...register("name", { required: true })}
                  placeholder="Plan name"
                />
                {errors.name && (
                  <Text mb={5} color={"red.400"}>
                    This field is required
                  </Text>
                )}
              </Box>
              <Box>
                <FormLabel>Departure</FormLabel>

                <Input
                  defaultValue=""
                  {...register("departure", { required: true })}
                  placeholder="city of departure"
                />
                {errors.departure && (
                  <Text mb={5} color={"red.400"}>
                    This field is required
                  </Text>
                )}
              </Box>
              <Box>
                <FormLabel>Destination</FormLabel>
                <Input
                  defaultValue=""
                  {...register("destination", { required: true })}
                  placeholder="destination"
                />
                {errors.destination && (
                  <Text mb={5} color={"red.400"}>
                    This field is required
                  </Text>
                )}
              </Box>
              <Box>
                <FormLabel>Start Date</FormLabel>
                <Input
                  defaultValue=""
                  {...register("startDate", { required: true })}
                  type="date"
                />
                {errors.startDate && (
                  <Text mb={5} color={"red.400"}>
                    This field is required
                  </Text>
                )}
              </Box>

              <Box>
                <FormLabel>End Date</FormLabel>
                <Input
                  defaultValue=""
                  {...register("endDate", { required: true })}
                  type="date"
                />
                {errors.endDate && (
                  <Text mb={5} color={"red.400"}>
                    This field is required
                  </Text>
                )}
              </Box>
              <Box>
                <FormLabel>Number of participants</FormLabel>
                <NumberInput min={1}>
                  <NumberInputField
                    defaultValue=""
                    {...register("participants", { required: true })}
                  />
                  {errors.participants && (
                    <Text mb={5} color={"red.400"}>
                      This field is required
                    </Text>
                  )}
                </NumberInput>
              </Box>
              <Box>
                <FormLabel>Planned budget</FormLabel>
                <Input
                  defaultValue=""
                  {...register("budget", { required: true })}
                  placeholder="€ "
                />
                {errors.budget && (
                  <Text mb={5} color={"red.400"}>
                    This field is required
                  </Text>
                )}
              </Box>
            </form>
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">
            <Button
              _hover={{ bg: "white", color: "red.500" }}
              background={"red.500"}
              border={"1px"}
              color={"white"}
              borderColor={"red.500"}
              onClick={onClose}
              mr={3}
            >
              Cancel
            </Button>
            <Button colorScheme="blue" type="submit" form="my-form">
              Save plan
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default PlanForm;
