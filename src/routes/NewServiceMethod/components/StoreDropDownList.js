import homeIcon from "../../../../public/newimages/home-icon.png";
import React from "react";

export default class StoreDropDownList extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    const markers =
      this.props.markers.length > 0 &&
      this.props.markers.map((marker, index) => {
        return (
          <option key={marker.id + "_" + index} value={index}>
            {marker.AddressLine1}
          </option>
        );
      });
    return (
      <div className="col-12 mt-3 down-select-arrow">
        <span className="icon">
          <img src={homeIcon} />
        </span>
        <select
          onChange={e =>
            this.props.handleInfoWindow(
              this.props.markers[e.target.value],
              "markerClicked"
            )
          }
          type="select"
          name="select"
          id="exampleSelect"
          className="form-control"
        >
          {markers}
        </select>
      </div>
    );
  }
}
