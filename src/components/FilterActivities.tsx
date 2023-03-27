import { SearchIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, IconButton, Input } from '@chakra-ui/react';
import { getLocationId } from '../utils/apiCalls';

const FilterActivities = () => {
  return (
    <Box maxW="md" m={{ sm: 5, md: 'auto' }}>
      <Heading textAlign="center" mb={5}>
        Choose a location
      </Heading>

      <Flex>
        <Input placeholder="location..." />
        <IconButton onClick={getLocationId} icon={<SearchIcon />} aria-label={'search activites by location'} />
      </Flex>
    </Box>
  );
};

export default FilterActivities;
