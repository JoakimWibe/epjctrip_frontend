import AddedActivitiyCard from "../components/AddedActivitiyCard";
import moment from "moment";
import { NewPlan } from "../App";
import PlanForm from "../components/PlanForm";

import {
  Heading,
  Divider,
  Button,
  useDisclosure,
  Flex,
  Grid,
  Text,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import {
  deletePlanById,
  getPlan,
  postPlan,
  updatePlan,
  userUrl,
} from "../constants/api";
import axios from "axios";
import PlanCard from "../components/PlanCard";
import { TripContext } from "../context/Context";

export interface SavedPlan {
  id: number;
  name: string;
  departure: string;
  destination: string;
  startDate: string;
  endDate: string;
  participants: number;
  cost: number;
  activities: [];
  userId: number;
}

const Plan = () => {
  const { setPlans, plans }: any = useContext(TripContext);
  const userId = localStorage.getItem("userId");
  //const [plans, setPlans] = useState<SavedPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<SavedPlan | undefined>(
    undefined
  );

  useEffect(() => {
    if (userId !== null) {
      getPlans();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPlans = async () => {
    try {
      const response = await axios.get(userUrl + "/" + userId);
      setPlans(response.data.plans);
    } catch (error) {
      console.log(error);
    }
  };

  const getPlanFromApi = async () => {
    const plans = await getPlan();
    setPlans(plans || []);
  };

  const savePlan = async (plan: NewPlan) => {
    const saveAPlan = await postPlan(plan);
    if (saveAPlan) {
      setPlans([...plans, saveAPlan]);
    }
  };

  const saveUpdatedPlan = async (id: number, plan: NewPlan) => {
    const updateAPlan = await updatePlan(id, plan);
    const updatedPlans = plans.map((plan: any) => {
      if (plan.id === id) {
        return updateAPlan;
      }
      return plan;
    });
    setPlans(updatedPlans);
  };

  const deletePlan = async (id: number) => {
    await deletePlanById(id);
    const filterPlans = plans.filter((plan: any) => plan.id !== id);
    setPlans(filterPlans);
    localStorage.removeItem("planId");
  };

  useEffect(() => {
    getPlanFromApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const { onOpen, isOpen, onClose } = useDisclosure();

  const handleDelete = (id: number) => {
    console.log(id);
    deletePlan(id);
  };

  const handleOnClick = (plan: SavedPlan) => {
    setSelectedPlan(plan);
    onOpen();
  };

  return (
    <Flex pt={40} direction={"column"} maxW={"3xl"} mx={{ sm: 5, md: "auto" }}>
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Heading color={"gray.700"} py={4}>
          Travel Planner
        </Heading>
        <Button colorScheme="blue" onClick={onOpen}>
          Create plan
        </Button>
      </Flex>

      <Divider mb={4} />

      <Flex>
        {plans.map((plan: any) => (
          <PlanCard plan={plan} />
        ))}
      </Flex>

      <Flex>

        {userId !== null &&
          plans
            .filter((plan: any) => plan.userId === parseInt(userId))
            .map((plan: SavedPlan) => (
              <Flex direction={"column"} key={plan.id}>
                <Heading mb={4} fontSize={"3xl"}>
                  {plan.name}
                </Heading>
                <Grid gap={4} mb={4} gridTemplateColumns={"1fr 1fr"}>
                  <Text>Departure: {plan.departure}</Text>
                  <Text>Destination: {plan.destination}</Text>
                  <Text>
                    Start Date: {moment(plan.startDate).format("YYYY-MM-DD")}
                  </Text>
                  <Text>
                    End Date: {moment(plan.endDate).format("YYYY-MM-DD")}
                  </Text>
                  <Text>Participants: {plan.participants}</Text>
                  <Text>
                    Cost of your trip: €
                    {plan.activities === null
                      ? 0
                      : plan.activities
                          ?.map((activity: any) => activity?.price)
                          .reduce((a, b) => a + b, 0) * plan.participants}
                  </Text>
                </Grid>
                <Flex my={8}>
                  <Button
                    colorScheme="blue"
                    mr={6}
                    onClick={() => handleOnClick(plan)}
                  >
                    Update
                  </Button>
                  <Button
                    background={"white"}
                    border={"1px"}
                    borderColor={"red.500"}
                    color={"red.500"}
                    onClick={() => handleDelete(plan.id)}
                  >
                    Delete
                  </Button>
                </Flex>

                <Divider mb={4} />

                <Heading fontSize={"3xl"} mb={8}>
                  Activities
                </Heading>
                <Flex direction={"column"}>
                  {plan.activities
                    ?.filter((activity: any) => activity.planId === plan.id)
                    .map((planActivity: any) => (
                      <AddedActivitiyCard
                        key={planActivity.id}
                        activity={planActivity}
                      />
                    ))}
                </Flex>
              </Flex>
            ))}
      </Flex>
      <PlanForm
        savePlan={savePlan}
        saveUpdatedPlan={saveUpdatedPlan}
        isOpen={isOpen}
        onClose={onClose}
        plan={selectedPlan}
      />
    </Flex>
  );
};

export default Plan;
