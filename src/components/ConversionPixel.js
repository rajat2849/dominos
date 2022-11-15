import React from 'react';
import PropTypes from 'prop-types';

class ConversionPixel extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {trackingCode, storeCode, storeName, membership, amount} = this.props;
		const url = `https://invol.co/aff_l?offer_id=100004&adv_sub=${trackingCode}&adv_sub2=${storeCode}&adv_sub3=${storeName}&adv_sub4=${membership}&amount=${amount}`;
		console.log(url);
		return (
			<iframe 
				src={url}
				scrolling="no"
				frameBorder="0"
				width="1"
				height="1">
			</iframe>
		);
	}
}

ConversionPixel.propTypes = {
	trackingCode: PropTypes.string.isRequired,
	storeCode: PropTypes.string.isRequired,
	storeName: PropTypes.string.isRequired,
	membership: PropTypes.string.isRequired,
	amount: PropTypes.number.isRequired,
}

export default ConversionPixel;