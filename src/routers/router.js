import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {Router,Route,IndexRoute,hashHistory} from 'react-router';

import reducers from '../store/reducers';
import Main from '../pages/main';
import Home from '../pages/home';
import Editor from '../pages/editor';
import AboutUs from '../pages/about.us';
import Details from '../pages/details';
import List from '../pages/list';
import MessageBoard from '../pages/message.board';


let store = createStore(reducers);

let App = document.getElementById('app');

ReactDOM.render(
     	<Provider store={store}>
     		<Router history={hashHistory}>
     			<Route path='/'  component={Main}> 
     				<IndexRoute  component={Home}/>
		     		<Route  path='home'  component={Home}/> 
					<Route  path='editor'  component={Editor}/> 
					<Route  path='aboutUs'  component={AboutUs}/> 
					<Route  path='details'  component={Details}/> 
					<Route  path='messageBoard'  component={MessageBoard}/> 
					<Route  path='list'  component={List}/> 
				</Route>	
     		</Router>
     	</Provider>
	, App);