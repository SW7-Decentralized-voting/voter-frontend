import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

const verifyHash = async (hash) => {
    const response = await api.post('/verify-hash', { hash });
    return response.data;
};

export { verifyHash };