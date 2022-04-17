import {
    AppBar,
    Button,
    Container,
    Grid,
    Grow,
    Paper,
    TextField,
} from '@material-ui/core'
import ChipInput from 'material-ui-chip-input'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { getPostsBySearch } from '../../actions/posts'
import Form from '../Form/Form'
import Pagination from '../Pagination'
import Posts from '../Posts/Posts'
import useStyles from './styles'
import queryString from 'query-string'

function useQuery() {
    return queryString.parse(useLocation().search)
}

const Home = () => {
    const classes = useStyles()
    const query = useQuery()
    const page = query.page || 1
    const searchQuery = query.searchQuery || ''
    const tagsParam = query.tags || ''

    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch()

    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])
    const history = useHistory()

    useEffect(() => {
        if (searchQuery.trim() || tagsParam.trim()) {
            dispatch(getPostsBySearch({ search: searchQuery, tags: tagsParam }))
        }
    }, [])

    const searchPost = () => {
        if (search.trim() || tags.length) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }))
            history.push(
                `/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(
                    ','
                )}`
            )
        } else {
            history.push(`/`)
        }
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost()
        }
    }

    const handleAdd = (tag) => setTags([...tags, tag])

    const handleDelete = (tag) => setTags(tags.filter((t) => t !== tag))

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid
                    className={classes.gridContainer}
                    container
                    justifyContent="space-between"
                    alignItems="stretch"
                    spacing={3}
                >
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar
                            className={classes.appBarSearch}
                            position="static"
                            color="inherit"
                        >
                            <TextField
                                name="search"
                                variant="outlined"
                                label="Search Memories"
                                fullWidth
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label="Search Tags"
                                variant="outlined"
                            />
                            <Button
                                onClick={searchPost}
                                className={classes.searchButton}
                                color="primary"
                                variant="contained"
                            >
                                Search
                            </Button>
                        </AppBar>
                        <Form
                            currentId={currentId}
                            setCurrentId={setCurrentId}
                        />
                        {!searchQuery && !tags.length && (
                            <Paper elevation={6} className={classes.pagination}>
                                <Pagination page={page} />
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
