import axios from 'axios';

const URI= 'http://localhost:5000';

export const fetchPosts = () => {
    return axios.get(`${URI}/posts`)
};

export const createPost = (payload) => {
    return axios.post(`${URI}/posts`, payload);
};

export const updatePost = (payload) => {
    return axios.post(`${URI}/posts/update`, payload);
}