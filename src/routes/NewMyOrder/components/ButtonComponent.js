import React from "react";
import {
  // Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  // Card,
  // CardTitle,
  // CardText,
  Row,
  Col
} from "reactstrap";
import PreviousOrder from "./PreviousOrder";
import FavouriteOrder from "./FavouriteOrder";
// import PropTypes from "prop-types";
import classnames from "classnames";
import "./MyOrder.scss";

class ButtonComponent extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1"
    };
    // branch.logEvent("Order Menu", function(err) {
    //   console.log(err);
    // });
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <div>
        <Row className="mx-0">
          <div className="col-12 service-method-wrapper px-0">
            <Row className="mx-0">
              <Nav tabs className="col-12 px-0">
                <NavItem className="col-6 px-0 text-center">
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "1"
                    })}
                    onClick={() => {
                      this.toggle("1");
                    }}
                  >
                    FAVOURITE ORDER
                  </NavLink>
                </NavItem>
                <NavItem className="col-6 px-0 text-center">
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "2"
                    })}
                    onClick={() => {
                      this.toggle("2");
                    }}
                  >
                    PREVIOUS ORDER
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent
                activeTab={this.state.activeTab}
                className="pt-4 col-12"
              >
                <TabPane tabId="1">
                  <Row className="mx-0">
                    <Col sm="12">
                      <FavouriteOrder {...this.props} />
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row className="mx-0">
                    <Col sm={12}>
                      <PreviousOrder
                        previousOrder={this.props.previousOrder}
                        AddToOrder={this.props.AddToOrder}
                        toggle={this.toggle}
                        activeTab={this.state.activeTab}
                        {...this.props}
                      />
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </Row>
          </div>
        </Row>
      </div>
    );
  }
}

export default ButtonComponent;
