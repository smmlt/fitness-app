import axios from 'axios'

const API_KEY = process.env.EXPO_PUBLIC_RAPIDAPI_KEY;
const API_HOST = process.env.EXPO_PUBLIC_RAPIDAPI_HOST;
const BASE_URL = process.env.EXPO_PUBLIC_RAPIDAPI_BASE_URL;

export async function fetchExercisesByBodyPart(bodyPartName)
{
    try {
        const response = await axios.get(`${BASE_URL}/exercises/bodyPart/${bodyPartName}`, {
            params: { bodyPartName },
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': API_HOST
            }
        })

        return (response).data;
    }
    catch (e)
    {
        console.error(`api error ${e.message}`)
        return []
    }
}

export async function fetchExercises()
{
    try {
        const response = await axios.get(`${BASE_URL}/exercises`, {
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
            }
        })

        return response.data;
    }
    catch (e)
    {
        console.error(`api error ${e.message}`)
        return []
    }
}