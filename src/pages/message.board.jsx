import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import style from '../css/message.board.less';
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../store/actions';
import Editor from '../components/editor';
import Form from '../components/form';

class MessageBoard extends Component {

  componentDidMount() {	
    (function(){
      if(navigator.userAgent.indexOf("MSIE 6.0")>0||navigator.userAgent.indexOf("MSIE 7.0")>0||navigator.userAgent.indexOf("MSIE 8.0")>0)
        {return}
      var f=20;
      var v=0.7;
      var g=0;
      var n=0.8;
      var m=0;
      var d=document.getElementById("snowFallTop");
      var q=d.clientWidth;
      var o=d.clientHeight;d.width=q;d.height=o;b();
      var l=d.getContext("2d");
      l.fillStyle="#fff";
      g=o*v;
      m=(o-g)*n;
      var h=function(){
        this.x=0;
        this.y=0;
        this.velocityX=0;
        this.velocityY=0;
        this.radius=0;
        this.transparency=0;
        this.clientWidth=0;
        this.clientHeight=0;
        this.reset()
      };

      h.prototype.reset=function(){
        this.x=Math.random()*this.clientWidth;
        this.y=Math.random()*-this.clientHeight;
        this.velocityX=0.5-Math.random();
        this.velocityY=(1+Math.random())*3;
        this.radius=(1+Math.random())*2;
        this.transparency=(0.5+Math.random())*0.5};
        var u=[],c,a=[],w=[],p=[];
        for(var r=0;r<f;r+=1){
          a.push(i(new h(),d));
        }

        function i(z,y)
        {
          z.clientWidth=y.width;z.clientHeight=y.height;z.reset();
          return z
        }
        function j(){
          l.clearRect(0,0,d.width,d.height);s(l,a);
          requestAnimFrame(j)
        }
        function s(B,y){
          var z=null;
          for(var A=0;A<f;A+=1){
            z=y[A];z.x+=z.velocityX;z.y+=z.velocityY;
            B.globalAlpha=z.transparency;B.beginPath();
            B.arc(z.x,z.y,z.radius,0,Math.PI*2,false);
            B.closePath();B.fill();
            if(z.y>z.clientHeight){
              z.reset()
            }
          }
        }
        function b(){
          d.style.left=((document.body.clientWidth-1220)/2)+"px";
          if(document.body.clientWidth-1220>20){
            // x.width=(document.body.clientWidth-1220)/2;
            // x.height=742;x.style.width=x.width+"px";
            e.width=(document.body.clientWidth-1220)/2;
            e.height=742;e.style.width=x.width+"px"
          }
        }
        window.requestAnimFrame=(function(){
          return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(y){
            window.setTimeout(y,1000/60)
          }
        })();
        requestAnimFrame(j);
        window.addEventListener("resize",function(){
          b();l.fillStyle="#fff";},false)})();
  
  }	

  render() {
    let t = this;
    const { dispatch,title,singer,lryic,m4a,n,lists } = this.props
    
    return (
      <div className={style.messageBoard}>
        <canvas id="snowFallTop" className="snowFall snowFallTop" width="1220" height="720" style={{"left":"-60px"}}></canvas>      
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

export default connect(select)(MessageBoard)