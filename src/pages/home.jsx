import React, { Component,PropTypes } from 'react';
import { connect } from 'react-redux';
//import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../store/actions';
import BarChart from 'chart.js';
import style from '../css/home.less';


class Login extends Component {
  constructor(props) {
	super(props);
	this.state = {
	   
	};
  }

  componentDidMount(){
  	let t = this;
  	var data = {
		labels : ["January","February","March","April","May","June","July"],
		datasets : [
			{
				label:"每个月发博客的数量",
				borderColor:"blue",
				pointBackgroundColor:"#ccc",
				fill:false,
				data : [65,59,90,81,56,55,40]
			}
		]
	};	
	var data1 = {
		labels : ["html","css","js","框架","webpack","git","node"],
		datasets : [
			{
				label:"博客数",
				backgroundColor:["red","yellow","blue","green","#ccc","#abcdef","#aaccfa"],
				fill:false,
				data : [65,59,90,81,56,55,40]
			}
		]
	}	

  	var ctxa = document.getElementById("myCharta").getContext("2d");
  	var ctxb = document.getElementById("myChartb").getContext("2d");
  	//console.log(ctx,new Chart(ctx).Bar(data));
	var line = new BarChart(ctxa,{
		type:'line',
		data:data,
		options:{
			animation:{
				duration:1500,
				easing:'easeInSine',
			},
			hover: {
            	animationDuration: 0, 
        	},
			elements: {
	            line: {
	                tension: 0, 
	            }
        	}
		}
	});

	var bar = new BarChart(ctxb,{
		type:'bar',
		data:data1,
		options:{
			animation:{
				duration:1500,
				easing:'easeInSine',
			},
			hover: {
            	animationDuration: 0, 
        	},
			elements: {
	            line: {
	                tension: 0, // disables bezier curves
	            }
        	}
		}
	});
  }
	
  render() {
    let t = this;
    
    return (
      <div className={style.home} >
 		<ReactCSSTransitionGroup
          transitionName={{
          	enter: style.enter,
          	enterActive: style["enter-active"],
		    leave: style.leave,
		    leaveActive: style["leave-active"],
		    appear: style.appear,
			appearActive:style["appear-active"]}
		  }
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}
          transitionAppearTimeout={1000}
          transitionAppear={true}
          >
  		  <div className={style.bor} key={t.state.item}>
  			<div className={style.header}>
  				<h2>web-shikun的博客</h2>
  				<p>——人所缺乏的不是才干而是志向，不是成功的能力而是勤劳的意志。</p>
  			</div>
  			<ul className={style.main}>
  				<li>
  					<div className={style.descrition}>
  						<p></p>
  						<div className={style.maindes}>
  							这是一篇文章
  						</div>
  					</div>
  					<p></p>
  					<div className={style.time}>
  						<p>2017</p>
  						<p>11-13</p>
  					</div>
  				</li>
  				<li>
  					<div className={style.descrition}>
  						<p></p>
  						<div className={style.maindes}>
  							这是一篇文章
  						</div>
  					</div>
  					<p></p>
  					<div className={style.time}>
  						<p>2017</p>
  						<p>11-13</p>
  					</div>
  				</li>
  				<li>
  					<div className={style.descrition}>
  						<p></p>
  						<div className={style.maindes}>
  							这是一篇文章
  						</div>
  					</div>
  					<p></p>
  					<div className={style.time}>
  						<p>2017</p>
  						<p>11-13</p>
  					</div>
  				</li>
  				<li>
  					<div className={style.descrition}>
  						<p></p>
  						<div className={style.maindes}>
  							这是一篇文章
  						</div>
  					</div>
  					<p></p>
  					<div className={style.time}>
  						<p>2017</p>
  						<p>11-13</p>
  					</div>
  				</li>
  				<li>
  					<div className={style.descrition}>
  						<p></p>
  						<div className={style.maindes}>
  							这是一篇文章
  						</div>
  					</div>
  					<p></p>
  					<div className={style.time}>
  						<p>2017</p>
  						<p>11-13</p>
  					</div>
  				</li>
  			</ul>
  			<div className={style.plot}>
	  			<div style={{"width":"600px","height":"300px","background":"#fff"}}>
	  				<canvas id="myCharta" ></canvas>
	  			</div>
	  			<div style={{"width":"600px","height":"300px","background":"#fff"}}>
	  				<canvas id="myChartb" ></canvas>
	  			</div>
  			</div>
  		  </div>
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

export default connect()(Login)