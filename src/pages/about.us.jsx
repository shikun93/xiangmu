import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import style from '../css/about.us.less';
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../store/actions';
import Editor from '../components/editor';
import Form from '../components/form';

class AboutUs extends Component {

  componentDidMount() {	
    var LeafScene = function(el) {
    this.viewport = el;
    this.world = document.createElement('div');
    this.leaves = [];

    this.options = {
      numLeaves: 20,
      wind: {
        magnitude: 1.2,
        maxSpeed: 12,
        duration: 300,
        start: 0,
        speed: 0
      },
    };

    this.width = this.viewport.offsetWidth;
    this.height = this.viewport.offsetHeight;

    // animation helper
    this.timer = 0;

    this._resetLeaf = function(leaf) {

      // place leaf towards the top left
      leaf.x = this.width * 2 - Math.random()*this.width*1.75;
      leaf.y = -10;
      leaf.z = Math.random()*200;
      if (leaf.x > this.width) {
        leaf.x = this.width + 10;
        leaf.y = Math.random()*this.height/2;
      }
      // at the start, the leaf can be anywhere
      if (this.timer == 0) {
        leaf.y = Math.random()*this.height;
      }

      // Choose axis of rotation.
      // If axis is not X, chose a random static x-rotation for greater variability
      leaf.rotation.speed = Math.random()*10;
      var randomAxis = Math.random();
      if (randomAxis > 0.5) {
        leaf.rotation.axis = 'X';
      } else if (randomAxis > 0.25) {
        leaf.rotation.axis = 'Y';
        leaf.rotation.x = Math.random()*180 + 90;
      } else {
        leaf.rotation.axis = 'Z';
        leaf.rotation.x = Math.random()*360 - 180;
        // looks weird if the rotation is too fast around this axis
        leaf.rotation.speed = Math.random()*3;
      }

      // random speed
      leaf.xSpeedVariation = Math.random() * 0.8 - 0.4;
      leaf.ySpeed = Math.random() + 1.5;

      return leaf;
    }

    this._updateLeaf = function(leaf) {
      var leafWindSpeed = this.options.wind.speed(this.timer - this.options.wind.start, leaf.y);

      var xSpeed = leafWindSpeed + leaf.xSpeedVariation;
      leaf.x -= xSpeed;
      leaf.y += leaf.ySpeed;
      leaf.rotation.value += leaf.rotation.speed;

      var t = 'translateX( ' + leaf.x + 'px ) translateY( ' + leaf.y + 'px ) translateZ( ' + leaf.z + 'px )  rotate' + leaf.rotation.axis + '( ' + leaf.rotation.value + 'deg )';
      if (leaf.rotation.axis !== 'X') {
        t += ' rotateX(' + leaf.rotation.x + 'deg)';
      }
      leaf.el.style.webkitTransform = t;
      leaf.el.style.MozTransform = t;
      leaf.el.style.oTransform = t;
      leaf.el.style.transform = t;

      // reset if out of view
      if (leaf.x < -10 || leaf.y > this.height + 10) {
        this._resetLeaf(leaf);
      }
    }

    this._updateWind = function() {
      // wind follows a sine curve: asin(b*time + c) + a
      // where a = wind magnitude as a function of leaf position, b = wind.duration, c = offset
      // wind duration should be related to wind magnitude, e.g. higher windspeed means longer gust duration

      if (this.timer === 0 || this.timer > (this.options.wind.start + this.options.wind.duration)) {

        this.options.wind.magnitude = Math.random() * this.options.wind.maxSpeed;
        this.options.wind.duration = this.options.wind.magnitude * 50 + (Math.random() * 20 - 10);
        this.options.wind.start = this.timer;

        var screenHeight = this.height;

        this.options.wind.speed = function(t, y) {
          // should go from full wind speed at the top, to 1/2 speed at the bottom, using leaf Y
          var a = this.magnitude/2 * (screenHeight - 2*y/3)/screenHeight;
          return a * Math.sin(2*Math.PI/this.duration * t + (3 * Math.PI/2)) + a;
        }
      }
    }
  }

  LeafScene.prototype.init = function() {

    for (var i = 0; i < this.options.numLeaves; i++) {
      var leaf = {
        el: document.createElement('div'),
        x: 0,
        y: 0,
        z: 0,
        rotation: {
          axis: 'X',
          value: 0,
          speed: 0,
          x: 0
        },
        xSpeedVariation: 0,
        ySpeed: 0,
        path: {
          type: 1,
          start: 0,

        },
        image: 1
      };
      this._resetLeaf(leaf);
      this.leaves.push(leaf);
      this.world.appendChild(leaf.el);
    }

    this.world.className = 'leaf-scene';
    this.viewport.appendChild(this.world);

    // set perspective
    this.world.style.webkitPerspective = "400px";
    this.world.style.MozPerspective = "400px";
    this.world.style.oPerspective = "400px";
    this.world.style.perspective = "400px";
    
    // reset window height/width on resize
    var self = this;
    window.onresize = function(event) {
      self.width = self.viewport.offsetWidth;
      self.height = self.viewport.offsetHeight;
    };
  }

  LeafScene.prototype.render = function() {
    this._updateWind();
    for (var i = 0; i < this.leaves.length; i++) {
      this._updateLeaf(this.leaves[i]);
    }

    this.timer++;

    requestAnimationFrame(this.render.bind(this));
  }

  // start up leaf scene
  var leafContainer = document.getElementById("falling");
  console.log(leafContainer);
    var leaves = new LeafScene(leafContainer);

  leaves.init();
  leaves.render();
  }	

