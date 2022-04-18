import axios from 'axios'

const API = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL })

API.interceptors.request.use((config) => {
    if (localStorage.getItem('profile')) {
        config.headers.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem('profile')).token
        }`
    }
    return config
})

export const fetchPost = (id) => API.get(`/posts/${id}`)
export const fetchPosts = (page) => API.get(`/posts?page=${page}`)
export const fetchPostsBySearch = (searchQuery) => {
    return API.get(
        `/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${
            searchQuery.tags
        }`
    )
}
export const createPost = (newPost) => API.post('/posts', newPost)
export const updatePost = (id, post) => API.patch(`/posts/${id}`, post)
export const deletePost = (id) => API.delete(`/posts/${id}`)
export const likePost = (id) => API.patch(`/posts/${id}/likePost`)
export const comment = (value, id) =>
    API.post(`/posts/${id}/commentPost`, { value })

export const signin = (formData) => API.post(`/user/signin/`, formData)
export const signup = (formData) => API.post(`/user/signup/`, formData)
