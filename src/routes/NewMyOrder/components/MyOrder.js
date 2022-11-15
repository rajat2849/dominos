import React from "react";
import NewHeader from "../../../../src/components/NewHeader";
import ButtonComponent from "./ButtonComponent";
import "./MyOrder.scss";
import Modal from "./Modal";

import Loader from '../../../components/Loader';
//import { truncate } from 'fs';

class MyOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.AddToOrder = this.AddToOrder.bind(this);
    // branch.logEvent(
    //   "My Order Screen",
    //   function(err) { console.log(err); }
    //  )
  }

  componentWillMount() {
    this.props.fetchFavoriteOrder();
    this.props.fetchPreviousOrder();
  }

  handleModal = () => {
    this.setState({
      show: !this.state.show
    });
  };

  AddToOrder(customerId, orderId) {
    // let customerId = (typeof items !== 'undefined' && typeof items.customer_id !== 'undefined') ? items.customer_id : '';
    // let orderId = (typeof items !== 'undefined' && typeof items.entity_id !== 'undefined') ? items.entity_id : '';
    this.props.placeMyOrder(customerId, orderId);
    this.handleModal();
  }

  render() {
    return (
      <div>
        <NewHeader page="My Order" />
        {this.state.show &&
          !this.props.fetching &&
          this.props.alertMessage !== "" && (
            <Modal
              header={this.props.error === true ? "Sorry" : "Success"}
              message={this.props.alertMessage}
              handleModal={this.handleModal}
              show={this.state.show}
            />
          )}
        <div>
          <ButtonComponent
            {...this.props}
            AddToOrder={this.AddToOrder}
            handleModal={this.handleModal}
            showFavOrder={this.props.showFavOrder}
          />
        </div>
      </div>
    );
  }
}
export default MyOrder;
