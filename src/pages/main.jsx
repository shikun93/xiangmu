import React, { Component,PropTypes } from 'react';
import { connect } from 'react-redux';
//import PropTypes from 'prop-types';
import {Link} from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../store/actions';
import style from '../css/main.less';
import audio1 from '../music/xzq-xfyy.mp3';
import audio2 from '../music/xzq-bie.mp3';
import audio3 from '../music/mh-jwcs.mp3';

const musicList = [
	{
		title:"薛之谦-像风一样",
		src:audio1
	},
	{
		title:"薛之谦-别",
		src:audio2
	},
	{
		title:"慕寒-寄我此生",
		src:audio3
	}
]

class Main extends Component {
 constructor(props) {
    super(props);
    this.state = {
    	i:1,
    	n:0,
    	play:1
    };
  }

  componentDidMount(){
  	let t = this;
  	var audio=document.getElementById('audio');
	audio.play();
	audio.addEventListener('ended', function () {  
		if(t.state.n==musicList.length-1){
			sessionStorage.setItem("n",0);
			t.setState({n:0});
		}else{
			sessionStorage.setItem("n",t.state.n++);
			t.setState({n:t.state.n++});
		}
	}, false);
	setInterval(function(){
		t.state.i++;
		t.setState({i:t.state.i});
	},10000)
  }

  componentDidUpdate(a,state){
  	let n = sessionStorage.getItem("n");
  	if(n!=state.n){
  		let audio=document.getElementById('audio');
  		audio.play();
  	}
  }

  animateRandom(){
  	let data = {};
  	let direction = ['left','top','right','bottom'];
  	let n = parseInt(Math.random()*4);
  	data = {
        enter: style[direction[n]+"-enter"],
        enterActive: style[direction[n]+"-enter-active"],
		leave: style[direction[n]+"-leave"],
		leaveActive: style[direction[n]+"-leave-active"],
		appear: 'appear'
	};
  	return data;
  }

  play(n){
  	let t = this;
  	let audio=document.getElementById('audio');
  	if(n==1){
  		audio.play();
  	}else{
  		audio.pause();
  	}
  	t.setState({play:n});
  }

  musicChange(n){
  	let t = this;
  	sessionStorage.setItem("n",n);
  	t.setState({n:n});
  }

  render() {
  	let t= this;
  	let data = t.animateRandom();
  	let pathname = t.props.location.pathname;
  	let items = <p key={t.state.i}>{musicList[t.state.n].title}</p>;
    return (
      <div className={style.main}>
      	<ul className={style.ul}>
      		<li style={pathname=="/home"||pathname=="/"?{"background":"#ccc"}:{}}>
      			<Link to="/home"></Link>
      		</li>
      		<li style={pathname=="/list"?{"background":"#ccc"}:{}}>
      			<Link to="/list"></Link>
      		</li>
      		<li style={pathname=="/aboutUs"?{"background":"#ccc"}:{}}>
      			<Link to="/aboutUs"></Link>
      		</li>
      		<li style={pathname=="/messageBoard"?{"background":"#ccc"}:{}}>
      			<Link to="/messageBoard"></Link>
      		</li>
      		
      	</ul>

      	<div className={style.muisc}>
  				<div>
  				<ReactCSSTransitionGroup
		          transitionName={{
		          	enter: style["left-enter"],
		          	enterActive: style["left-enter-active"],
				    leave: style["left-leave"],
				    leaveActive: style["left-leave-active"]
				 	}
				  }
		          transitionEnterTimeout={1000}
		          transitionLeaveTimeout={1000}
		        >
		        	{items}
  				</ReactCSSTransitionGroup>
  					{
  						t.state.play?<i onClick={t.play.bind(t,0)} className={style.icon+' '+style.iconfont}>&#xe616;</i>
  						:<i onClick={t.play.bind(t,1)} className={style.icon+' '+style.iconfont}>&#xe700;</i>
  					}
  				</div>
  				<audio src={musicList[t.state.n].src} id="audio">
					您的浏览器不支持 audio 标签。
				</audio>
				<ul className={style.muiscList}>
  					{
  						musicList.map(function(item,index){
  							return <li key={index} onClick={t.musicChange.bind(t,index)}>{item.title}</li>
  						})
  					}
  				</ul>
  		</div>

        <ReactCSSTransitionGroup
          transitionName={data}
          component="div"
          className={style.animate}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          >
  		  <div className={style.bor} key={this.props.location.pathname}>
  			{this.props.children}
  		  </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default connect()(Main)