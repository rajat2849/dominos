import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import RenderHtml from 'react-render-html';

export const NewsContent = (props) => {
	return (
    <Row>
    { props.news.map((item, index) => {
      return(
  		  <div className='col-12 news-box-list mb-2' key={index} onClick={() => props.showNewsDetail(item.post_id)}>
          <Row className='item-details mx-0'>
            <Col xs='4' className='pr-3 pl-0'>
              <img src={item.filename} alt='' title='' className='img-fluid' />
            </Col>
            <Col xs='8' className='pl-0'>
              <h6 className='text-left item-title mb-1'>{item.title}</h6>
              <div className='box-desc mb-0'>{RenderHtml(item.short_content)}</div>
            </Col>
          </Row>
        </div>
      );
    })}
    </Row>
	);
}

NewsContent.propTypes = {

};

export default NewsContent;
