import axios from 'axios';

const API_KEY = '44630b0df2mshb6c347e6cb811bdp12a0c6jsnbae03fd981c1';
const BASE_URL = 'https://exercisedb.p.rapidapi.com';

export async function fetchExercises(limit = 10) {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/exercises`, {
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
      },
      params: { 
        limit: limit
      }
    });
    return response.data;
  } catch (err) {
    console.error('Помилка API:', err.message);
    return [];
  }
}