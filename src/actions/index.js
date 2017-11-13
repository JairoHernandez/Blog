import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const CREATE_POST = 'create_post';
export const FETCH_POST = 'fetch_post';
export const DELETE_POST = 'delete_post';

const ROOT_URL = 'https://reduxblog.herokuapp.com/api';
const API_KEY = '?key=hakeem22';

export function fetchPosts() {
  
    const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

    return {
        type: FETCH_POSTS,
        payload: request
    }
}

// values come from Post. Posts fires off action.
export function createPost(values, callback) {
    // Waits for post request to first finish and then it calls callback to take us to root page.
    const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values).then(() => callback());

    return {
        type: CREATE_POST,
        payload: request
    }
}

export function fetchPost(id) {
    const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

    return {
        type: FETCH_POST,
        payload: request
    }
}

export function deletePost(id, callback) {
    const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`).then(() => callback());

    return {
        type: DELETE_POST,
        payload: id 
    }
}