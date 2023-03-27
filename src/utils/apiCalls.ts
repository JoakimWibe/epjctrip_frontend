import axios from 'axios';

export const getLocationId = async () => {
  try {
    const response = await axios.get(
      'https://api.content.tripadvisor.com/api/v1/location/search?key=7C23E6E7D20B4DCF96588CBA6859738D&searchQuery=Amsterdam&language=en'
    );
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
