import React from "react";
import { Button, Modal, ModalBody, ModalFooter, Input } from "reactstrap";
// import { Link } from "react-router";
// import { Url } from "config/Config";
import PropTypes from "prop-types";

class AddressForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      substreet: "",
      type: "",
      tower: "",
      kavnumber: "",
      unit: "",
      floor: ""
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  saveDeliveryAddressFromForm = () => {
    let address = {
      substreet: this.state.substreet,
      type: this.state.type,
      tower: this.state.tower,
      kavnumber: this.state.kavnumber,
      unit: this.state.unit,
      floor: this.state.floor
    };
    this.props.onSubmit(address);
  };

  handleFields(e, value) {
    this.setState({
      [value]: e.target.value
    });
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.showForm}
          modalTransition={{ timeout: 700 }}
          backdropTransition={{ timeout: 1300 }}
          toggle={this.toggle}
          className="modal-dialog fixed-bottom m-0 find-location-modal"
        >
          <div className="modal-header">Address you have choosen: </div>
          <ModalBody className="px-0">
            <div className="col-12">
              <p className="text-black-50">{this.props.selectedValue}</p>
            </div>
            <div className="col-12">
              <h6 className="font-weight-bold">
                Fill for more detail (optional):
              </h6>
              <hr />
            </div>
            <div className="col-12">
              {/* <Label for="exampleEmail">Email</Label> */}
              <div className="md-form">
                <Input
                  type="text"
                  name="substreet"
                  id="substreet"
                  className="form-control"
                  onChange={e => this.handleFields(e, "substreet")}
                  required
                />
                <label>Type Substreet</label>
              </div>
              <div className="md-form">
                <Input
                  type="text"
                  name="tower"
                  id="tower"
                  className="form-control"
                  onChange={e => this.handleFields(e, "tower")}
                  required
                />
                <label>Type City Region</label>
              </div>
              <div className="md-form">
                <Input
                  type="text"
                  name="kavnumber"
                  id="kavnumber"
                  className="form-control"
                  onChange={e => this.handleFields(e, "kavnumber")}
                  required
                />
                <label>Type number</label>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="md-form">
                    <Input
                      type="text"
                      name="unit"
                      id="unit"
                      className="form-control"
                      onChange={e => this.handleFields(e, "unit")}
                      required
                    />
                    <label>Type unit</label>
                  </div>
                </div>
                <div className="col-6">
                  <div className="md-form">
                    <Input
                      type="text"
                      name="floor"
                      id="floor"
                      className="form-control"
                      onChange={e => this.handleFields(e, "floor")}
                      required
                    />
                    <label>Type floor</label>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="text-center">
            <Button
              color=" "
              className="theme-btn col-12 big-btn"
              onClick={this.saveDeliveryAddressFromForm}
            >
              {this.context.t("ORDER TO THIS ADDRESS")}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

AddressForm.contextTypes = {
  t: PropTypes.func.isRequired
};

export default AddressForm;
