import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import './index.css'
// import dotenv from 'dotenv'

import reducers from './reducers'

import App from './App'

const store = createStore(reducers, compose(applyMiddleware(thunk)))
// dotenv.config()

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
