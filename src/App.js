import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import ShopPage from './pages/shop/shop.component.jsx';
import HomePage from './pages/homepage/homepage.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import {auth, createUserProfileDocoment} from './firebase/firebase.utils';

class App extends React.Component{
	constructor(){
		super();

		this.state={
			currentUser: null
		};
	}

	unsubcribeFromAuth=null;

	componentDidMount(){
		this.unsubcribeFromAuth=auth.onAuthStateChanged(user=>{
			this.setState({currentUser:user});
			console.log(user);
		})

	}

	componentWillUnmount(){
		this.unsubcribeFromAuth();
	}

	render(){
		return(

		    <div>
			    <Header currentUser={this.state.currentUser}/>
			    <Switch>
			      <Route exact path='/' component={HomePage} /> 
			      <Route path='/shop' component={ShopPage} /> 
			      <Route path='/signin' component={SignInAndSignUpPage} /> 
			    </Switch>

		    </div>
		)
	}

}

export default App;
