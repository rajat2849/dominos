import React from 'react';
import NewHeader from '../../../../src/components/NewHeader';
import { Row, Col } from 'reactstrap';
import RenderHtml from 'react-render-html';

class TermsOfUse extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.fetchTermsOfUse()
	}

	render() {
		return (
			<div className=''>
					<NewHeader page="Terms Of Use"/>
					<div className='row mx-0 pt-4 text-box'>
							{(typeof this.props.termsOfUse.en !== 'undefined') ?
							<Col className='col-12 col-sm-12 col-xl-12 text-left'>
								{RenderHtml(this.props.termsOfUse.en)}
							</Col>
							:
							<div></div>
						}
					</div>
			</div>
		)
	}
}
export default TermsOfUse;