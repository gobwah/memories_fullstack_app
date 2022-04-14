import * as api from '../api'
import {
    FETCH_ALL,
    FETCH_BY_SEARCH,
    CREATE,
    LIKE,
    UPDATE,
    DELETE,
    START_LOADING,
    END_LOADING,
    FETCH_POST,
} from '../constants/actionTypes'

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        console.log(FETCH_POST)
        const { data } = await api.fetchPost(id)
        console.log(data)
        dispatch({ type: FETCH_POST, payload: { post: data } })
    } catch (error) {
        console.log(error)
    }
}

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        console.log(FETCH_ALL)
        const {
            data: { data, currentPage, numberOfPages },
        } = await api.fetchPosts(page)
        console.log({ data, currentPage, numberOfPages })
        dispatch({
            type: FETCH_ALL,
            payload: { data, currentPage, numberOfPages },
        })
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error)
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        console.log(FETCH_BY_SEARCH)
        const {
            data: { data },
        } = await api.fetchPostsBySearch(searchQuery)
        console.log({ data })
        dispatch({ type: FETCH_BY_SEARCH, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error)
    }
}

export const createPost = (newPost, history) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        console.log(CREATE)
        const { data } = await api.createPost(newPost)
        console.log({ data })
        history.push(`/posts/${data._id}`)
        dispatch({ type: CREATE, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        console.log(UPDATE)
        const { data } = await api.updatePost(id, post)
        console.log({ data })
        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        console.log(DELETE)
        await api.deletePost(id)
        console.log('ok')
        dispatch({ type: DELETE, payload: id })
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        console.log(LIKE)
        const { data } = await api.likePost(id)
        console.log({ data })
        dispatch({ type: LIKE, payload: data })
    } catch (error) {
        console.log(error)
    }
}
