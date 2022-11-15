import React from 'react';
import NewHeader from '../../../../src/components/NewHeader';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { Url } from 'config/Config';
//import './History.scss';
import historyImage from '../../../../public/history.png';

class History extends React.Component {
	constructor(props) {
		super(props);
	// 	branch.logEvent(
    //    "History-Page",
    //  function(err) { console.log(err); })
	}
	render() {
		return (
			<div>
				<NewHeader page="Company History" />
				<div className='main-wrapper content-wrapper'>
					<h4 className='categories-title col-12'><span>{this.context.t("HISTORY")}</span></h4>
					<Row className='mx-0'>
						<div className='col-12'>
							<img className="history-image img-fluid" src={historyImage} alt={this.context.t("image not found")} />
						</div>
					</Row>
				</div>
				
			</div>
		)
	}
}

History.contextTypes = {
	t: PropTypes.func.isRequired
}


export default History;