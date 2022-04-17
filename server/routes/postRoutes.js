import express from 'express'
import {
    getPosts,
    getPostsBySearch,
    getPost,
    createPost,
    updatePost,
    likePost,
    deletePost,
    commentPost,
} from '../controllers/posts.js'

const postRoutes = express.Router()
import auth from '../middleware/auth.js'

postRoutes.get('/search', getPostsBySearch)
postRoutes.get('/', getPosts)
postRoutes.get('/:id', getPost)

postRoutes.post('/', auth, createPost)
postRoutes.patch('/:id', auth, updatePost)
postRoutes.delete('/:id', auth, deletePost)
postRoutes.patch('/:id/likePost', auth, likePost)
postRoutes.post('/:id/commentPost', auth, commentPost)

export default postRoutes
