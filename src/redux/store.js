import { createStore, combineReducers } from 'redux'

import mainReducer from './reducers/mainReducer'
import controlReducer from './reducers/controlReducer.js'

let rootReducer = combineReducers({mainReducer, controlReducer})

const store = createStore (
   rootReducer, 
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store