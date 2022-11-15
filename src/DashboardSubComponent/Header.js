import React from 'react';
import logoImage from '../../public/logo_dominos.png';
// import {Link} from 'react-router';

export const Header = (props) => {
	return (
		<header className='track hm-header text-center fixed-top'>
			{/* <Link to={props.Url}><h6 className="col-3 text-white">back</h6></Link> */}
			<div className="col-12 logo py-3">
				<img src={logoImage} className="mx-auto img-fluid"/>
			</div>
		</header>
	);
}
export default Header;