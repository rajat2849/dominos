import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Collapse, Button, Card } from 'reactstrap';
import './pizzaTracker.scss';
import MapWithADirectionsRenderer from "./TrackMap";

class GpsTracker extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Row>
        <div className='col-12 col-sm-12 col-xl-12 px-0 gps-tracker-box'>
          <MapWithADirectionsRenderer
            orderDataReceived={this.props.updateMap}
            orderData={this.props.orderData}
          />
        </div>
      </Row>
    );
  }
}

GpsTracker.propTypes = {

};

export default GpsTracker;
