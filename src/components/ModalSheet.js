import React from 'react';
import { browserHistory } from "react-router";
import Sheet from 'react-modal-sheet';
import { getLocalStorage } from './Helpers';
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
class ModalSheet extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.state = {
      activeTab: 'delivery',
      location: {
        lat: '',
        lng: ''
      },
      toggle: this.toggle
    }
  }
  
  async componentWillMount() {
    const user = getLocalStorage('receivedLoginDetail');
    if(user.customer_id!==undefined){
      // if (this.props.isActive === 'delivery') {
        this.props.fetchDeliveryAddress(user.customer_id);
      // } else {
        
        // var location_timeout = setTimeout("geolocFail()", 10000);
        // navigator.geolocation.getCurrentPosition(function(position) {
       //  this.setState({location: {
        //    lat: position.coords.latitude,
        //    lng: position.coords.longitude
        //  }});
        //  this.props.getUserNearestStore(position.coords.latitude, position.coords.longitude);
        // }, function(error) {
        //     // clearTimeout(location_timeout);
        // });

        navigator.geolocation.getCurrentPosition((position) => {
          this.setState({location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }});
          this.props.getUserNearestStore(position.coords.latitude, position.coords.longitude);
        });
      // }
    } else {
      // handle user login
      browserHistory.push('user');
    }
  }

  toggle(btn) {
    this.setState({activeTab: btn});
  }
  
  handleChangeLocation(obj) {
    
    this.setState({ showNearestStore: false });
    this.props.resetNearestMarker();
    this.handleMapDialog();
    let areaId = obj.id;
    let lat = "";
    let lng = "";
    if (typeof areaId !== "undefined" && areaId !== "undefined") {
      let address = "";
      this.props.storeLocations.map(function(item, index) {
        if (item.id == areaId) {
          address = item.name;
        }
      });
      geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => {
          if (areaId == 7) {
            lat = -8.670458;
            lng = 115.212629;
          } else {
            lat = latLng.lat;
            lng = latLng.lng;
          }
          this.props.getNearestStores(lat, lng, areaId, this.state.page);
          this.props.setAddressByLatLng(lat, lng);
        })
        .catch(error => console.error("Error", error));
    }
  }

  render() {
    const {sheetContent} = this.props;
    return (
      <div>
        <Sheet isOpen={this.props.isOpen} onClose={() => this.props.close(false)}>
          <Sheet.Container>
            <Sheet.Header />
            <Sheet.Content>
              {
                sheetContent({...this.props, ...this.state})
              }
            </Sheet.Content>
          </Sheet.Container>
        <Sheet.Backdrop />
        </Sheet>
      </div>
    );
  }
};

export default ModalSheet;

