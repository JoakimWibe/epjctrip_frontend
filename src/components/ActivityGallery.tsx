import { Grid } from '@chakra-ui/react';
import { useContext } from 'react';
import { TripContext } from '../context/Context';
import ActivityCard from './ActivityCard';

export interface RecommendedActivity {
  latitude: any;
  longitude: any;
  location_id: string;
  ranking: string;
  address_obj: any;
  num_reviews: any;
  web_url: string | undefined;
  photo: any;
  address: any;
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  rating: number;
  price: number;
  street: string;
  activityLink: string;
  reviewsNumber: number;
  city: string;
}

const ActivityGallery = () => {
  const { recommendedActivities } = useContext<any>(TripContext);

  return (
    <Grid gridTemplateColumns={{ base: '1fr', md: '1fr 1fr 1fr' }} gap={6} my={6} mx={10}>
      {recommendedActivities.map((activity: RecommendedActivity) => (
        <ActivityCard activity={activity} />
      ))}
    </Grid>
  );
};

export default ActivityGallery;
