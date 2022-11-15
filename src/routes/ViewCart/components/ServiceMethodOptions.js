import React from "react";
import { Link } from "react-router";
import { Url } from "config/Config";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { getLocalStorage } from "../../../components/Helpers";
import { Form, FormGroup, Label, Input } from "reactstrap";
import PromotionModal from './PromotionModal';
import moment from 'moment';
export const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

class OrderOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOn: false,
      backdrop: false
    };
  }

  componentDidMount() {
    let ordertype = getLocalStorage("order");
    if (ordertype.deliveryType === "Carryout") {
      this.props.setProps("carryout");
    } else {
      this.props.setProps("free-delivery");
    }
  }

  handleChangeOption(event) {
    let ordertype = getLocalStorage("order");
    if (ordertype.deliveryType === "Carryout") {
      this.props.setProps("carryout");
    } else {
      this.props.setProps("free-delivery");
    }
    this.props.setProps(event);
  }

  handleModalClick = (state,msg) => {
    this.setState({
        isModalOn: state,
        msg: msg
    });
    
};
  renderPromoItem = (props) => {
    
    var isItem = false;
    props.selectedProductsInCart.map((item)=> {
      
      if(!_.isEmpty(props.configuration) && props.configuration.carryout.sku.includes(item.id)){
        isItem = true;
        
      }
      

    })
    if(!_.isEmpty(props.configuration) && isItem === true) {
      
      var msg = 'Your selected coupon only valid For Take Away';
      return(
        <div onClick={() => {
          this.handleModalClick(true,msg);
          
          }} className="">
              <Label
                check
                className="col-11 row px-0 form-check-label mx-0 container1"
              >
                <Input
                  type="radio"
                  name="orderoption"
                  className="mr-2"
                  value="free-delivery"
                  checked={this.props.freeDelivery}
                  readOnly
                />

                <span className="ml-4"> FREE DELIVERY</span>
                <span className="checkmark Left"></span>
              </Label>
          </div>  
      )
    }else if (!_.isEmpty(props.configuration) && props.configuration.dinner.sku.includes(props.selectedProductsInCart.id)) {
      const currentHour = moment().format('H');
      const {start, end} = props.configuration.dinner.timings;
      if (currentHour >= start && currentHour <= end) {
        // var msg = 'Coupon only valid From '+start+' - '+end+' PM';
        var msg = 'Coupon only valid From 8 - 11 PM';
        return (
          <Label
                check
                className="col-11 row px-0 form-check-label mx-0 container1"
              >
                <Input
                  type="radio"
                  name="orderoption"
                  className="mr-2"
                  value="free-delivery"
                  checked={this.props.freeDelivery}
                  readOnly
                />

                <span className="ml-4"> FREE DELIVERY</span>
                <span className="checkmark Left"></span>
              </Label>
        );
      }
    }else{
      return(
        <Link
              to={{
                pathname: Url.NEW_SERVICE_METHOD,
                state: { page: "delivery" }
              }}
              onClick={() => this.handleChangeOption("free-delivery")}
              className="w-100 text-left"
            >
              <Label
                check
                className="col-11 row px-0 form-check-label mx-0 container1"
              >
                <Input
                  type="radio"
                  name="orderoption"
                  className="mr-2"
                  value="free-delivery"
                  checked={this.props.freeDelivery}
                  readOnly
                />

                <span className="ml-4"> FREE DELIVERY</span>
                <span className="checkmark Left"></span>
              </Label>
            </Link>
      )
    }
  }
  render() {
    
    const { isModalOn } = this.state;
    return (
      <div>
        <form
          autoComplete="off"
          className="row mx-0 mt-2 order-option payment-wrapper"
        >
          <div className="col-12 px-0">
            <h2 className="item-title">{this.context.t("Service Method")}</h2>
          </div>
          <div>
            {this.state.isModalOn === true &&
              <PromotionModal 
              { ...this.props}
                isModalOn = {isModalOn}
                handleModalClick={this.handleModalClick}
                message = {this.state.msg}
              />
            }
          </div>
          <FormGroup
            check
            className="col-6 d-flex form-check position-relative row mx-0 px-1"
          >
            {/* {this.renderPromoItem(this.props)} */}
            <Link
              to={{
                pathname: Url.NEW_SERVICE_METHOD,
                state: { page: "delivery" }
              }}
              onClick={() => this.handleChangeOption("free-delivery")}
              className="w-100 text-left"
            >
              <Label
                check
                className="col-11 row px-0 form-check-label mx-0 container1"
              >
                <Input
                  type="radio"
                  name="orderoption"
                  className="mr-2"
                  value="free-delivery"
                  checked={this.props.freeDelivery}
                  readOnly
                />

                <span className="ml-4"> FREE DELIVERY</span>
                <span className="checkmark Left"></span>
              </Label>
            </Link>
          </FormGroup>
          <FormGroup
            check
            className="col-6 d-flex form-check position-relative row mx-0 px-1"
          >
            <Link
              to={{
                pathname: Url.NEW_SERVICE_METHOD,
                state: { page: "carryout" }
              }}
              onClick={e => this.handleChangeOption("carryout")}
              className="w-100 text-left"
            >
              <Label
                check
                className="col-11 row px-0 form-check-label mx-0 container1"
              >
                <Input
                  type="radio"
                  name="orderoption"
                  className="mr-2"
                  value="carryout"
                  checked={this.props.carryoutDelivery}
                  readOnly
                />{" "}
                <span className="ml-4"> TAKEAWAY</span>
                <span className="checkmark Left"></span>
              </Label>
            </Link>
          </FormGroup>
        </form>
      </div>
    );
  }
}

OrderOptions.contextTypes = {
  t: PropTypes.func.isRequired
};
export default OrderOptions;
