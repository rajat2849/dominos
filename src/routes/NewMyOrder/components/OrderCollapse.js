import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'reactstrap';

import Table from './Table';

class OrderCollapse extends React.Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = { collapse: false, activeCollapse: "" };
	}
	onEntered() {
		this.setState({ status: 'Open' });
	}
	onExited() {
		this.setState({ status: 'Close' });
	}
	toggle(index) {
		this.setState({ collapse: !this.state.collapse, activeCollapse: index });
	}
	componentDidMount() {
		// this.props.fetchFavoriteOrder();
	}
	render() {
		return (
			<Row>
				{(typeof this.props.previousOrder !== 'undefined' && this.props.previousOrder.length > 0) ?
					this.props.previousOrder.map((item, index) => {
						return (
							<div key={index} className='col-12 item-details'>
								<Row>
										<div className='col-12 px-0'>
											<div className='col-12 text-center py-0'>
												<Row>
													<Table
														items={item.items}
														AddToOrder={this.props.AddToOrder}
														customer_id = {item.customer_id}
														entity_id = {item.entity_id}
													/>
												</Row>
											</div>
										</div>
								</Row>
							</div>
						)
					})
					:
					<div></div>
				}
			</Row>
		);
	}
}

OrderCollapse.propTypes = {
};

OrderCollapse.contextTypes = {
  t: PropTypes.func.isRequired
}

export default OrderCollapse;
