const API_URL = '/api/countries';

//get all countries
export const getCountries = async () =>
  await fetch(API_URL, { method: 'GET' }).then((res) => res.json());