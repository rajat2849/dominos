import React from "react";
import {
  NavItem,
  NavLink,
  Row,
  Col,
  Nav,
  TabContent,
  TabPane
} from "reactstrap";
import PersonalInfo from "./PersonalInfo";
import LogInInfo from "./LogInInfo";
import { getLocalStorage } from "components/Helpers";
import NewHeader from "../../../components/NewHeader";
import classnames from "classnames";

class MyAccount extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      page: "loginInfo",
      activeTab: "1"
    };
    this.handlePage = this.handlePage.bind(this);
    this.saveLoginInfo = this.saveLoginInfo.bind(this);
    this.savePersonalInfo = this.savePersonalInfo.bind(this);
    this.contactNumberType = this.contactNumberType.bind(this);
    this.handleAlertBox = this.handleAlertBox.bind(this);
    // branch.logEvent("Account Screen", function(err) {
    //   console.log(err);
    // });
  }

  handlePage(page) {
    this.setState({
      page: page
    });
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  contactNumberType(contactType) {
    let formData = getLocalStorage("user");
    let registerFormData = getLocalStorage("receivedLoginDetail");
    let Dob = new Date(registerFormData.dob);
    Dob = Dob.getDate() + "/" + (Dob.getMonth() + 1) + "/" + Dob.getFullYear();
    let data = {};
    var phoneNumber;
    var ext;
    var extPhoneNumber;
    if (typeof formData !== "undefined") {
      phoneNumber = "";
      ext = "";
      if (formData.contact_type === contactType) {
        phoneNumber = formData.phoneNumber;
        ext = formData.contact_ext;
      } else {
        phoneNumber = "";
        ext = "";
      }
      data = {
        Firstname: formData.firstname,
        Lastname: formData.lastname,
        Email: formData.email,
        phoneNumber: formData.phoneNumber,
        extPhoneNumber: formData.phoneNumber,
        Ext: formData.contact_ext,
        MobileType: formData.contact_type,
        Dob: Dob
      };
    }
    this.props.initialize(data);
    this.props.setContactType(contactType);
  }

  saveLoginInfo(values) {
    let receivedLoginDetail = getLocalStorage("receivedLoginDetail");
    values.customer_id = receivedLoginDetail.customer_id;
    this.props.updateLoginInfo(values);
  }

  savePersonalInfo(values) {
    let receivedLoginDetail = getLocalStorage("receivedLoginDetail");
    values.customer_id = receivedLoginDetail.customer_id;
    this.props.updateCustomer(values);
  }

  handleAlertBox() {
    this.props.resetAlertBox(false, "");
  }

  render() {
    return (
      <div>
        <NewHeader page="Account" />
        <div className="col-12 px-0 custom-tabs account-wrapper">
          <Row className="mx-0">
            <div className="col-12 px-0">
              <Nav tabs>
                <NavItem className="col-6 px-0 text-center">
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "1"
                    })}
                    onClick={() => {
                      this.toggle("1");
                    }}
                  >
                    LOG IN INFO
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
                    PERSONAL INFO
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
            <TabContent
              activeTab={this.state.activeTab}
              className="pt-4 col-12"
            >
              <TabPane tabId="1">
                <Row>
                  <Col sm="12" className="px-0">
                    <LogInInfo
                      updateLoginInfo={this.props.updateLoginInfo}
                      handlePage={this.props.handlePage}
                      showAlert={this.props.showAlert}
                      alertMessage={this.props.alertMessage}
                      handleSubmit={this.props.handleSubmit(this.saveLoginInfo)}
                    />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="12" className="px-0">
                    <PersonalInfo
                      {...this.props}
                      initialValues={this.props.initialValues}
                      updateCustomer={
                      (values)=>  this.savePersonalInfo(values)
                      }
                      contactType={this.props.contactType}
                      contactNumberType={this.contactNumberType}
                      showAlert={this.props.showAlert}
                      alertMessage={this.props.alertMessage}
                      setAlertMeassage={this.props.setAlertMeassage}
                      sentOrderVeriOtp={this.props.sentOrderVeriOtp}
                      verifyOrderVeriOtp={this.props.verifyOrderVeriOtp}
                      orderPlaceStatus={this.props.orderPlaceStatus}
                      sentOrderPlacedStatus={this.props.sentOrderPlacedStatus}
                    />
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </Row>
        </div>
      </div>
    );
  }
}

MyAccount.propTypes = {};

export default MyAccount;
