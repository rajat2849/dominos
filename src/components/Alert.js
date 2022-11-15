import React from "react";
import PropTypes from "prop-types";
import Dialog from "material-ui/Dialog";
import { Button, Col } from "reactstrap";

class Alert extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const actions = [
      <div className="text-center row">
        <Col>
          <Button
            onClick={() => this.props.handleAlertBox()}
            className="alert-btn btn col-3 alertBox ml-3" 
          >
            OK
          </Button>
        </Col>
      </div>
    ];

    return (
      <div>
        <Dialog
          actions={actions}
          modal={true}
          open={this.props.showAlert}
          onRequestClose={this.props.handleAlertBox}
          className="text-center alert-box"
        >
          <p className="pt-2 mb-0">{this.props.message}</p>
        </Dialog>
      </div>
    );
  }
}

Alert.propTypes = {};

export default Alert;
