import nearby from "../../../../public/newimages/nearby-new.png";
import React from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import PropTypes from "prop-types";

export default class StoreList extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.functions = this.functions.bind(this);
    this.state = {
      dropdownOpen: false,
      value: "Choose area"
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  functions(event) {
    if(event.target.value!==undefined&&event.target.value!==""){
      this.setState({ value: event.target.value });
    }
  }
  render() {
    let areaName = ""
    this.props.storeLocations.map(area => {
      if(this.props.userNearestMarker!=undefined && this.props.userNearestMarker.areaId===area.id){
        areaName = area.name
      }
    })
    return (
      <ButtonDropdown
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
        onClick={this.functions}
        className={
          this.props.showMap
            ? "col-12 select-store-list"
            : "col-12 select-store-list carryout-form"
        }
      >
        <DropdownToggle
          className={
            this.props.showMap
              ? "col-11 mx-auto row d-flex py-2"
              : "col-12 mx-auto row d-flex py-2"
          }
          color=" "
          caret
        >
          <img className="item-image img-fluid col-2" src={nearby} alt="icon" />
          <span className="col-10 text-left text-left-choose">{areaName !== "" ? areaName : this.state.value}</span>
        </DropdownToggle>
        <DropdownMenu>
          {this.state.dropdownOpen &&
            typeof this.props.storeLocations !== "undefined" &&
            this.props.storeLocations.map((item, index) => {
              return (
                <React.Fragment key={item.id}>
                  <DropdownItem
                    value={item.name}
                    onClick={e => this.props.handleChangeLocation(item)}
                  >
                    {item.name}
                  </DropdownItem>
                  <DropdownItem divider />
                </React.Fragment>
              );
            })}
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}
StoreList.contextTypes = {
  t: PropTypes.func.isRequired
};