  render() {
    let t = this;
    const { dispatch,title,singer,lryic,m4a,n,lists } = this.props
    
    return (
      <div className={style.aboutUs}>
          <div id="falling" className={style["falling-leaves"]}></div>
          <div className={style.body}>
          <h1>关于我</h1>
          <hr />
          <div>
            <p>夜已深，而我还在这里，回想着当初的那个自己，有些事情真的像人们说的那样，过去了不再叹息，而有些事情，过去了，永远就成了回忆。</p>

            <p>我喜欢音乐，在我很小的时候，喜欢在路上，一个人奔跑的样子，喜欢一个人望着漆黑的夜空，想着属于一个人的事情，而这些？过去了，一切都过去了。</p>

            <p>每一次，当打开自己的QQ空间，里面会发生各种各样的事情，有的成了家，而有的人还是那样——无牵无挂。我喜欢用音乐的声音，来表达我对每一座城的怀念，
            每一次，都会在不同的地点，去想一件属于我的事情，我时常也会做梦，时常在做梦的时候，回忆一些可怕的事情，有时候我也会问自己，是不是年少的我，到现在为止，
            真的病的很严重，有时候我在问自己，25岁的我，为何还是那样的年轻，对于这些，我想哭，而在哭的瞬间，也有一些冲动。</p>

            <p>别人会说我这样那样的事情，而对于从不操心的自己来说，在这个世界上，可以说有用，也可说没有用。有时候，我常会在寂寥的时候，翻开自己的那些相片，也会在某张相片的背后，偷偷的去怀念。</p>

            <p>我喜欢在写作的时候，去听一首回味的歌曲，不是因为它真的很好听，而是在好听的背后，可以为我带来更多的灵感，尤其是在夜深人静。</p>

            <p>就在今天，我睡的很晚，而在零点的那一刻，脑海又一次的凌乱，我想我自己疯了，还是疯的不轻，想让自己静静的坐在那里，让心好好的沉静，可无论如何来坐，总会感觉有一丝丝的疼痛，其实，我一直都知道，这不是梦，而我的大脑在发“神经”。</p>

            <p>常常会因微博的某个话题，而引起他们的注意，常常会因我写的每一句，而让她和他质疑，其它我真的想告诉他们，也想告诉没有疯后的自己，写的东西，有些真的很真实，而真些真的很虚伪，虚伪的连我自己都不知道，这是不是我写的。</p>

            <p>我喜欢写一些情感的文章，而这些文章，可以值得自己收藏，也可以在写后的瞬间，让它彻底的遗忘。</p>

            <p>25岁，一直在讨论一个话题——结婚，25岁，一直在为了某些事情，而一点一点的颓废，有些事情，不是为了它说太累，是因为怕选择了，却弄的伤痕累累。</p>

            <p>25岁，身边的他们成了家，他当了爸爸，她当了妈妈，他牵了她的手，一直勇敢的走，而她丢下年幼，对于某些不重要的事情，永不回头。 对于这些，有时候也特别的害怕，有时候想让自己成个家，最后却发现，找一个真实的她，对于现实，却是那样的虚假。</p>

            <p>常常会听到别人说自己很傻，常常会想到在那一年，焦躁的心如此可怕。</p>

            <p>我喜欢在没事的时候，看一些偶像剧，喜欢在偶像剧里面，找一些丢失的回忆，有人问我为什么，我只能这样的告诉他："不想在自己回首的时候，发现自己已经老去。”对于这些，我知道身边的他和她，对我真的无语，对于这些，我知道现在的我，也真的无趣，我只想在烦感的时候，和他们说，面对着青春，我不想老去，而是想在继续。</p>

            <p>很多人不知道我家里的一些事情，更不知道单身到现在的我，究竟是为了什么？有时候我也很厌烦，厌烦那些说自己没房，没车，没钱，没能力的老丈人，而有的时候，我也会这样的安慰自己，“现在没有，不代表以后没有”，对于这句话，其实我真的不知道，为了这些，究竟会有多久。</p>

            <p>有人说婚姻是一个人的坟墓，听到这句话，我想哭更想吐，想哭的原因是说，它是真的会这样，它可以让恩爱的两个人，为了某些东西，而让他和她去滚。想吐的原因，是因为我们身边，有这样一群平凡的人，“她喜欢的不是金钱，不是车，不是房，是一个人的善良，一个人能为了她，而去牵挂，去好好的想。”</p>

            <p>我喜欢自由的方向，喜欢当自己拥有一个不大不小的店后，拿着背包，好好的去闯。我也喜欢幻想，喜欢一个人在荒凉的田野上，把月光当我的新娘，大地当我的床，喜欢有它的陪伴，再累的我也不会感伤。</p>

            <p>我喜欢他们说的地老天荒，喜欢真实的一面，发的那些事情，永远不会遗忘，我喜欢他们说的凄美善良，喜欢把走过的回忆，一点一滴的用幸福写上。</p>
          </div>
        </div>
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

export default connect(select)(AboutUs)