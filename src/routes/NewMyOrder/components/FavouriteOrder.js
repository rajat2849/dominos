import React from 'react';
import OrderCollapse from './OrderCollapse';
import Loader from '../../../components/Loader';

class FavouriteOrder extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
		  <div className='col-12 col-sm-12 col-xl-12 p-2 order-collpase-box'>
		    {this.props.fetching === true && <Loader loading = {this.props.fetching}/>}
		    <OrderCollapse
		    	{...this.props}
		    />
		  </div>
		)
	}
}
export default FavouriteOrder;