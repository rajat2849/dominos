import React from "react";
import StoreList from "./StoreList";
import ViewMap from "components/ViewMap";
import SelectedStore from "./SelectedStore";
import StoreDropDownList from "./StoreDropDownList";
import Loader from "../../../components/Loader";

class CarryOutForm extends React.Component {
  constructor(props) {
    super(props);
    // branch.logEvent("Carryout", function(err) {
    //   console.log(err);
    // });
  }

  async componentDidMount() {
    //this.props.centerPoint!==undefined && await this.props.getUserNearestStore(this.props.centerPoint.lat,this.props.centerPoint.lng)
  }

  render() {
    return (
      <div className="row carry-out-wrapper mt-4">
        {/* {this.props.getLocation === false && (
          <Loader loading={!this.props.getLocation} />
        )} */}
        {this.props.showCarryoutDialog && (
          <SelectedStore
            showNearestStore={this.props.showNearestStore}
            activeMarker={this.props.activeMarker}
            closeNearestInfo={this.props.closeNearestInfo}
            handleCarryoutDialog={this.props.handleCarryoutDialog}
            showCarryoutDialog={this.props.showCarryoutDialog}
            userNearestMarker={this.props.userNearestMarker}
          />
        )}
        <StoreList
          showMap={this.props.showMap}
          storeLocations={this.props.storeLocations}
          handleChangeLocation={this.props.handleChangeLocation}
          userNearestMarker={this.props.userNearestMarker}
          getUserNearestStore={this.props.getUserNearestStore}
          showNearestStore={this.props.showNearestStore}
        />
        {this.props.showMap ? (
          <ViewMap
            isMarkerShown
            markers={this.props.markers}
            centerPoint={this.props.centerPoint}
            saveStoreLocator={this.props.saveStoreLocator}
            activePage="storelocator"
            handleInfoWindow={this.props.handleInfoWindow}
            zoom={this.props.zoom !== "" ? this.props.zoom : 10}
            userNearestMarker={this.props.userNearestMarker}
            showNearestStore={this.props.showNearestStore}
            closeNearestInfo={this.props.closeNearestInfo}
          />
         ) : ( 
          <StoreDropDownList
            isMarkerShown
            activePage="storelocator"
            storeLocations={this.props.storeLocations}
            saveStoreLocator={this.props.saveStoreLocator}
            handleInfoWindow={this.props.handleInfoWindow}
            markers={this.props.markers}
            userNearestMarker={this.props.userNearestMarker}
            closeNearestInfo={this.props.closeNearestInfo}
            showNearestStore={this.props.showNearestStore}
            centerPoint={this.props.centerPoint}
          />
       )} 
      </div>
    );
  }
}

export default CarryOutForm;
