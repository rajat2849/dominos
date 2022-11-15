import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

import Loader from 'components/Loader';
import NewsContent from './NewsContent';
import { Url } from 'config/Config';
import NewsDetailContainer from './NewsDetailContainer';
import './newsAndUpdates.scss';
import NewHeader from '../../../../src/components/NewHeader';

class NewsAndUpdates extends React.Component {
  constructor(props) {
    super(props);
    this.showNewsDetail = this.showNewsDetail.bind(this);
    // branch.logEvent(
    //  "News And Updates",
    //  function(err) { console.log(err); }
    // )
  }

  componentWillMount() {
    this.props.getNewsAndUpdates();
  }

  componentWillUnmount() {
    this.props.resetProps();
  }

  showNewsDetail(post_id) {
    this.props.setShowNewsDetail(post_id);
  }

  render() {
    return (
      <div className='col-12'>
        <NewHeader page="News and updates"/>
        <div className='main-wrapper content-wrapper'>
          <Row>
            <Col xs='12'>
              {(this.props.fetching) ?
                <Loader loading={this.props.fetching} />
                : (this.props.showNewsDetail) ?
                  <NewsDetailContainer
                    news={this.props.news}
                    post_id={this.props.post_id}
                  />
                  :
                  <NewsContent
                    news={this.props.news}
                    showNewsDetail={this.showNewsDetail}
                  />
              }
            </Col>
          </Row>
        </div>
      </div>
    );
  }
};

NewsAndUpdates.propTypes = {

};

NewsAndUpdates.contextTypes = {
  t: PropTypes.func.isRequired
}

NewsAndUpdates.childContextTypes = {
  t: PropTypes.func.isRequired
};

export default NewsAndUpdates;
