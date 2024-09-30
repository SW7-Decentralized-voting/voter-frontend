import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

const getCandidates = async () => {
    const response = await api.get('/candidates');
    return response.data;
}

export { getCandidates };