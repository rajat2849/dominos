import React from 'react';
import OrderCollapse from './OrderCollapse';	

class PreviousOrder extends React.Component {
	constructor(props) {
		super(props);
	// 	branch.logEvent(
    //   "Previous Order",
    //  function(err) { console.log(err); })
	}
	render() {
		return (
		  <div className='col-12 col-sm-12 col-xl-12 p-2 order-collpase-box'>
		    <OrderCollapse
				previousOrder={this.props.previousOrder}
          		AddToOrder={this.props.AddToOrder}
    			toggle={this.props.toggle}
    			activeTab={this.props.activeTab}
		    />
		  </div>
		)
	}
}
export default PreviousOrder;