import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import RenderHtml from 'react-render-html';

class NewsDetailContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Row>
				{ this.props.news.map((item, index) => {
					return(
						<Col key={index} className='col-12 px-0 news-detail-box'>
							{ (this.props.post_id === item.post_id) ?

				  		  <div className='col-12 pt-2 mb-2 item-details'>
				        	 <h6 className='text-left item-title mb-0'>{item.title}</h6>
				          <Row className='m-0'>
				            <Col xs='12' className='box-desc py-1 my-2 px-1'>
				              {RenderHtml(item.post_content)}
				            </Col>
				          </Row>
				        </div>
				        :
				        <div></div>
							}
					</Col>
		      );
    		})}
    		</Row>
		);
	}
}

NewsDetailContainer.propTypes = {

};

export default NewsDetailContainer;
