import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
//import style from '../css/index.less';
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../store/actions';
import Editor from '../components/editor';
import Form from '../components/form';

class App extends Component {

  componentDidMount() {	
  
  	}	

  getValue(dispatch,event){
  	
  }

 


  render() {
    let t = this;
    const { dispatch,title,singer,lryic,m4a,n,lists } = this.props
    
    return (
      <div className={style.bor}>
        
      </div>
    )
  }
}

function select(state){
	return {
		title:state.todos.title,
		singer:state.todos.singer,
		lryic:state.todos.lryic,
		m4a:state.todos.m4a,
		n:state.todos.n
	}
}

export default connect(select)(App)