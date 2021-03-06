import { Button, Paper, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createPost, updatePost } from '../../actions/posts'
import useStyles from './styles'
import ChipInput from 'material-ui-chip-input'

const initialSate = {
    title: '',
    message: '',
    tags: [],
    selectedFile: '',
}

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState(initialSate)
    const post = useSelector((state) =>
        currentId ? state.posts.posts.find((p) => p._id === currentId) : null
    )
    const classes = useStyles()
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    const history = useHistory()

    useEffect(() => {
        if (!post?.title) {
            clear()
        }

        if (post) {
            setPostData(post)
        }
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (currentId) {
            dispatch(
                updatePost(currentId, { ...postData, name: user?.result?.name })
            )
        } else {
            dispatch(
                createPost({ ...postData, name: user?.result?.name }, history)
            )
        }
        clear()
    }

    const clear = () => {
        setCurrentId(0)
        setPostData(initialSate)
    }

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper} elevation={6}>
                <Typography variant="h6" align="center">
                    Please sign in to create your own memories
                </Typography>
            </Paper>
        )
    }

    const handleAddChip = (tag) => {
        setPostData({ ...postData, tags: [...postData.tags, tag] })
    }

    const handleDeleteChip = (chipToDelete) => {
        setPostData({
            ...postData,
            tags: postData.tags.filter((tag) => tag !== chipToDelete),
        })
    }

    return (
        <Paper className={classes.paper} elevation={6}>
            <form
                autoComplete="off"
                noValidate
                className={`${classes.root} ${classes.form}`}
                onSubmit={handleSubmit}
            >
                <Typography variant="h6">
                    {currentId
                        ? `Editing "${post?.title}"`
                        : 'Creating a Memory'}
                </Typography>
                <TextField
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) =>
                        setPostData({ ...postData, title: e.target.value })
                    }
                />
                <TextField
                    name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    multiline
                    minRows={4}
                    value={postData.message}
                    onChange={(e) =>
                        setPostData({ ...postData, message: e.target.value })
                    }
                />
                <div style={{ padding: '5px 0', width: '94%' }}>
                    <ChipInput
                        name="tags"
                        variant="outlined"
                        label="Tags"
                        fullWidth
                        value={postData.tags}
                        onAdd={(chip) => handleAddChip(chip)}
                        onDelete={(chip) => handleDeleteChip(chip)}
                    />
                </div>
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) =>
                            setPostData({ ...postData, selectedFile: base64 })
                        }
                    />
                </div>
                <Button
                    className={classes.buttonSubmit}
                    variant="contained"
                    type="submit"
                    color="primary"
                    size="large"
                    fullWidth
                >
                    Submit
                </Button>
                <Button
                    className={classes.buttonSubmit}
                    variant="contained"
                    color="secondary"
                    size="small"
                    fullWidth
                    onClick={clear}
                >
                    Clear
                </Button>
            </form>
        </Paper>
    )
}

export default Form
