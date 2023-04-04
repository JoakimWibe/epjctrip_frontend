import { Card, Box, Link, Text, CardBody, Stack, Heading, CardFooter, ButtonGroup, Button, Alert, AlertIcon, Flex, Select } from '@chakra-ui/react';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { TripContext } from '../context/Context';
import { RecommendedActivity } from './ActivityGallery';
import { RatingStar, RatingStarContainer } from 'rating-star';
import { userUrl } from '../constants/api';

interface ActivityProp {
  activity: RecommendedActivity;
}

const ActivityCard = ({ activity }: ActivityProp) => {
  const [success, setSuccess] = useState(false);
  const [planExists, setPlanExists] = useState(false);
  const { loggedIn }: any = useContext(TripContext);
  const [addClicked, setAddClicked] = useState(false);
  const [userPlans, setUserplan] = useState([]);
  const [choosenPlan, setChoosenPlan] = useState(null);

  const userId = localStorage.getItem('userId');

  const getUserPlans = async (id: string) => {
    try {
      const response = await axios.get(userUrl + '/' + id);
      setUserplan(response.data.plans);

      if (response.data.plans.length > 0) {
        setPlanExists(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId !== null) {
      getUserPlans(userId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToPlan = async () => {
    setAddClicked(true);

    const image = activity.photo.images.medium.url === undefined ? 'no image url available' : activity.photo.images.medium.url;

    const newActivity = {
      name: activity.name,
      description: activity.description,
      link: activity.web_url,
      imageUrl: image,
      rating: activity.rating,
      ranking: activity.ranking,
      street: activity.address,
      reviewsNumber: activity.num_reviews,
      city: activity.address_obj.city,
      longitude: activity.longitude,
      latitude: activity.latitude,
      planId: choosenPlan,
    };

    try {
      await axios.post('https://epjctripapi.azurewebsites.net/api/Activities', newActivity);
      setSuccess(true);
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <Card borderRadius={10} shadow={'md'} color={'gray.700'}>
      <CardBody>
        <Stack>
          <Box
            borderRadius={10}
            h={'300px'}
            mb={5}
            backgroundImage={activity.photo.images.medium.url}
            backgroundPosition={'bottom'}
            backgroundSize={'cover'}
            backgroundRepeat={'no-repeat'}
          ></Box>
          <Heading size="md">{activity.name}</Heading>
          <Text textOverflow={'ellipsis'} wordBreak={'break-word'} lineHeight={5} overflow={'hidden'} maxH={20}>
            {activity.description}
          </Text>
          <Flex alignItems={'center'}>
            <Text mt={'3px'}>Rating: {activity.rating}</Text>
            <RatingStarContainer>
              <RatingStar noBorder id={activity.location_id} rating={activity.rating} />
            </RatingStarContainer>
          </Flex>
          <Text fontWeight={'bold'}>{activity.ranking}</Text>
          <Text>Number of reviews: {activity.num_reviews}</Text>
          <Text>Address: {activity.address}</Text>
        </Stack>
      </CardBody>
      <CardFooter display={'flex'} flexDirection={'column'}>
        <Select mb={6} placeholder="Select plan" onChange={(event: any) => setChoosenPlan(event.target.value)}>
          {userPlans.map((plan: any) => (
            <option key={plan.id} value={plan.id}>
              {plan.name}
            </option>
          ))}
        </Select>
        <ButtonGroup display="flex" alignItems="center" spacing="5">
          <Button onClick={addToPlan} variant="solid" border={'1px'} bg={'white'} color={'blue.400'} borderColor={'epjc.darkgreen'}>
            Add to My plan
          </Button>
          <Link href={activity.web_url} isExternal>
            View on Tripadvisor
          </Link>
        </ButtonGroup>
      </CardFooter>

      {success && (
        <Alert status={'success'}>
          <AlertIcon />
          Activity added to plan
        </Alert>
      )}

      {addClicked === true && !loggedIn && (
        <Alert status={'info'}>
          <AlertIcon />
          <Text>
            Please log in to add an activity{' '}
            <Link href="/login">
              Login
            </Link>
          </Text>
        </Alert>
      )}

      {addClicked === true && loggedIn === true && !planExists && (
        <Alert status={'info'}>
          <AlertIcon />
          Please Create a plan on "Travel Planner" page before adding activites
        </Alert>
      )}

      {addClicked === true && loggedIn === true && !choosenPlan && (
        <Alert status={'info'}>
          <AlertIcon />
          Please select a plan before adding activites
        </Alert>
      )}
    </Card>
  );
};

export default ActivityCard;
