import { SearchIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, IconButton, Input } from '@chakra-ui/react';
import axios from 'axios';
import { useContext, useState } from 'react';
import { TripContext } from '../context/Context';
import { apiHost, apiKey, traveAdvisorAttractionsUrl, travelAdvisorSearchUrl } from '../constants/api';

const FilterActivities = () => {
  const [inputValue, setInputValue] = useState('');
  const { loading, setIsInputSearched, setSearchInputValue, setRecommendedActivities, setLoading, recommendedActivities }: any =
    useContext(TripContext);

  const getRecommendedActivities = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const locationOptions: any = {
      method: 'GET',
      url: travelAdvisorSearchUrl,
      params: {
        query: inputValue,
        limit: '30',
        offset: '0',
        units: 'km',
        location_id: '1',
        currency: 'USD',
        sort: 'relevance',
        lang: 'en_US',
      },
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': apiHost,
      },
    };

    try {
      const locationIdResponse = await axios.request(locationOptions);
      const locationId = locationIdResponse.data.data[0].result_object.location_id;

      const attractionsOptions = {
        method: 'GET',
        url: traveAdvisorAttractionsUrl,
        params: {
          location_id: locationId,
          currency: 'USD',
          lang: 'en_US',
          lunit: 'km',
          sort: 'recommended',
        },
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': apiHost,
        },
      };

      const attractionsResponse = await axios.request(attractionsOptions);
      const activities = attractionsResponse.data.data.filter((activity: any) => activity.name !== undefined);

      setRecommendedActivities(activities);

      setIsInputSearched(true);
      setSearchInputValue(inputValue);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Box
      mt={recommendedActivities.length < 1 ? 0 : { base: 32, md: 52 }}
      mb={20}
      background={'#fafafa'}
      py={10}
      px={20}
      borderRadius={10}
      shadow={'lg'}
    >
      <Heading color={'gray.700'} mb={5} textAlign="center">
        Where are we going?
      </Heading>

      <form onSubmit={getRecommendedActivities}>
        <Flex borderRadius={'15px'}>
          <Input
            value={inputValue}
            onChange={(e: any) => setInputValue(e.target.value)}
            placeholder="Type your destination (e.g. Paris)"
            backgroundColor={'white'}
            borderRadius={'5px 0 0 5px'}
          />
          <IconButton
            borderRadius={'0 5px 5px 0'}
            bg={'blue.400'}
            color={'white'}
            type="submit"
            icon={<SearchIcon />}
            aria-label={'search activites by location'}
            variant="customIconButton"
          />
        </Flex>
      </form>

      {loading && (
        <div className="col-sm-2">
          <div className="sp sp-3balls"></div>
        </div>
      )}
    </Box>
  );
};
export default FilterActivities;
