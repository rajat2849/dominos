import React from 'react';
import NewHeader from '../../../../src/components/NewHeader';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import RenderHtml from 'react-render-html';

class TermConditions extends React.Component {
	constructor(props) {
		super(props);
		// branch.logEvent(
		// 	"Terms and Conditions",
		// 	function(err) { console.log(err); }
		//    )
	}

	componentWillMount() {
		this.props.fetchTermAndConditions();
	}

	render() {	
		return (
			<div className='row mx-0'>
				<NewHeader page="Terms and conditions" />
				<div className='terms-condition col-12 px-0 pt-4'>
					<h1 className='page-title col-12 text-left px-3'><span>{this.context.t("TERM AND CONDITION")}</span></h1>
					<div className='col-12 col-sm-12 col-xl-12 text-box'>
							{(typeof this.props.termConditions.en !== 'undefined') ?
						<Col className='col-12 col-sm-12 col-xl-12 text-left '>
							<Row>
								{RenderHtml(this.props.termConditions.en)}
							</Row>
						</Col>
						:
						<div></div>
					}
					</div>
				</div>
			</div>
		)
	}
}
TermConditions.propTypes = {

};

TermConditions.contextTypes = {
  t: PropTypes.func.isRequired
}
export default TermConditions;
