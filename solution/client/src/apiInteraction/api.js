const LOCALURL = "http://localhost:3000";


import axios from 'axios';

const api = axios.create({
  baseURL: LOCALURL, // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("token")}`,
    // 'Access-Control-Allow-Origin' : '*'
  },
});

export default api;

export const apiRegistration = async (ipEmail, ipPassword) => {

    try {
        // Make a POST request to the backend register route
    const response = await api.post(`/train/register`, {

      
    });

    console.log(response); // Successful response from the backend

    return response // Successful response from the backend
    } catch (error) {
    console.error('Error:', error);
}
}

export const apiLogin = async (ipEmail, ipPassword) => {

    try {
        // Make a POST request to the backend register route
    const response = await api.post(`/train/auth`, {
        ipEmail,
        ipPassword,
    });
    // localStorage.setItem(response.data.access_token)
    console.log(response); // Successful response from the backend

    return response // Successful response from the backend
    } catch (error) {
    console.error('Error:', error);
}
} 


export const apiGetAllTrains = async (platform) =>{
  try {
    const res = await api.get(`/train/trains`,);
    console.log('Content Fetched successfully');
    console.log(res)
    return res;
  } catch (error) {
    console.error('Error Fetching content:', error);
  }
}