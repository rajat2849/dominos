import React from "react";
import {browserHistory} from 'react-router';
import { Card, CardImg, Col } from "reactstrap";
import { Link } from "react-router";
import { Url } from "config/Config";
import PropTypes from "prop-types";
import CouponCodeForm from "./CouponCodeForm";

import deliciouspizzas from "../../../../public/newimages/pizza 2.png";
import delicioussides from "../../../../public/newimages/spaguetti 2.png";
import tastychicken from "../../../../public/newimages/buffalo 2.png";
import yummydesserts from "../../../../public/newimages/chocolate-cake 2.png";
import beverages from "../../../../public/newimages/soft-drink 2.png";
import usecoupon from "../../../../public/newimages/image 16.png";
import "./NewDashboard.scss";
import { saveLocalStorage } from "../../../components/Helpers";

class ExploreCategories extends React.Component {
  constructor(props) {
    super(props);
    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.state = {
      menuList: [
        {
          index: 2,
          src: deliciouspizzas,
          name: "Pizza",
          title: "pizza"
        },
        {
          index: 3,
          src: delicioussides,
          name: "Pasta",
          title: "pasta"
        },
        {
          index: 2,
          src: tastychicken,
          name: "Sides",
          title: "sides"
        },
        {
          index: 4,
          src: yummydesserts,
          name: "Desserts",
          title: "desserts"
        },
        {
          index: 4,
          src: beverages,
          name: "Beverages",
          title: "beverages"
        }
      ],
      isToggleOn: false
    };
  }

  toggle = () => {
    this.setState({
      isToggleOn: !this.state.isToggleOn
    });
  };
  componentWillMount(){
    this.props.loadingImage(false)
    if(this.state.isToggleOn === true){
      this.props.loadingImage(true)
    }
  }

  handleLinkClick(item) {
    browserHistory.push({
      pathname: Url.MENU_PAGE
    });
    saveLocalStorage('previousLocation', item.name);
  }

  render() {
    return (
      <div className="row explore-categories downspace">
        {this.state.isToggleOn === true ? (
          <CouponCodeForm
            showForm={this.state.isToggleOn}
            toggle={this.toggle}
            applyVoucherCode={this.props.applyVoucherCode}
            //couponCodeResponse={this.props.couponCodeResponse}
            applying={this.props.applying}
            alertMessage={this.props.alertMessage}
            error={this.props.error}
            setAlertMeassage={this.props.setAlertMeassage}
            loader={this.props.loader}
          />
        ) : (
          ""
        )}

        <div className="col-12">
          <div className="row mx-0 mb-2">
            <h5 className="col-auto categories-title mb-0">
              <strong>Explore from Categories</strong>
            </h5>
          </div>
          <div className='col-12 px-2'>
            <div className="row">
              {this.state.menuList.map((item, index) => {
                const name = item.name;
                const title = item.title;
                return (
                  <Col xs="4" className="item-box text-center" key={item.name}>
                    <Link
                      onClick={() => this.handleLinkClick(item)}
                      className="mb-2"
                    >
                      <Card>
                        <CardImg
                          src={item.src}
                          alt="menu Image"
                          className="img-fluid"
                        />
                      </Card>
                      <p className="mb-0 product-title">
                        <strong className="product-title-name text-capitalize">{title}</strong>
                      </p>
                    </Link>
                  </Col>
                );
              })}
              <Col xs="4" className="item-box text-center">
                <Link onClick={this.toggle} className="mb-2">
                  <Card>
                    <CardImg
                      src={usecoupon}
                      alt="menu Image"
                      className="img-fluid"
                    />
                  </Card>
                  <p className="mb-0 product-title">
                    <strong className="product-title-name">Use Coupon</strong>
                  </p>
                </Link>
              </Col>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ExploreCategories.contextTypes = {
  t: PropTypes.func.isRequired
};

export default ExploreCategories;
