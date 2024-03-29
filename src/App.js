import React from 'react';
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import ShopPage from './pages/shop/shop.component.jsx';
import HomePage from './pages/homepage/homepage.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import {auth, createUserProfileDocoment} from './firebase/firebase.utils';
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions';
import {createStructuredSelector} from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';
import CheckoutPage from './pages/checkout/checkout.component';




class App extends React.Component{
	unsubcribeFromAuth=null;

	componentDidMount(){

		const {setCurrentUser}=this.props;

		this.unsubcribeFromAuth=auth.onAuthStateChanged(async userAuth=>{
			
			if(userAuth){
				const userRef= await createUserProfileDocoment(userAuth);

				userRef.onSnapshot(snapShot=>{
					setCurrentUser ({
							id:snapShot.id,
							...snapShot.data()
					});
				});
				
			}
			setCurrentUser(userAuth);

		})

	}

	componentWillUnmount(){
		this.unsubcribeFromAuth();
	}

	render(){
		return(

		    <div>
			    <Header />
			    <Switch>
			      <Route exact path='/' component={HomePage} /> 
			      <Route path='/shop' component={ShopPage} /> 
			      <Route exact path='/checkout' component={CheckoutPage} />
			      <Route exact path='/signin' render={()=>this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />) } /> 
			    </Switch>

		    </div>
		)
	}

}

const mapStateToProps=createStructuredSelector({
	currentUser: selectCurrentUser
})

const mapDispatchToProps=dispatch=>({
	setCurrentUser: user=>dispatch(setCurrentUser(user))
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
