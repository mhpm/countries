"use server"

const API_URL = 'https://restcountries.com/v3.1/all'

//get all countries
export const getCountries = async () => await fetch(API_URL).then((res) => res.json())