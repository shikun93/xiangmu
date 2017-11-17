import { combineReducers } from 'redux'
import { ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from './actions'
const { SHOW_ALL } = VisibilityFilters

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function todos(state = {title:'',singer:'',lryic:[],m4a:'',n:0}, action) {
  switch (action.type) {
    case ADD_TODO:
      return Object.assign({}, state, {
            title:action.title,
	      	singer:action.singer,
	      	lryic:action.lryic,
	      	m4a:action.m4a
        })
    case COMPLETE_TODO:
      return Object.assign({}, state, {
           n:action.n
        })
    default:
      return state
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos
})

export default todoApp