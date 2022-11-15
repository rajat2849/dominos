import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import RenderHtml from 'react-render-html';

import NewHeader from '../../../../src/components/NewHeader';
import Loader from 'components/Loader';
import { Url } from 'config/Config';
import './policy.scss';

class Policy extends React.Component {
	constructor(props) {
		super(props);
	// 	branch.logEvent(
    //   "Privacy Policy Screen",
    //  function(err) { console.log(err); })
	}

	componentWillMount() {
		this.props.fetchPrivacyPolicy();
	}

	render() {
		return (
			<div className='col-12 col-sm-12 col-xl-12 px-0'>
				<NewHeader page="Privacy and policy"/>
				<div className='main-wrapper content-wrapper'>
					{/* <h4 className='title col-12 col-sm-12 col-xl-12'><span>{this.context.t("PRIVACY POLICY")}</span></h4> */}
					<div className='col-12 col-sm-12 col-xl-12 text-box'>
					{ (this.props.fetching) ?
						<Loader />
						:	(typeof this.props.policy.en !== 'undefined') ?
							<Col className='col-12 text-left px-0'>
									{RenderHtml(this.props.policy.en)}
							</Col>
						:
						<div></div>
					}
					</div>
				</div>
			</div>
		);
	}
}

Policy.propTypes = {

};

Policy.contextTypes = {
  t: PropTypes.func.isRequired
}

export default Policy;
