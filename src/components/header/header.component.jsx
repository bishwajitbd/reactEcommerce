import React from 'react';
import './header.styles.scss';
import {Link} from 'react-router-dom';
import logo from '../../assets/crown.svg';
import {auth} from '../../firebase/firebase.utils';
import {connect} from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropDown from '../cart-dropdown/cart-dropdown.component';
import {createStructuredSelector} from 'reselect';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from '../../redux/user/user.selectors';

const Header=({currentUser, hidden})=>(
	<div className='header'>
	<Link className='logo-container' to="/">
		<img src={logo} alt="Logo" />;
	</Link>
	<div className='options'>
		<Link className='option' to='/shop'>SHOP</Link>
		<Link className='option' to='/shop'>CONTACT</Link>

		{
			currentUser ?
			<div className='option' onClick={()=>auth.signOut()}>SIGN OUT</div>
			:
			<Link className='option' to='/signin'>SIGN IN</Link>
		}
<CartIcon />
	</div>
	{
		hidden ? null: <CartDropDown />
	}
	
	</div>
);

const mapStateToProps=createStructuredSelector({
	currentUser: selectCurrentUser,
	hidden: selectCartHidden
});

export default connect(mapStateToProps) (Header);