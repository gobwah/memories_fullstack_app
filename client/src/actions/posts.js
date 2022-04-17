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
    COMMENT,
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
        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        console.log(DELETE)
        await api.deletePost(id)
        dispatch({ type: DELETE, payload: id })
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        console.log(LIKE)
        const { data } = await api.likePost(id)
        dispatch({ type: LIKE, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const commentPost = (value, id) => async (dispatch) => {
    try {
        console.log(COMMENT)
        const { data } = await api.comment(value, id)
        dispatch({ type: COMMENT, payload: data })
        return data.comments
    } catch (error) {
        console.log(error)
    }
}
