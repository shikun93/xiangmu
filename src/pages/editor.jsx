import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import style from '../css/editor.less';
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../store/actions';
import Editor from '../components/editor';
import FormItem from '../components/form';

class App extends Component {

  componentDidMount() {
  		const { dispatch } = this.props;
  		let n = 0;
  	}	

  getValue(dispatch,event){
  	dispatch(addTodo(this.refs.text.value));
  }

  aa(){  
    let t = this;
    console.log($(t.refs.form).serializeArray());

  }

  render() {
    let t = this;
    const { dispatch,title,singer,lryic,m4a,n,lists } = this.props
    let obj = {
      label:"标题",
      className:'aa',
      name:'aa',
      placeholder:'aaaaa',
      value:'',
      onChange:t.aa.bind(t)
    };
    let obj1 = {
      label:"标题",
      className:'aa',
      name:'bb',
      placeholder:'aaaaa',
      value:'',
      onChange:t.aa.bind(t)
    };

    let obj2 = {
      className:'aa',
      name:'bb',
      onClick:t.aa.bind(t)
    };
  
    return (
      <div className={style.bor}>
        <form ref="form">
        <FormItem type="input" data={obj} />
        <FormItem type="textarea" data={obj1} />
      	<div className={style.editor}><div><label>编辑</label></div><div className={style.ed_html}><Editor /></div></div>
        <FormItem type="button" data={obj2}>1111</FormItem>
        </form>
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