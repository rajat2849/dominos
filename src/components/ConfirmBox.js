import React from "react";
import Dialog from "material-ui/Dialog";
import { Button, Col } from "reactstrap";
import "./ConfirmBox.scss";

class ConfirmBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const actions = [
      <div className="text-center confirmbox-button">
        <div className="row m-0" style={{ justifyContent: "space-evenly" }}>
          <Button
            onClick={() => this.props.handleConfirmBox(false)}
            className="alert-btn btn col-4"
          >
            No
          </Button>
          <Button
            onClick={() => this.props.handleConfirmBox(true)}
            className="alert-btn btn col-4"
          >
            Yes
          </Button>
        </div>
      </div>
    ];

    return (
      <div>
        <Dialog
          actions={actions}
          modal={true}
          open={this.props.showConfirmBox}
          onRequestClose={this.props.handleConfirmBox}
          className="text-center alert-box"
        >
          <p className="pt-2 mb-0">{this.props.boxMessage}</p>
        </Dialog>
      </div>
    );
  }
}

export default ConfirmBox;
